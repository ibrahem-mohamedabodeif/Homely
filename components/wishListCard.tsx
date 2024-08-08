import Image from "next/image";
import Link from "next/link";

type reservationRooms = {
  room: {
    id: string;
    totalPrice: number;
    nights: number;
    startDay: string;
    endDay: string;
    roomId: string;
    rooms: {
      city: string;
      image1: string;
      country: string;
      roomName: string;
      hostedName: string;
      price: number;
    };
  };
};

export default function WishListCard({ room }: reservationRooms) {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-3">
      <div className="w-56 h-28 mx-auto relative rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={room.rooms.image1}
          alt={room.rooms.roomName}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between ">
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
        <p className="text-gray-700 text-md">
          Hosted by {room.rooms.hostedName}
        </p>
        <div>
          <span className="text-gray-600 float-end mt-4">
            ${room.rooms.price} / night
          </span>
        </div>
      </div>
    </div>
  );
}