"use client";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import MegaMenu from "./megaMenu";
import { useUser } from "@/lib/context/authProvider";

export default function AccountBar() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 border pt-2 pb-2 pl-5 pr-3 rounded-full hover:shadow"
      >
        <CiMenuBurger size={17} />
        {user ? (
          <span className=" w-10 p-2 font-bold capitalize text-center border rounded-full bg-black text-white">
            {user?.user_metadata?.name[0]}
          </span>
        ) : (
          <FaUserCircle size={30} />
        )}
      </button>
      {open && (
        <div>
          <MegaMenu />
        </div>
      )}
    </div>
  );
}
