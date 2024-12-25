"use client";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ActiveLink from "./activeLink";

export default function AccountMegaMenu() {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="block md:hidden">
      <button onClick={() => setOpen(!open)}>
        <HiOutlineDotsVertical size={20} />
      </button>
      {open && (
        <div className="absolute left-2 flex flex-col items-start gap-4 border p-4 rounded-lg  bg-white shadow-xl z-10">
          <ActiveLink href="/account">
            <span className="text-lg font-light">Personal Information</span>
          </ActiveLink>
          <ActiveLink href="/account/about-you">
            <span className="text-lg font-light">About You</span>
          </ActiveLink>
          <div className="flex flex-col gap-2">
            <ActiveLink href="/account/homely-rooms">
              <span className="text-lg font-light">Your Homely Rooms</span>
            </ActiveLink>
            <div className="flex flex-col gap-2 pl-3">
              <ActiveLink href="/account/homely-rooms">
                <span className="text-lg font-light">Rooms</span>
              </ActiveLink>
              <ActiveLink href="/account/homely-rooms/bookings">
                <span className="text-lg font-light">Bookings</span>
              </ActiveLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
