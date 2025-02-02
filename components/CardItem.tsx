import Image from "next/image";
import SaveButton from "./saveButton";
import { LuHeart } from "react-icons/lu";

export default function CardItem({ room }: any) {
  return (
    <>
      <div className=" relative w-72 h-80 rounded-xl overflow-hidden">
        <SaveButton roomId={room.id}>
          <LuHeart
            size={35}
            className=" absolute right-3 top-8 text-white rounded-full p-1.5 bg-gray-900"
          />
        </SaveButton>
        <Image
          src={room.room_images[0]}
          alt={room.room_name}
          width={500}
          height={700}
          className="h-full object-cover rounded-xl"
        />
      </div>
      <div className="mt-2 mb-2 ml-1">
        <h1 className="text-lg capitalize">
          {room.city}, {room.country}
        </h1>
        <p className="text-gray-700 capitalize">{room.address}</p>
      </div>
      <span className="text-gray-900 font-semibold ml-1">${room.room_price}</span>{" "}
      <span className="text-gray-600">/ Night</span>
    </>
  );
}
