import ReservationCard from "@/components/reservationCard";
import { getReservations } from "@/lib/functions";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  const reservationRooms = await getReservations(user?.id);

  return (
    <>
      {!reservationRooms?.length ? (
        <div className="text-2xl md:text-4xl flex justify-center  items-center ">
          No reservations yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-10  mb-24 md:mx-10">
          {reservationRooms.map((room) => (
            <ReservationCard room={room} key={room.id} />
          ))}
        </div>
      )}
      
    </>
  );
}
