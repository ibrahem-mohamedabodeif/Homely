import Image from "next/image";
import Link from "next/link";
import SaveButton from "./saveButton";
import { FaRegHeart } from "react-icons/fa";

export default function CardItem({ room, userId }: any) {
  return (
    <Link href={`/rooms/${room.id}`}>
      <div className=" relative w-72 h-72 rounded-xl overflow-hidden">
        <SaveButton userId={userId} roomId={room.id}>
          {" "}
          <FaRegHeart
            size={23}
            className=" absolute right-3 top-8 text-white"
          />
        </SaveButton>
        <Image
          src={room.image1}
          alt={room.roomName}
          width={500}
          height={700}
          className="h-full object-cover rounded-xl"
        />
      </div>
      <div className="mt-2 mb-2">
        <h1 className="text-lg capitalize">
          {room.city}, {room.country}
        </h1>
        <p className="text-gray-700">Rethimno Beach</p>
      </div>
      <span className="text-gray-900 font-semibold">${room.price}</span>{" "}
      <span className="text-gray-600">/ night</span>
    </Link>
  );
}
