// import ReservationCard from "@/components/reservationCard";
// import { getUserData } from "@/lib/actions";
// import { getHomelyBookings} from "@/lib/functions";
// import { createServerComponentClient } from "@/lib/server";
// import { redirect } from "next/navigation";

// export default async function Page() {
//   const userData = await getUserData();

//   const homelyBookings = await getHomelyBookings(userData?.user_id);

//   return (
//     <>
//       {!homelyBookings?.length ? (
//         <div className="text-4xl flex justify-center mt-40">
//           No reservations yet
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-y-10 gap-16 mb-24">
//           {homelyBookings.map((room) => (
//             <ReservationCard room={room} key={room.id} />
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
