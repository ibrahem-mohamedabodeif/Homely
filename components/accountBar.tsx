"use client";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import MegaMenu from "./megaMenu";
import { useUser } from "@/lib/context/authProvider";
export const revalidate = 0;

export default function AccountBar() {
  const user: any = useUser();
  const [open, setOpen] = useState(false);
  const [userState, setUserState] = useState(user);

  useEffect(() => {
    setUserState(user);
  }, [user]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 border pt-2 pb-2 pl-5 pr-3 rounded-full hover:shadow"
      >
        <CiMenuBurger size={17} />
        {userState ? (
          <span className=" w-10 p-2 font-bold capitalize text-center border rounded-full bg-black text-white">
            {userState?.user_metadata?.name[0]}
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
