import NavBar from "@/components/navbar";
import ReservationCard from "@/components/reservationCard";
import { getReservations } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const reservationRooms = await getReservations(user.id);

  return (
    <>
    <NavBar user={user} />
      <div className="lg:mx-20 mt-5">
        <div className="flex items-center gap-4 pb-10">
        <IoIosArrowBack />
          <h1 className="text-2xl tracking-wide font-semibold"> Trips

          </h1>
        </div>
      {!reservationRooms?.length ? (
        <div className="text-4xl flex justify-center mt-40">
          No reservations yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-10  mb-24 mx-10">
          {reservationRooms.map((room) => (
            <ReservationCard room={room} key={room.id} />
          ))}
        </div>
      )}
      </div>
    </>
  );
}
