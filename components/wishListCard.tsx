import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

export default function WishListCard({ room }: any) {
  return (
    <div className="flex flex-col">
      <div className="relative w-72 h-44 rounded-xl overflow-hidden">
      <MdDeleteOutline

            size={35}
            className=" absolute right-1 top-1 text-white rounded-full p-1.5 bg-gray-900"
          />
        <Image
          src={room.rooms.image1}
          alt={room.rooms.roomName}
          width={500}
          height={700}
          className="h-full object-cover rounded-xl"
        />
      </div>
      <div className="mt-2 mb-2 ml-1">
        <h1 className="text-lg capitalize">
          {room.rooms.city}, {room.rooms.country}
        </h1>
        <p className="text-gray-700">Rethimno Beach</p>
      </div>
    </div>
  );
}
