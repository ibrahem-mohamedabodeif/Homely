import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import Fuse from "fuse.js";

{/* rooms */}
export async function getAllRooms() {
  const { data: rooms, error } = await supabase.from("rooms").select("*");
  if (error) {
    throw new Error( "Failed to get rooms" + error.message);
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
    throw new Error("Failed to get room" + error.message);
  }
  return room;
}

{/* search */}
export async function searchRooms(filters) {
  const { type, destination, guestsNum, bedroomsNum, bedsNum, price } = filters;

  let query = supabase.from("rooms").select("*");

  if (type) query = query.eq("room_category", type);
  if (guestsNum) query = query.eq("guests_num", guestsNum);
  if (bedroomsNum) query = query.eq("bedrooms_num", bedroomsNum);
  if (bedsNum) query = query.eq("beds_num", bedsNum);

  if (price) {
    if (price === "<200") query = query.lte("room_price", 200);
    else if (price === "<500") query = query.gt("room_price", 200).lte("room_price", 500);
    else if (price === "<1000") query = query.gt("room_price", 500).lte("room_price", 1000);
    else if (price === ">1000") query = query.gte("room_price", 1000);
  }

  const { data: rooms, error } = await query;
  if (error) throw new Error(error.message);

  if (destination) {
    const fuse = new Fuse(rooms, {
      keys: ["country", "city", "address"],
      threshold: 0.3, 
    });

    const results = fuse.search(destination);
    return results.map((result) => result.item);
  }

  return rooms;
}

export async function getDestination(){
  const { data, error } = await supabase
    .from("rooms")
    .select("country, city")
    .not("country, city", "is", null) 
    .order("city", { ascending: true });

  if (error) throw new Error(error.message);

  const destination = [...new Set(data.map((room) => room.city + ", " + room.country))];
  return destination;
}

{/* Homely rooms and bookings */}
export async function getHomelyRooms(userId) {
    const { data: room, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      throw new Error(error.message);
    }
    return room;
  }

  export async function getHomelyBookings(userId) {
    const { data, error } = await supabase
      .from("reservations")
      .select(
        "*, rooms!inner(user_id,country, city, image1, room_name)"
      )
      .eq("rooms.user_id", userId);
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data;
  }

  export async function getHomelyBookingsInfo(reservationId) {
    const { data, error } = await supabase
      .from("reservations")
      .select(
        "*, rooms!inner(user_id,country, city,address,guests_num, beds_num,bedrooms_num, bathrooms_num, image1, room_name)"
      )
      .eq("id", reservationId).single()
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data;
  }

 export async function deleteRoom(roomId) {
  try {
    const { error } = await supabase.from("rooms").delete().eq("id", roomId);
    
    if (error) {
      return false;
    }
    
    revalidatePath("/account/homely-rooms");
    return true;
  } catch (error) {
    return false;
  }
}

{/* wishList */}
  export async function addWishRoom(roomId, userId) {
    // Check if the room is already in the wishlist
    const { data, error: checkError } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", userId)
      .eq("room_id", roomId)
      .maybeSingle();
  
    if (checkError) {
      throw new Error(checkError.message);
    }
  
    if (data) {
      return { message: "Room already exists in wishlist" };
    }
  
    // Add room to wishlist
    const { data: wishRoom, error } = await supabase
      .from("wishlist")
      .insert([{user_id: userId, room_id: roomId}])
      .select();
  
    if (error) {
      throw new Error(error.message);
    }
    return wishRoom;
  }

  export async function getWishRooms(userId) {
    let { data, error } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", userId)
      .select(`id ,rooms(country, city, image1, room_name, room_price, address)`);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  export async function deleteWishRoom(roomId) {
    const { error } = await supabase.from("wishlist").delete().eq("id", roomId);
  
    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/wishlist")
  }
{/* reservations */}
  export async function getReservations(userId) {
    let { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("user_id", userId)
      .select(
        "*,rooms(country, city, image1, room_name)"
      )
      .order("check_in");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }


  export async function updateReservationStatus(reservationId, status) {
  
    const { data, error } = await supabase
    .from('reservations')
    .update({ status: status })
    .eq('id', reservationId)
    .select()
    
      if (error) {
        throw new Error(error.message);
      }
    revalidatePath("/account/homely-rooms/bookings")
    revalidatePath("/trips")
      return data;
    }

export async function checkAvailability(roomId, startDay, endDay) {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("room_id", roomId)
    .or(`and(check_in.lte.${endDay},check_out.gte.${startDay})`);

  if (error) {
    return false;
  }

  return data.length === 0;
}

{/* comments */}
 export async function getComments(roomId) {
   const { data, error } = await supabase
     .from("comments")
     .select("*")
     .eq("room_id", roomId);
   if (error) {
    throw new Error(error.message);
   }
   return data;
 }

