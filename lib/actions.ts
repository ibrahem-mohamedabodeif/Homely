"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

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

export async function addRoom(
  previousState: any,
  formData: FormData
): Promise<void> {
  const user = await currentUser();
  const room: Record<string, any> = {
    user_id: user?.id,
    country: formData.get("country")?.toString().toLowerCase(),
    city: formData.get("city")?.toString().toLowerCase(),
    address: formData.get("address")?.toString().toLowerCase(),
    room_name: formData.get("roomName"),
    room_category: formData.get("category")?.toString().toLowerCase(),
    room_description: formData.get("description"),
    guests_num: formData.get("guests"),
    room_price: formData.get("price"),
    bathrooms_num: formData.get("noBath"),
    beds_num: formData.get("noBed"),
    bedrooms_num: formData.get("noBedroom"),
  };

  const uploadImage = async (imageFile: File | null, index: number) => {
    if (!imageFile) return null;

    const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
    const { data, error: storageError } = await supabase.storage
      .from("images")
      .upload(imageName, imageFile);

    if (storageError) {
      throw new Error(
        `Failed to upload image ${index + 1}: ${storageError.message}`
      );
    }

    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("images")
      .createSignedUrl(imageName, 60 * 60 * 24 * 365);

    if (urlError) {
      throw new Error(
        `Failed to generate signed URL for image ${index + 1}: ${
          urlError.message
        }`
      );
    }

    return signedUrlData.signedUrl;
  };

  for (let i = 1; i <= 5; i++) {
    const imageKey = `image${i}`;
    const imageFile = formData.get(imageKey) as File;
    room[imageKey] = imageFile ? await uploadImage(imageFile, i) : null;
  }

  const { data, error } = await supabase.from("rooms").insert([room]).select();

  if (error) {
    throw new Error("Failed to insert room details: " + error.message);
  }
  revalidatePath("/", "layout");
  revalidatePath("/account/homley-rooms");
  redirect("/account/homely-rooms");
}

export async function updateRoom(
  previousState: any,
  formData: FormData
): Promise<void> {
  const roomId = formData.get("roomId") as string;
  const user = await currentUser();

  // Fetch the existing room data
  const { data: existingRoom, error: fetchError } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (fetchError) {
    throw new Error(`Failed to fetch room data: ${fetchError.message}`);
  }

  // Initialize the roomUpdates object
  const roomUpdates: Record<string, any> = {
    user_id: user?.id,
    country: formData.get("country")?.toString().toLowerCase(),
    city: formData.get("city"),
    address: formData.get("address"),
    room_name: formData.get("roomName"),
    room_category: formData.get("category"),
    room_description: formData.get("description"),
    guests_num: formData.get("guests"),
    room_price: formData.get("price"),
    bathrooms_num: formData.get("noBath"),
    beds_num: formData.get("noBed"),
    bedrooms_num: formData.get("noBedroom"),
  };

  // Function to upload images and get signed URLs
  const uploadImage = async (imageFile: File | null, index: number) => {
    if (!imageFile) return null;

    const imageName = `${Math.random()}-${imageFile.name}`.replace(/\//g, "-");
    const { data, error: storageError } = await supabase.storage
      .from("images")
      .upload(imageName, imageFile);

    if (storageError) {
      throw new Error(
        `Failed to upload image ${index + 1}: ${storageError.message}`
      );
    }

    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("images")
      .createSignedUrl(imageName, 60 * 60 * 24 * 365); // 1 year expiration

    if (urlError) {
      throw new Error(
        `Failed to generate signed URL for image ${index + 1}: ${
          urlError.message
        }`
      );
    }

    return signedUrlData.signedUrl;
  };

  // Process each image input
  for (let i = 1; i <= 5; i++) {
    const imageKey = `image${i}`;
    const imageFile = formData.get(imageKey) as File | null;

    // If a new image is provided, upload it and update the roomUpdates
    if (imageFile && imageFile.size > 0) {
      roomUpdates[imageKey] = await uploadImage(imageFile, i);
    } else if (existingRoom[imageKey]) {
      // If no new image is provided, retain the existing image URL
      roomUpdates[imageKey] = existingRoom[imageKey];
    }
  }

  // Update the room details in the database
  const { data, error } = await supabase
    .from("rooms")
    .update(roomUpdates)
    .eq("id", roomId)
    .select();

  if (error) {
    throw new Error("Failed to update room details: " + error.message);
  }
  revalidatePath("/", "layout");
  revalidatePath("/account/homley-rooms");
  redirect("/account/homely-rooms");
}

export async function createReservation(
  previousState: any,
  formData: FormData
) {
  const newBooking = {
    client_name: formData.get("fullName") as string,
    client_email: formData.get("email") as string,
    client_phone: Number(formData.get("number")) as number,
    client_idNum: Number(formData.get("idNumber")) as number,
    client_notes: formData.get("notes") as string,
    room_id: formData.get("roomId") as string,
    check_in: new Date(formData.get("startDay") as string),
    check_out: new Date(formData.get("endDay") as string),
    nights: Number(formData.get("nights")) as number,
    guests_num: Number(formData.get("guests")) as number,
    total_price: Number(formData.get("totalPrice")) as number,
    user_id: formData.get("userId") as string,
  };

  const { data, error } = await supabase
    .from("reservations")
    .insert([newBooking])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/account/reservations");
  redirect("/");
}

export async function addComment(previousState: any, formData: FormData) {
  const comment = {
    room_id: formData.get("roomId"),
    comment: formData.get("comment"),
    user_id : formData.get("userId"),
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
