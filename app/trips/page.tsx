// import BackBtn from "@/components/backBtn";
// import NavBar from "@/components/navbar";
// import ReservationCard from "@/components/reservationCard";
// import { getUserData } from "@/lib/actions";
// import { getReservations } from "@/lib/functions";
// import { createServerComponentClient } from "@/lib/server";
// import { redirect } from "next/navigation";

// export default async function Page() {
//   const userData = await getUserData();
//     if (!userData) redirect("/signin");

//   const reservationRooms = await getReservations(userData.user_id);

//   return (
//     <>
//       {!reservationRooms?.length ? (
//         <div className="text-4xl flex justify-center mt-40">
//           No reservations yet
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-10  mb-24 mx-10">
//           {reservationRooms.map((room) => (
//             <ReservationCard room={room} key={room.id} />
//           ))}
//         </div>
//       )}
      
//     </>
//   );
// }
