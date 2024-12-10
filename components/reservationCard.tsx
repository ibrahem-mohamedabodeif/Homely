import Image from "next/image";
import Link from "next/link";

export default function ReservationCard({ room }: any) {
  return (
    // <div className="flex flex-col lg:flex-row gap-3 items-start">
    //   
    //   <div className="flex flex-col justify-between h-full">
    //     <div>
    //       <Link href={`/rooms/${room.roomId}`}>
    //         <h1 className="capitalize font-semibold pb-1">
    //           {room.rooms.roomName}
    //         </h1>
    //       </Link>
    //       <h1 className="text-sm capitalize text-gray-700">
    //         {room.rooms.city}, {room.rooms.country}
    //       </h1>
    //     </div>
    //     <p className="text-gray-700 text-sm">
    //       {room.startDay} -&gt; {room.endDay}
    //     </p>
    //     <div className="flex justify-between items-center gap-24">
    //       <span className="text-gray-600 text-sm">
    //         ${room.totalPrice} / {room.nights} night{room.nights > 1 && "s"}
    //       </span>
    //       <span className="border p-1.5 rounded-lg text-sm text-gray-600 bg-green-300">
    //         unconfirmed
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center gap-5 border border-[#6e6e6e] p-4 rounded-2xl">
      <div className="flex flex-col justify-center border-r border-[#6e6e6e] pr-2 h-full">
        <span className="text-xl text-[#F5556C]">Nov</span>
        <span className="text-xl text-[#F5556C]">10</span>
      </div>
      <div className="flex">
        <div className="relative w-48 h-32 rounded-3xl overflow-hidden">
          <Image
            src={room.rooms.image1}
            alt={room.rooms.roomName}
            width={500}
            height={500}
            className="h-full object-cover"
          />
        </div>
        <div className="pl-4 flex flex-col justify-between items-start">
          <h1 className="text-base">{room.rooms.roomName.slice(0, 15)}...</h1>
          <span className="text-base font-extralight">10 Nov - 15 Nov</span>
          <span className="text-base font-extralight">1 guest . 5 nights</span>
          <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 border border-[#6e6e6e] rounded-full overflow-hidden">
            <Image
              src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
              alt="image"
              width={200}
              height={200}
              className="h-full rounded-full object-cover"
              
            />
            </div>
            <span className="font-extralight">Hosted by ibrahem</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center h-full pl-5">
        <span className="font-light">$ {room.totalPrice}</span>
        <span className="text-[#F5556C] font-light"> unconfirmed </span>
      </div>
    </div>
  );
}
