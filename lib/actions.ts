"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { BookingDataType, bookingSchema } from "./schema";

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
export async function addRoom(previousState: any, formData: FormData) {
  const user = await currentUser();
  const roomImages = formData.getAll("room_images");
  const roomData = {
    user_id: user?.id,
    room_name: formData.get("roomName"),
    country: formData.get("country"),
    city: formData.get("city"),
    address: formData.get("address"),
    room_description: formData.get("description"),
    room_category: formData.get("category"),
    guests_num: formData.get("guests"),
    bedrooms_num: formData.get("noBedroom"),
    beds_num: formData.get("noBed"),
    bathrooms_num: formData.get("noBath"),
    room_price: formData.get("price"),
    room_images: roomImages,
  };

  // Upload images to Supabase Storage and get URLs
  const imageUrls = await Promise.all(
    roomImages.map(async (image) => {
      const imageName = `${Math.random()}-${(image as File).name}`.replaceAll(
        "/",
        ""
      );
      const { data, error } = await supabase.storage
        .from("images")
        .upload(imageName, image);
      if (error) throw error;

      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("images")
        .createSignedUrl(imageName, 60 * 60 * 24 * 365);
      if (urlError) throw urlError;
      return signedUrlData.signedUrl;
    })
  );

  // Save room data with image URLs
  const { data, error } = await supabase
    .from("rooms")
    .insert([{ ...roomData, room_images: imageUrls }])
    .select();

  if (error) throw error;
  revalidatePath("/", "layout");
  revalidatePath("/account/homley-rooms");
  redirect("/account/homely-rooms");
}

export async function updateRoom(previousState: any, formData: FormData) {
  const user = await currentUser();

  const roomId = formData.get("roomId");

  // Fetch Existing Room Data
  const { data: existingRoom, error: fetchError } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (fetchError) throw new Error("Room not found");

  // Process Form Data
  const newImages = formData.getAll("room_images") as File[];
  const existingImages = existingRoom.room_images || [];

  const roomUpdates = {
    room_name: formData.get("roomName"),
    country: formData.get("country"),
    city: formData.get("city"),
    address: formData.get("address"),
    room_description: formData.get("description"),
    room_category: formData.get("category"),
    guests_num: Number(formData.get("guests")),
    bedrooms_num: Number(formData.get("noBedroom")),
    beds_num: Number(formData.get("noBed")),
    bathrooms_num: Number(formData.get("noBath")),
    room_price: Number(formData.get("price")),
    room_images: existingImages,
  };

  // Upload New Images
  const uploadedUrls = await Promise.all(
    newImages.map(async (image) => {
      if (image && image.size > 0) {
        const imageName = `${Math.random()}-${(image as File).name}`.replaceAll(
          "/",
          ""
        );
        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(imageName, image);

        if (uploadError) throw uploadError;

        const { data: signedUrlData, error: urlError } = await supabase.storage
          .from("images")
          .createSignedUrl(imageName, 60 * 60 * 24 * 365);
        if (urlError) throw urlError;
        return signedUrlData.signedUrl;
      }
      return null;
    })
  );

  roomUpdates.room_images = [
    ...existingImages,
    ...uploadedUrls.filter((url) => url !== null),
  ];

  // Update Database Record
  const { error: updateError } = await supabase
    .from("rooms")
    .update(roomUpdates)
    .eq("id", roomId);

  if (updateError) throw updateError;

  // Revalidate and Redirect
  revalidatePath("/", "layout");
  revalidatePath("/account/homely-rooms");
  redirect("/account/homely-rooms");
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
      message: "Reservation created successfully",
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
