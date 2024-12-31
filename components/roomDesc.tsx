import {type Room } from "@/app/[roomId]/page";
import { CiWifiOn } from "react-icons/ci";
import { GiAtSea } from "react-icons/gi";
import { IoCarSportOutline } from "react-icons/io5";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { MdOutlineBalcony } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { TbBeach, TbToolsKitchen3 } from "react-icons/tb";

export default function RoomDesc({room}: {room :Room}) {
  return (
    <>
      {/* Room description*/}
      <div className="mt-5 border-b-2 pb-5">
        <p className="text-lg font-light leading-relaxed">
          {room.room_description}
        </p>
      </div>

      {/* Room offers*/}
      <div className="mt-10 border-b-2 pb-7">
        <h1 className="text-2xl font-medium mb-10">What this place offers</h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex items-center gap-4 pb-4">
            <GiAtSea size={25} />
            <span className="text-lg">Sea view</span>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <TbToolsKitchen3 size={25} />
            <span className="text-lg">Kitchen</span>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <IoCarSportOutline size={25} />
            <span className="text-lg">Free parking</span>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <PiTelevision size={25} />
            <span className="text-lg">TV</span>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <TbBeach size={30} />
            <span className="text-lg">Shared beach</span>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <CiWifiOn size={25} />
            <span className="text-lg">Wifi</span>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <MdOutlineBalcony size={30} />
            <span className="text-lg">Private patio or balcony</span>
          </div>
          <div className="flex items-center gap-4 pb-4">
            <LiaSwimmingPoolSolid size={30} />
            <span className="text-lg">Private outdoor pool</span>
          </div>
        </div>
      </div>
    </>
  );
}
