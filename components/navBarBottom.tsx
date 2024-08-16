"use client";
import Image from "next/image";
import {
  BsFillDoorClosedFill,
  BsFillDoorOpenFill,
  BsStars,
} from "react-icons/bs";
import { MdManageAccounts, MdOutlineAirplaneTicket } from "react-icons/md";
import logo from "@/app/icon.ico";
import Link from "next/link";
import { useUser } from "@/lib/context/authProvider";
import { signOut } from "@/lib/actions";
export const revalidate = 0;

export default function NavBarBottom() {
  const user = useUser();
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
      {user ? (
        <button onClick={() => signOut()}>
          <BsFillDoorClosedFill size={27} />
        </button>
      ) : (
        <Link href={"/signin"}>
          <BsFillDoorOpenFill size={27} />
        </Link>
      )}

      <Link href={"/account"} className="flex items-center gap-5">
        <MdManageAccounts size={27} />
      </Link>
    </div>
  );
}
