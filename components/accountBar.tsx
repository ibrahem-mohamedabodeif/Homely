"use client";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import MegaMenu from "./megaMenu";
import { PiUserCircleLight } from "react-icons/pi";

export default function AccountBar({ user }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 border pt-2 pb-2 pl-5 pr-3 rounded-full hover:shadow bg-white"
      >
        <CiMenuBurger size={17} />
        {/* {user ? (
          <span className=" w-10 p-2 font-bold capitalize text-center border rounded-full bg-black text-white">
            {user?.user_metadata?.name[0]}
          </span>
        ) : ( */}
          <PiUserCircleLight size={35} />
        {/* )} */}
      </button>
      {open && (
        <div>
          <MegaMenu user={user} />
        </div>
      )}
    </div>
  );
}
