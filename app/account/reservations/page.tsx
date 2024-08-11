import ReservationCard from "@/components/reservationCard";
import { getReservations } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";

// type reservationRoom = {
//   id: string;
//   totalPrice: number;
//   nights: number;
//   startDay: string;
//   endDay: string;
//   roomId: string;
//   rooms: {
//     city: string;
//     image1: string;
//     country: string;
//     roomName: string;
//     hostedName: string;
//   };
// };

type Room = {
  id: any;
  totalPrice?: number;
  nights?: number;
  startDay?: string;
  endDay?: string;
  roomId?: string;
  rooms?: {
    city: string;
    image1: string;
    country: string;
    roomName: string;
    hostedName: string;
  };
};

export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const reservationRooms: any = await getReservations(user.id);

  return (
    <>
      {!reservationRooms.length && (
        <div className="text-4xl flex justify-center mt-40">
          No reservatios yet
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2   justify-center   gap-y-10 gap-16 mb-24">
        {reservationRooms?.map((room: Room) => (
          <ReservationCard room={room} key={room.id} />
        ))}
      </div>
    </>
  );
}
