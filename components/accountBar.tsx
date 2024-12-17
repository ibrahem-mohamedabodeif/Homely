"use client";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import MegaMenu from "./megaMenu";
import { PiUserCircleLight } from "react-icons/pi";
import Image from "next/image";

export default function AccountBar({ userData }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 border pt-2 pb-2 pl-5 pr-3 rounded-full hover:shadow bg-white"
      >
        <CiMenuBurger size={17} />
        {userData ? (
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={userData.user_image}
            alt="image"
            width={200}
            height={200}
            className="h-full rounded-full object-cover"
          />
        </div>
        ) : (
          <PiUserCircleLight size={35} />)}
      </button>
      {open && (
        <div>
          <MegaMenu userData={userData} />
        </div>
      )}
    </div>
  );
}
