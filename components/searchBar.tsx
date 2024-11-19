"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  const [country, setCountry] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("country", value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  const defaultValue: any = searchParams.get("country");

  return (
    <div className="flex items-center border border-[#e6e6e6] pt-3 pb-3 pl-4 pr-4 rounded-full w-full h-16  sm:w-auto  bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(country.toLowerCase());
        }}
        className="flex w-full sm:flex-1"
      >
        <div className="flex flex-col border-r-2 pl-3 gap-1 w-80">
          <label className="text-sm">Where</label>
          <input
            type="text"
            defaultValue={defaultValue}
            className="outline-none text-gray-500 w-full"
            placeholder="Where is your destination"
            onChange={(e) => {
              e.preventDefault();
              setCountry(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1 border-r-2 pl-3 w-40">
          <label className="text-sm">Check in</label>
          <input
            type="text"
            defaultValue={defaultValue}
            className="outline-none text-gray-500 w-full"
            placeholder="Add date"
            onChange={(e) => {
              e.preventDefault();
              setCountry(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col border-r-2 pl-3 gap-1 w-40">
          <label className="text-sm">Check out</label>
          <input
            type="text"
            defaultValue={defaultValue}
            className="outline-none text-gray-500 w-full"
            placeholder="Add date"
            onChange={(e) => {
              e.preventDefault();
              setCountry(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col border-r-2 pl-3 gap-1 w-40">
          <label className="text-sm">Who</label>
          <input
            type="text"
            defaultValue={defaultValue}
            className="outline-none text-gray-500 w-full"
            placeholder="Add guests"
            onChange={(e) => {
              e.preventDefault();
              setCountry(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="pl-2 sm:pl-4">
          <CiSearch size={30} className="text-[#F5556C]" />
        </button>
      </form>
    </div>
  );
}
