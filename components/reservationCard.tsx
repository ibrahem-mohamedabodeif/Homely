import Image from "next/image";
import Link from "next/link";

export default function ReservationCard({ room }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-start">
      <div className="w-56 h-40 relative rounded-xl overflow-hidden flex-grow-0">
        <Image
          src={room.rooms.image1}
          alt={room.rooms.roomName}
          width={500}
          height={500}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link href={`/rooms/${room.roomId}`}>
            <h1 className="capitalize font-semibold pb-1">
              {room.rooms.roomName}
            </h1>
          </Link>
          <h1 className="text-sm capitalize text-gray-700">
            {room.rooms.city}, {room.rooms.country}
          </h1>
        </div>
        <p className="text-gray-700 text-sm">
          {room.startDay} -&gt; {room.endDay}
        </p>
        <div className="flex justify-between items-center gap-24">
          <span className="text-gray-600 text-sm">
            ${room.totalPrice} / {room.nights} night{room.nights > 1 && "s"}
          </span>
          <span className="border p-1.5 rounded-lg text-sm text-gray-600 bg-green-300">
            unconfirmed
          </span>
        </div>
      </div>
    </div>
  );
}
