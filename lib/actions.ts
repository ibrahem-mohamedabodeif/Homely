"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { addedRoomSchema, addedRoomType, BookingDataType, bookingSchema, updatedRoomSchema, updatedRoomType } from "./schema";
import { ZodSchema } from "zod";
import { checkAvailability } from "./functions";

export async function updateUserInfo(previousState: any, formData: FormData) {
  const user = await currentUser();
  const updatedUser = {
    firstName:
      formData.get("firstName")?.toString() || user?.firstName || undefined,
    lastName:
      formData.get("lastName")?.toString() || user?.lastName || undefined,
    publicMetadata: {
      phoneNumber:
        formData.get("phoneNumber")?.toString() ||
        user?.publicMetadata.phoneNumber?.toString(),
      dateOfBirth:
        formData.get("birthDate")?.toString() ||
        user?.publicMetadata?.dateOfBirth?.toString(),
      about:
        formData.get("about")?.toString() ||
        user?.publicMetadata.about?.toString(),
      work:
        formData.get("work")?.toString() ||
        user?.publicMetadata.work?.toString(),
      languages:
        formData.get("languages")?.toString() ||
        user?.publicMetadata.languages?.toString(),
      hobbies:
        formData.get("hobbies")?.toString() ||
        user?.publicMetadata.hobbies?.toString(),
      address:
        formData.get("address")?.toString() ||
        user?.publicMetadata.address?.toString(),
    },
  };

  if (user) {
    (await clerkClient()).users.updateUser(user.id, updatedUser);
  }
  revalidatePath("/account");
  return updatedUser;
}

function validateRoomData<T>(room: T, schema: ZodSchema<T>) {
  const result = schema.safeParse(room);
  if (!result.success) {
    const errorMap: Record<string, string> = {};
    result.error.errors.forEach((error) => {
      errorMap[error.path[0]] = error.message;
    });
    return {
      success: false,
      errors: errorMap,
      inputs: room,
      message: "Please enter valid place data.",
    };
  }
  return { success: true, data: result.data };
}

async function uploadImagesToSupabase(images: File[]) {
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(imageName, image);
      if (uploadError) throw uploadError;

      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("images")
        .createSignedUrl(imageName, 60 * 60 * 24 * 365);
      if (urlError) throw urlError;
      return signedUrlData.signedUrl;
    })
  );
  return imageUrls;
}

function revalidateRoomPaths() {
  revalidatePath("/", "layout");
  revalidatePath("/account/homely-rooms");
}

export async function addRoom(room: addedRoomType) {
  // Validate room data
  const validation = validateRoomData(room, addedRoomSchema);
  if (!validation.success) return validation;

  try {
    const user = await currentUser();
    if (!validation.data) {
      return {
        success: false,
        message: "Validation failed.",
        inputs: room,
      };
    }
    const roomImages = validation.data.room_images as unknown as File[];

    // Upload images to Supabase
    const imageUrls = await uploadImagesToSupabase(roomImages);

    // Save room data with image URLs
    const { error } = await supabase
      .from("rooms")
      .insert([{ ...validation.data, user_id: user?.id, room_images: imageUrls }])
      .select();

    if (error) throw error;

    // Revalidate paths
    revalidateRoomPaths();

    return {
      success: true,
      message: "Your place was added successfully.",
      inputs: room,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      inputs: room,
    };
  }
}

export async function updateRoom(room: updatedRoomType) {
  // Validate room data
  const validation = validateRoomData(room, updatedRoomSchema);
  if (!validation.success) return validation;

  try {
    if (!validation.data) {
      return {
        success: false,
        message: "Validation failed.",
        inputs: room,
      };
    }
    const roomId = validation.data.id;

    // Fetch existing room data
    const { data: existingRoom, error: fetchError } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .single();
    if (fetchError) throw new Error("Room not found");

    // Process form data
    const newImages = validation.data?.room_images as unknown as File[] || [];
    const existingImages = existingRoom.room_images || [];

    // Upload new images
    const uploadedUrls = await uploadImagesToSupabase(newImages);

    // Update room data
    const roomUpdates = {
      ...validation.data,
      room_images: [...existingImages, ...uploadedUrls],
    };

    // Update database record
    const { error: updateError } = await supabase
      .from("rooms")
      .update(roomUpdates)
      .eq("id", roomId);
    if (updateError) throw updateError;

    // Revalidate paths
    revalidateRoomPaths();

    return {
      success: true,
      message: "Your place was updated successfully.",
      inputs: roomUpdates,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      inputs: room,
    };
  }
}

export async function updateReservationStatus(reservationId : number, status:string) {
  
  const { data, error } = await supabase
  .from('reservations')
  .update({ status: status })
  .eq('id', reservationId)
  .select()
  
    if (error) {
      throw new Error(error.message);
    }
  revalidatePath("/account/homely-rooms/bookings/*","layout")
  revalidatePath("/trips","layout")
    return data;
  }

export async function createReservation(
  newReservation: BookingDataType,
) {
 
  const result = bookingSchema.safeParse(newReservation);
  if (!result.success) {
    const errorMap: Record<string, string> = {};
    result.error.errors.map((error) => {
      errorMap[error.path[0]] = error.message;
    });
    return {
      success: false,
      errors: errorMap,
      inputs: newReservation,
      message:"please entered a valid booking data"
    }
  }
  
    const roomId = result.data.room_id
    const check_in = result.data.check_in
    const check_out = result.data.check_out
    const available = await checkAvailability(roomId, check_in, check_out)

    if(!available){
      return {
        success: false,
        message: "Sorry, the room is not available for this period.",
        inputs: newReservation,
      }
    }
  const { data, error } = await supabase
    .from("reservations")
    .insert({...result.data,check_in:new Date(result.data.check_in),check_out:new Date(result.data.check_out)})
    .select();
    revalidatePath("/account/reservations");

  if (error) {
    return {
      success: false,
      inputs: newReservation,
      message:"Something went wrong, please try again later"
    }  }
    return {
      success: true,
      message: "Reservation created successfully, and place owner will contact you soon.",
      inputs: newReservation,
    }

}

export async function addComment(previousState: any, formData: FormData) {
  const comment = {
    room_id: formData.get("roomId"),
    comment: formData.get("comment"),
    user_id: formData.get("userId"),
  };

  const { data, error } = await supabase
    .from("comments")
    .insert(comment)
    .select();

  if (error) {
    throw new Error("Failed to add comment: " + error.message);
  }

  revalidatePath(`/${comment.room_id}`);
  return data;
}
