"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { IoBedOutline } from "react-icons/io5";
import { GiSpookyHouse, GiIsland, GiTreehouse } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import { MdCabin } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import Filter from "./filter";
import ActiveFilterBtn from "./activeIcon";

const filters = [
  { value: "room", label: "Rooms", Icon: IoBedOutline },
  { value: "mansions", label: "Mansions", Icon: GiSpookyHouse },
  { value: "beachfront", label: "Beachfront", Icon: TbBeach },
  { value: "island", label: "Islands", Icon: GiIsland },
  { value: "cabin", label: "Cabins", Icon: MdCabin },
  { value: "treehouse", label: "Treehouses", Icon: GiTreehouse },
  { value: "luxe", label: "Luxe", Icon: PiBuildingApartmentFill },
];

export default function NavIcon() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleFilterType = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div
      className={`${
        pathName !== "/"
          ? "hidden"
          : "relative flex items-center justify-between pt-4 pb-4 border-b-2 border-[#6e6e6e] mx-20"
      }`}
    >
      <div className="flex justify-around w-[calc(100%-80px)] flex-grow overflow-x-auto gap-12 pr-20 mr-20">
        {filters.map(({ value, label, Icon }) => (
          <ActiveFilterBtn
            key={value}
            filterType="type"
            value={value}
            onClick={() => handleFilterType(value)}
          >
            <div className="flex flex-col items-center gap-2">
              <Icon size={30} />
              <span className="text-xs font-medium">{label}</span>
            </div>
          </ActiveFilterBtn>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 flex items-center bg-white">
        <Filter />
      </div>
    </div>
  );
}
