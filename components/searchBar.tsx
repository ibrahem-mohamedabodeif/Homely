"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  const [country, setCountry] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuests] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleSearch = () => {
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      toast.error("Check-out date must be after check-in date.");
      return;
    }
    if ((checkIn && !checkOut) || (!checkIn && checkOut)) {
      toast.error("Check-in and check-out dates are required.");
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (country) params.set("country", country);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guestsNum", guests);
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex items-center border border-[#e6e6e6] pt-3 pb-3 pl-4 pr-4 rounded-full max-w-sm lg:max-w-full md:max-w-full h-14 md:h-16 bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex w-full sm:flex-1"
      >
        <div className="flex flex-col border-r-2 pl-3 gap-1 lg:w-80 w-72">
          <label className="text-sm">Where</label>
          <input
            type="text"
            className="outline-none text-gray-500 w-full"
            placeholder="Where is your destination"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="hidden md:flex md:flex-col md:gap-1 md:border-r-2 md:pl-3 md:pr-4 md:w-40">
          <label className="text-sm">Check in</label>
          <input
            type="date"
            className="outline-none text-gray-500 w-full"
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="hidden md:flex md:flex-col md:gap-1 md:border-r-2 md:pl-3 md:pr-4 md:w-40">
          <label className="text-sm">Check out</label>
          <input
            type="date"
            className="outline-none text-gray-500 w-full"
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="hidden lg:flex lg:flex-col lg:gap-1 lg:border-r-2 lg:pl-3 lg:w-40">
          <label className="text-sm">Who</label>
          <input
            type="text"
            className="outline-none text-gray-500 w-full"
            placeholder="Add guests"
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <button
          type="submit"
          aria-label="Search"
          className="pl-2 sm:pl-4 hover:text-red-600 transition-colors"
        >
          <CiSearch size={30} className="text-[#F5556C]" />
        </button>
      </form>
    </div>
  );
}
