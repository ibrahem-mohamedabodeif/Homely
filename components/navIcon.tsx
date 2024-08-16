"use client";
import { GiIsland, GiSpookyHouse, GiTreehouse } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { MdCabin } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import Filter from "./filter";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function NavIcon() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleFilterType = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center justify-between px-5 pt-4 pb-4 shadow-md">
      <div className="flex justify-around w-[calc(100%-80px)] flex-grow overflow-x-auto gap-12 pr-10 mr-10">
        <button onClick={() => handleFilterType("room")}>
          <div className="flex flex-col items-center">
            <IoBedOutline size={30} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-500">Rooms</span>
          </div>
        </button>
        <button onClick={() => handleFilterType("mansions")}>
          <div className="flex flex-col items-center">
            <GiSpookyHouse size={30} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-500">Mansions</span>
          </div>
        </button>
        <button onClick={() => handleFilterType("beachfront")}>
          <div className="flex flex-col items-center">
            <TbBeach size={30} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-500">
              Beachfront
            </span>
          </div>
        </button>
        <button onClick={() => handleFilterType("island")}>
          <div className="flex flex-col items-center">
            <GiIsland size={30} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-500">Islands</span>
          </div>
        </button>
        <button onClick={() => handleFilterType("cabin")}>
          <div className="flex flex-col items-center">
            <MdCabin size={30} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-500">Cabins</span>
          </div>
        </button>
        <button onClick={() => handleFilterType("treehouse")}>
          <div className="flex flex-col items-center">
            <GiTreehouse size={30} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-500">
              Treehouses
            </span>
          </div>
        </button>
        <button onClick={() => handleFilterType("luxe")}>
          <div className="flex flex-col items-center">
            <PiBuildingApartmentFill size={30} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-500">Luxe</span>
          </div>
        </button>
      </div>
      <div className="absolute right-4 top-0 bottom-0 flex items-center bg-white">
        <Filter />
      </div>
    </div>
  );
}
