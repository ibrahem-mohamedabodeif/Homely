import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

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
        "*, rooms!inner(userId,country, city,address,guests, noBed,noBedroom, noBath, image1, roomName, hostedName)"
      )
      .eq("id", reservationId).single()
  
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
    revalidatePath("/account/homely-rooms");
    
  }


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

  export async function getReservations(userId) {
    let { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("user_id", userId)
      .select(
        "*" ,`rooms(country, city, image1, room_name)`
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
    
      return data;
    }

export async function checkAvailability(roomId, startDay, endDay) {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("room_id", roomId)
    .or(`and(check-in.lte.${endDay},check-out.gte.${startDay})`);

  if (error) {
    return false;
  }

  return data.length === 0;
}


// export async function getRoomsBySearch(country) {
//   const { data, error } = await supabase
//     .from("rooms")
//     .select("*")
//     .eq("country", country);

//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// }


// // {/* reservations */}



// // {/* wishList */}





// {/* Homely rooms and bookings */}






{/* comments */}
//  export async function getComments(roomId) {
//    const { data, error } = await supabase
//      .from("comments")
//      .select("*")
//      .eq("room_id", roomId);
//    if (error) {
//     throw new Error(error.message);
//    }
//    return data;
//  }

