// import Image from "next/image";

// type pageProp = {
//   room: {
//     image1: string;
//     price: number;
//     roomName: string;
//     city: string;
//     country: string;
//   };
//   searchParams: {
//     nights: number;
//     cleaningFee: number;
//     serviceFee: number;
//   };
// };

// export default function BookCard({ room, searchParams }: pageProp) {
//   const nights = searchParams.nights;
//   const price = Number(room.price);
//   const cleaningFee = Number(searchParams.cleaningFee);
//   const serviceFee = Number(searchParams.serviceFee);

//   const total = Math.ceil(price * nights + cleaningFee + serviceFee);

//   return (
//     <div className="max-w-full md:max-w-2xl border border-[#6e6e6e] p-6 rounded-3xl bg-white">
//       <div className="flex gap-4 mb-5">
//         <div className="relative w-48 h-32 overflow-hidden">
//         <Image
//           src={room.image1}
//           alt={room.roomName}
//           width={500}
//           height={700}
//           className="h-full object-cover rounded-xl"
//         />
//         </div>
//         <div className="flex flex-col justify-around text-center sm:text-left">
//           <h1 className="font-medium text-lg text-wrap capitalize">{room.roomName}</h1>
//           <h1 className="text-wrap capitalize">{room.city}, {room.country}</h1>
//         </div>
//       </div>
//       <div className="border-t border-[#6e6e6e] pt-5">
//         <h1 className="text-xl font-semibold">Price details</h1>
//         <div className="flex flex-col gap-3 mt-5">
//           <div className="flex justify-between items-center">
//             <span>
//               ${price} x {nights} nights
//             </span>
//             <span>${price * nights}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span>Cleaning fee</span>
//             <span>${cleaningFee}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span>Homely service fee</span>
//             <span>${serviceFee}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
