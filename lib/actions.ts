"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { add } from "date-fns";
import { revalidatePath, revalidateTag } from "next/cache";


// import { revalidatePath } from "next/cache";
// import { signIn, signOut } from "./auth";
// // import { revalidatePath } from "next/cache";
// import { supabase } from "./supabase";
// import { redirect } from "next/navigation";
// import { AuthError } from "next-auth";
// // import {signIn , signOut} from "./auth";
// // import { redirect } from "next/navigation";


export async function updateUserInfo(previousState: any, formData: FormData) {
  const user =await currentUser()
  const updatedUser = {
    firstName: formData.get("firstName")?.toString() || user?.firstName || undefined,
    lastName: formData.get("lastName")?.toString() || user?.lastName || undefined,
    publicMetadata: {
      phoneNumber : formData.get("phoneNumber")?.toString() || user?.publicMetadata.phoneNumber?.toString(),
      dateOfBirth: formData.get("birthDate")?.toString() || user?.publicMetadata?.dateOfBirth?.toString(),
      about: formData.get("about")?.toString() || user?.publicMetadata.about?.toString(),
      work: formData.get("work")?.toString() || user?.publicMetadata.work?.toString(),
      languages: formData.get("languages")?.toString() || user?.publicMetadata.languages?.toString(),
      hobbies: formData.get("hobbies")?.toString() || user?.publicMetadata.hobbies?.toString(),
      address: formData.get("address")?.toString() || user?.publicMetadata.address?.toString(),
    }
  }

  if(user){
    (await clerkClient()).users.updateUser(user.id, updatedUser)
  }
  revalidatePath("/account")
  return updatedUser
}





{
  /* User */
}
// export async function signIn(previousState: any,formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//   if (error) {
//     return { message: "Invalid email or password" };
//   }
// redirect("/")
// }
// export async function signUp(previousState: any, formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const fullName = formData.get("fullName") as string;

//   const { data, error } = await supabase.auth.signUp({ email, password });

//   if (error || !data.user) {
//     return { message: error?.message || "Sign-up failed" };
//   }

//   await supabase.from("users").insert({
//     user_id: data.user.id,
//     user_name: fullName,
//     user_email: email,
//   });
//   redirect("/")
// }

// export async function signOut() {
//   const { error } = await supabase.auth.signOut();

//   if (error) {
//     return { message: "Failed to sign out" };
//   }

// }

// export async function getUserData() {
//   const {
//     data: { user },
//     error: authError,
//   } = await supabase.auth.getUser();

//   if (authError || !user) {
//     return null;
//   }
//   const userId = user.id;
//   const { data: userData, error: userError } = await supabase
//     .from("users")
//     .select("*")
//     .eq("user_id", userId)
//     .single();
//   if (userError) {
//     return null;
//   }
//   revalidatePath("/account");
//   revalidatePath("/");
//   return userData;
// }


// type bookingData = {
//     roomId: string;
//     startDay: string;
//     endDay: string;
//     nights: number;
//     guests: number;
//     totalPrice: number;
//     serviceFee: number;
//     cleaningFee: number
//   }

// export async function createReservation(bookingData: bookingData, formData: FormData) {
//   const userData = await getUserData();

//   const newBooking = {
//     fullName: formData.get("fullName"),
//     email: formData.get("email"),
//     number: Number(formData.get("number")),
//     idNumber: Number(formData.get("idNumber")),
//     notes: formData.get("notes"),
//     roomId: bookingData.roomId,
//     startDay: bookingData.startDay,
//     endDay: bookingData.endDay,
//     nights: Number(bookingData.nights),
//     guests: Number(bookingData.guests),
//     totalPrice: Math.ceil(
//       Number(bookingData.totalPrice) +
//         Number(bookingData.serviceFee) +
//         Number(bookingData.cleaningFee)
//     ),
//     userId: userData?.user_id ,
//   };

//   const { data, error } = await supabase
//     .from("reservations")
//     .insert([newBooking])
//     .select();
//   if (error) {
//     throw new Error(error.message);
//   }
//   revalidatePath("/account/reservations")
//   redirect("/")
// }

// export async function addRoom(formData: FormData) {
//   const userId = formData.get("userId");
//   const userData = await getUserData();
//    const userName = userData?.user_name;

//   const room: Record<string, any> = {
//     userId:formData.get("userId"),
//     hostedName: userName,
//     country: formData.get("country")?.toString().toLowerCase(),
//     city: formData.get("city"),
//     address: formData.get("address"),
//     roomName: formData.get("roomName"),
//     category: formData.get("category"),
//     description: formData.get("description"),
//     guests: formData.get("guests"),
//     price: formData.get("price"),
//     noBath: formData.get("noBath"),
//     noBed: formData.get("noBed"),
//     noBedroom: formData.get("noBedroom"),
//   };

//   const uploadImage = async (imageFile: File | null, index: number) => {
//     if (!imageFile) return null;

//     const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
//     const { data, error: storageError } = await supabase.storage
//       .from("images")
//       .upload(imageName, imageFile);

//     if (storageError) {
//       throw new Error(`Failed to upload image ${index + 1}: ${storageError.message}`);
//     }

