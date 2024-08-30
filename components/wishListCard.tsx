import Image from "next/image";
import Link from "next/link";

export default function WishListCard({ room }: any) {
  return (
    <div className="max-w-full flex flex-col lg:flex-row gap-3">
      <div className="w-64 h-44 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={room.rooms.image1}
          alt={room.rooms.roomName}
          width={500}
          height={500}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col justify-between h-40">
        <div>
          <Link href={`/${room.id}`}>
            <h1 className="capitalize font-semibold pb-1">
              {room.rooms.roomName}
            </h1>
          </Link>
          <h1 className="text-sm capitalize text-gray-700">
            {room.rooms.city}, {room.rooms.country}
          </h1>
        </div>
        <p className="text-gray-700 ">Hosted by {room.rooms.hostedName}</p>
        <span className="text-gray-600">${room.rooms.price} / night</span>
      </div>
    </div>
  );
}
