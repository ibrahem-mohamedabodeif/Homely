import Image from "next/image";
import { BsStars } from "react-icons/bs";
import { MdManageAccounts, MdOutlineAirplaneTicket } from "react-icons/md";
import logo from "@/app/icon.ico";
import { GiExitDoor } from "react-icons/gi";
import Link from "next/link";
export default function NavBarBottom() {
  return (
    <div className="flex justify-around items-center gap-4 pb-2 pt-1 border-t-2 bg-white ">
      <Link href={"/account/wishlist"} className="flex items-center  gap-5">
        <BsStars size={27} />
      </Link>
      <Link href={"/account/reservations"} className="flex items-center  gap-5">
        <MdOutlineAirplaneTicket size={27} />
      </Link>
      <Link href={"/"}>
        <Image src={logo} alt="logo" width={50} />
      </Link>
      <GiExitDoor size={27} />
      <Link href={"/account"} className="flex items-center gap-5">
        <MdManageAccounts size={27} />
      </Link>
    </div>
  );
}