//     const { data: signedUrlData, error: urlError } = await supabase.storage
//       .from("images")
//       .createSignedUrl(imageName, 60 * 60 * 24 * 365);

//     if (urlError) {
//       throw new Error(`Failed to generate signed URL for image ${index + 1}: ${urlError.message}`);
//     }

//     return signedUrlData.signedUrl;
//   };

//   for (let i = 1; i <= 5; i++) {
//     const imageKey = `image${i}`;
//     const imageFile = formData.get(imageKey) as File;
//     room[imageKey] = imageFile ? await uploadImage(imageFile, i) : null;
//   }

//   const { data, error } = await supabase
//     .from("rooms")
//     .insert([room])
//     .select();

//   if (error) {
//     throw new Error("Failed to insert room details: " + error.message);
//   }
//   revalidatePath("/")
//   redirect("/account/homely-rooms");
//   return data;
// }

// export async function updateRoom(formData: FormData) {
//   const roomId = formData.get("roomId") as string;

//   // Fetch the existing room data
//   const { data: existingRoom, error: fetchError } = await supabase
//     .from("rooms")
//     .select("*")
//     .eq("id", roomId)
//     .single();

//   if (fetchError) {
//     throw new Error(`Failed to fetch room data: ${fetchError.message}`);
//   }

//   // Initialize the roomUpdates object
//   const roomUpdates: Record<string, any> = {
//     userId: formData.get("userId"),
//     hostedName: formData.get("hostedName"),
//     country: formData.get("country"),
//     city: formData.get("city"),
//     place: formData.get("place"),
//     roomName: formData.get("roomName"),
//     category: formData.get("category"),
//     description: formData.get("description"),
//     guests: formData.get("guests"),
//     price: formData.get("price"),
//     noBath: formData.get("noBath"),
//     noBed: formData.get("noBed"),
//     noBedroom: formData.get("noBedroom"),
//   };

//   // Function to upload images and get signed URLs
//   const uploadImage = async (imageFile: File | null, index: number) => {
//     if (!imageFile) return null;

//     const imageName = `${Math.random()}-${imageFile.name}`.replace(/\//g, "-");
//     const { data, error: storageError } = await supabase.storage
//       .from("images")
//       .upload(imageName, imageFile);

//     if (storageError) {
//       throw new Error(`Failed to upload image ${index + 1}: ${storageError.message}`);
//     }

//     const { data: signedUrlData, error: urlError } = await supabase.storage
//       .from("images")
//       .createSignedUrl(imageName, 60 * 60 * 24 * 365); // 1 year expiration

//     if (urlError) {
//       throw new Error(`Failed to generate signed URL for image ${index + 1}: ${urlError.message}`);
//     }

//     return signedUrlData.signedUrl;
//   };

//   // Process each image input
//   for (let i = 1; i <= 5; i++) {
//     const imageKey = `image${i}`;
//     const imageFile = formData.get(imageKey) as File | null;

//     // If a new image is provided, upload it and update the roomUpdates
//     if (imageFile && imageFile.size > 0) {
//       roomUpdates[imageKey] = await uploadImage(imageFile, i);
//     } else if (existingRoom[imageKey]) {
//       // If no new image is provided, retain the existing image URL
//       roomUpdates[imageKey] = existingRoom[imageKey];
//     }
//   }

//   // Update the room details in the database
//   const { data, error } = await supabase
//     .from("rooms")
//     .update(roomUpdates)
//     .eq("id", roomId)
//     .select();

//   if (error) {
//     throw new Error("Failed to update room details: " + error.message);
//   }
//   redirect("/account/homely-rooms");
//   return data;
// }

// export async function addComment(previousState: any, formData: FormData) {
//   const userData= await getUserData();
//   const userId = userData?.user_id;

//   let userName = "guest";
//   if (userId) {
//     userName = userData?.user_name || "guest";
//   }

//   const comment = {
//     room_id: formData.get("roomId"),
//     comment: formData.get("comment"),
//     user_name: userName
//   };

//   const { data, error } = await supabase
//     .from("comments")
//     .insert(comment)
//     .select();

//   if (error) {
//     throw new Error("Failed to add comment: " + error.message);
//   }

//   revalidatePath(`/${comment.room_id}`);
//   return data;
// }

// export async function getUser(email: string) {
//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("user_email", email)
//     .maybeSingle();
//   if (error) {
//     throw new Error("Failed to fetch user details: " + error.message);
//   }
//   return data;
// }

// export async function createUser(previousState: string, formData: FormData) {
//   const res = await fetch("http://localhost:3000/api/auth/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(Object.fromEntries(formData)),
//     credentials: "same-origin",
//   });

//   if (!res.ok) {
//     const errorResponse = await res.json().catch(() => null);
//     return errorResponse?.error || "Failed to create user";
//   }

//   const { user } = await res.json();
//   return user;
// }

// export async function signInAction(previousState: any, formData: FormData) {
//   try {
//     const res = await signIn("credentials", {
//       ...Object.fromEntries(formData),
//       redirect: false,
//     });
//     redirect("/");
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { message: "Invalid username or password" };
//         default:
//           return { message: "Something went wrong" + error.message };
//       }
//     }
//     throw error;
//   }
// }

// export async function signOutAction() {
//   await signOut({ redirectTo: "/" });
// }

