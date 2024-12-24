"use client";

import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import MegaMenu from "./megaMenu";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function AccountBar() {
  const {user }= useUser()
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState<string>(user?.imageUrl ||"/user.png");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 border pt-2 pb-2 pl-3 pr-3 rounded-full hover:shadow bg-white"
      >
        <CiMenuBurger size={17} />

        <div className="relative w-6 h-6 lg:w-8 lg:h-8 rounded-full overflow-hidden">
          <Image
            src={userImage}
            alt="User image"
            width={200}
            height={200}
            className="h-full rounded-full object-cover"
            priority
          />
        </div>
      </button>
      {open && (
        <div>
          <MegaMenu onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
