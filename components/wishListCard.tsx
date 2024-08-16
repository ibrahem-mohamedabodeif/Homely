import Image from "next/image";
import Link from "next/link";

export default function WishListCard({ room }: any) {
  return (
    <div className="max-w-lg flex flex-col lg:flex-row gap-3">
      <div className="w-56 h-28 relative rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={room.rooms.image1}
          alt={room.rooms.roomName}
          width={500}
          height={500}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col justify-between ">
        <div>
          <Link href={`/${room.id}`}>
            <h1 className="capitalize font-semibold text-lg pb-1">
              {room.rooms.roomName}
            </h1>
          </Link>
          <h1 className="text-md capitalize text-gray-700">
            {room.rooms.city}, {room.rooms.country}
          </h1>
        </div>
        <p className="text-gray-700 text-md">
          Hosted by {room.rooms.hostedName}
        </p>
        <div>
          <span className="text-gray-600 float-end mt-2">
            ${room.rooms.price} / night
          </span>
        </div>
      </div>
    </div>
  );
}
