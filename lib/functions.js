import { revalidatePath } from "next/cache";
import { createClient } from "./client";

const supabase = createClient();

export async function getAllRooms() {
  const { data: rooms, error } = await supabase.from("rooms").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return rooms;
}

export async function getRoomById(roomId) {
  const { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return room;
}

export async function checkAvailability(roomId, startDay, endDay) {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("roomId", roomId)
    .or(`and(startDay.lte.${endDay},endDay.gte.${startDay})`);

  if (error) {
    return false;
  }

  return data.length === 0;
}

export async function getRoomsBySearch(country) {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("country", country);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getReservations(userId) {
  let { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("userId", userId)
    .select(
      `id, totalPrice, nights, startDay, endDay,roomId ,rooms(country, city, image1, roomName, hostedName)`
    )
    .order("startDay");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function addWishRoom(roomId, userId) {
  // Check if the room is already in the wishlist
  const { data, error: checkError } = await supabase
    .from("wishList")
    .select("*")
    .eq("userId", userId)
    .eq("roomId", roomId)
    .maybeSingle();

  if (checkError) {
    throw new Error(checkError.message);
  }

  if (data) {
    return { message: "Room already exists in wishlist" };
  }

  // Add room to wishlist
  const { data: wishRoom, error } = await supabase
    .from("wishList")
    .insert([{ userId, roomId }])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return wishRoom;
}

export async function getWishRooms(userId) {
  let { data, error } = await supabase
    .from("wishList")
    .select("*")
    .eq("userId", userId)
    .select(`id ,rooms(country, city, image1, roomName, hostedName, price)`);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getPegasusRooms(userId) {
  const { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("userId", userId);
  if (error) {
    throw new Error(error.message);
  }
  return room;
}

export async function getPegasusBookings(userId) {
  const { data, error } = await supabase
    .from("reservations")
    .select(
      "*, rooms!inner(userId,country, city, image1, roomName, hostedName)"
    )
    .eq("rooms.userId", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteRoom(roomId) {
  const { error } = await supabase.from("rooms").delete().eq("id", roomId);

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/account/pegasus-rooms");
}
