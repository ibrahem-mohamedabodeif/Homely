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
    <div className="flex items-center border pt-2 pb-2 pl-4 pr-4 rounded-full shadow w-full h-14  sm:w-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(country);
        }}
        className="flex w-full sm:flex-1"
      >
        <div className="flex flex-col border-r-2 flex-1 w-full sm:w-96">
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
        <button type="submit" className="pl-2 sm:pl-4">
          <CiSearch size={25} />
        </button>
      </form>
    </div>
  );
}
