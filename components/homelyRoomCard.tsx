"use client";

import { deleteRoom } from "@/lib/functions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";
export default function HomelyRoomCard({ room }: any) {
  const router = useRouter();
  const handleDelete = async (roomId: string) => {
    try {
      const success = await deleteRoom(roomId);
      if (success) {
        toast.success("Successfully deleted");
      } else {
        toast.error("Failed to delete room");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleEdite = (roomId: string) => {
    router.push(`/hosting/become-a-host?edite=${roomId}`);
  };

  return (
    <div className="w-72 md:w-60 max-sm:mx-auto">
      <div className="w-72 md:w-60 h-60 rounded-xl overflow-hidden">
        <Image
          src={room.image1}
          alt={room.room_name}
          width={500}
          height={700}
          className="h-full object-cover rounded-xl"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="mt-2 flex flex-col gap-2">
          <h1 className="text-lg capitalize w-48 overflow-clip text-nowrap">{room.room_name}</h1>
          <h1 className="capitalize text-gray-700">
            {room.city}, {room.country}
          </h1>
          <div>
            <span className="text-gray-900 font-semibold">
              ${room.room_price}
            </span>{" "}
            <span className="text-gray-600">/ night</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <button
            onClick={() => handleEdite(room.id)}
            className="hover:text-blue-700"
          >
            <LuPenLine size={23} />
          </button>
          <button
            onClick={() => handleDelete(room.id)}
            className="hover:text-red-700"
          >
            <IoMdTrash size={23} />
          </button>
        </div>
      </div>
    </div>
  );
}
