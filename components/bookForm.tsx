// "use client";

// import { createReservation } from "@/lib/actions";

// type searchType = {
//   searchParams: {
//     roomId: string;
//     startDay: string;
//     endDay: string;
//     nights: number;
//     guests: number;
//     totalPrice: number;
//     cleaningFee: number;
//     serviceFee: number;
//   };
// };

// export default function BookForm({ searchParams }: searchType) {
//   const {
//     roomId,
//     startDay,
//     endDay,
//     nights,
//     guests,
//     totalPrice,
//     cleaningFee,
//     serviceFee,
//   } = searchParams;

//   const bookingData = {
//     roomId,
//     startDay,
//     endDay,
//     nights,
//     guests,
//     totalPrice,
//     cleaningFee,
//     serviceFee,
//   };

//   const createReservationWithData = createReservation.bind(null, bookingData);
//   return (
//     <div className="flex justify-center lg:max-w-lg">
//       <div className="w-full">
//         <form action={createReservationWithData} className="flex flex-col">
//           <input
//             name="fullName"
//             placeholder="Your Name"
//             className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full"
//             type="text"
//           />
//           <input
//             name="email"
//             placeholder="Your Email"
//             className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full"
//             type="email"
//           />
//           <input
//             name="number"
//             placeholder="Phone Number"
//             className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full"
//             type="text"
//           />
//           <input
//             name="idNumber"
//             placeholder="Identity Number"
//             className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full"
//             type="number"
//           />
//           <textarea
//             name="notes"
//             placeholder="Notes"
//             className="h-36 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full resize-none"
//           ></textarea>

//           <button
//             className="bg-[#F5556C] w-full mx-auto text-white text-xl font-bold py-2 px-4 rounded-md mt-4"
//             type="submit"
//           >
//             Request to book
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
