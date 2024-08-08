import Link from "next/link";
import { GiIsland, GiSpookyHouse, GiTreehouse } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { MdCabin } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";

export default function NavIcon() {
  return (
    <div className="flex overflow-x-auto justify-around gap-12 px-5 pt-4 pb-4 shadow-md">
      <Link href={"?type=room"}>
        <div className="flex flex-col items-center">
          <IoBedOutline size={30} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-500">Rooms</span>
        </div>
      </Link>
      <Link href={"?type=mansions"}>
        <div className="flex flex-col items-center">
          <GiSpookyHouse size={30} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-500">Mansions</span>
        </div>
      </Link>
      <Link href={"?type=beachfront"}>
        <div className="flex flex-col items-center">
          <TbBeach size={30} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-500">Beachfront</span>
        </div>
      </Link>
      <Link href={"?type=island"}>
        <div className="flex flex-col items-center">
          <GiIsland size={30} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-500">Islands</span>
        </div>
      </Link>
      <Link href={"?type=cabin"}>
        <div className="flex flex-col items-center">
          <MdCabin size={30} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-500">Cabins</span>
        </div>
      </Link>
      <Link href={"?type=treehouse"}>
        <div className="flex flex-col items-center">
          <GiTreehouse size={30} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-500">Treehouses</span>
        </div>
      </Link>
      <Link href={"?type=luxe"}>
        <div className="flex flex-col items-center">
          <PiBuildingApartmentFill size={30} className="text-slate-500" />
          <span className="text-xs font-medium text-slate-500">Luxe</span>
        </div>
      </Link>

      {/* <div className="flex items-center gap-3 border  rounded-lg pl-3 pr-3 ">
        <VscSettings size={20} />
        <span>Filters</span>
      </div> */}
    </div>
  );
}
