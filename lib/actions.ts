"use server";

import { redirect } from "next/navigation";
import { createServerComponentClient } from "./server";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

type SearchQuery =  {
  [key: string]: string;
}

type bookingData = {
  roomId: string;
  startDay: string;
  endDay: string;
  nights: number;
  guests: number;
  totalPrice: number;
  serviceFee: number;
  cleaningFee: number
}

export async function createReservation(bookingData: bookingData, formData: FormData) {
  const supabase = createServerComponentClient();
  const { data: {user} } = await supabase.auth.getUser();

  const newBooking = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    number: Number(formData.get("number")),
    idNumber: Number(formData.get("idNumber")),
    notes: formData.get("notes"),
    roomId: bookingData.roomId,
    startDay: bookingData.startDay,
    endDay: bookingData.endDay,
    nights: Number(bookingData.nights),
    guests: Number(bookingData.guests),
    totalPrice: Math.ceil(
      Number(bookingData.totalPrice) +
        Number(bookingData.serviceFee) +
        Number(bookingData.cleaningFee)
    ),
    userId: user?.id ,
  };

  const { data, error } = await supabase
    .from("reservations")
    .insert([newBooking])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/account/reservations")
  redirect("/")
}



export async function signIn(searchParams: SearchQuery,formData: FormData) {
  const supabase = createServerComponentClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

revalidatePath("/")

  const redirectUrl = searchParams.length
    ? `/reservation?${new URLSearchParams(searchParams).toString()}`
    : "/";

  redirect(redirectUrl);
}

export async function signUp( searchParams: SearchQuery,formData: FormData) {
   const supabase = createServerComponentClient();

  const email = formData.get("email") as string
  const password = formData.get("password") as string;
  const name = formData.get("fullName") as string
  const phone = formData.get("phoneNumber")
  
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password, options: {
      data: {
        name: name,
        phone: phone
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  const redirectUrl = searchParams.length
    ? `/reservation?${new URLSearchParams(searchParams).toString()}`
    : "/";

  redirect(redirectUrl);
}

export async function signOut() {
  const supabase = createServerComponentClient();

  let { error } = await supabase.auth.signOut();

  revalidatePath("/")

  redirect("/");
}
