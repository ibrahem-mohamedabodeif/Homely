"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const defaultValue: any = searchParams.get("country");
  const [country, setCountry] = useState<string>();
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?country=${country}`);
  };

  return (
    <div className="flex items-center border pt-2 pb-2 pl-4 pr-4 rounded-full shadow w-full h-14  sm:w-auto">
      <form onSubmit={handleSearch} className="flex w-full sm:flex-1">
        <div className="flex flex-col border-r-2 flex-1 w-full sm:w-96">
          <label className="text-sm">Where</label>
          <input
            type="text"
            defaultValue={defaultValue}
            className="outline-none text-gray-500 w-full"
            placeholder="Where is your destination"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button className="pl-2 sm:pl-4" type="submit">
          <CiSearch size={25} />
        </button>
      </form>
    </div>
  );
}
