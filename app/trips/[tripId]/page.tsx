// import CancelledBtn from "@/components/cancelledBtn";
// import { getHomelyBookingsInfo} from "@/lib/functions";
// import { format } from "date-fns";

// export default async function TripInfo({
//   params,
// }: {
//   params: { tripId: number };
// }) {
//   const tripId = params.tripId;

//   const tripInfo = await getHomelyBookingsInfo(tripId);

//   function formatDateRange(startDate: string, endDate: string) {
//     const startFormatted = format(new Date(startDate), "d MMM");
//     const endFormatted = format(new Date(endDate), "d MMM");

//     return `${startFormatted} - ${endFormatted}`;
//   }

  
//   return (
//     <>
//     <div className="mb-20">
//       <div className="lg:max-w-lg">
//         <h1 className="text-2xl font-semibold text-[#F5556C]">
//           {tripInfo.rooms.roomName}
//         </h1>
//         <div className="pt-5 pb-5 mb-5 border-b border-[#6e6e6e] flex flex-col gap-5">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg  tracking-wide">Dates</h2>
//             <span className="text-lg font-light">
//               {formatDateRange(
//                 tripInfo.startDay,
//                 tripInfo.endDay
//               )}
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg tracking-wide">Guests</h2>
//             <span className="text-lg font-light">
//               {tripInfo.guests} guest
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg tracking-wide">Total Price</h2>
//             <span className="text-lg font-light">
//               {tripInfo.totalPrice} $
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center lg:max-w-lg">
//         <div className="w-full flex flex-col gap-4">
//           <div className="flex flex-col gap-2">
//             <label className="text-lg tracking-wide">Hosted by</label>
//             <span className="text-lg font-extralight">
//               {tripInfo.rooms.hostedName}
//             </span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <label className="text-lg tracking-wide">Room Info</label>
//             <span className="text-lg font-extralight">
//               {tripInfo.rooms.guests + " guests, " + tripInfo.rooms.noBedroom + " Bedroom, " + tripInfo.rooms.noBed +" Bed, " + tripInfo.rooms.noBath +" Bath"}
//             </span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <label className="text-lg tracking-wide">Room Location</label>
//             <span className="text-lg font-extralight">
//               {tripInfo.rooms.country + ", " + tripInfo.rooms.city + ", " + tripInfo.rooms.address}
//             </span>
//           </div>
          
//           <div className="flex items-center justify-between gap-2 border-t border-[#6e6e6e] mt-5 pt-2">
//             <CancelledBtn reservationId={tripId}/>
//             <span className="text-lg font-extralight">
//               {tripInfo.status}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }
