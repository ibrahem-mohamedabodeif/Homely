import Image from "next/image";
import Link from "next/link";

export default function ReservationCard({ room }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="w-56 h-28 relative rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={room.rooms.image1}
          alt={room.rooms.roomName}
          width={500}
          height={500}
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <Link href={`/rooms/${room.roomId}`}>
            <h1 className="capitalize font-semibold text-lg pb-1">
              {room.rooms.roomName}
            </h1>
          </Link>
          <h1 className="text-md capitalize text-gray-700">
            {room.rooms.city}, {room.rooms.country}
          </h1>
        </div>
        <p className="text-gray-700 text-sm">
          {room.startDay} -&gt; {room.endDay}
        </p>
        <div className="flex justify-end">
          <span className="text-gray-600 text-sm">
            ${room.totalPrice} / {room.nights} night{room.nights > 1 && "s"}
          </span>
        </div>
      </div>
    </div>
  );
}
