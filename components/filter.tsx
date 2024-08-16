"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { VscSettings } from "react-icons/vsc";

export default function Filter() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleFilter = (category: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(category, value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className=" flex items-center gap-3 border  rounded-lg pt-2 pb-2 pl-3 pr-3 text-lg "
      >
        <VscSettings size={20} />
        <span className="max-sm:hidden md:hidden max-lg:block lg:block">
          Filters
        </span>
      </button>
      {open && (
        <div className="w-64 h-[calc(100%-100px)] bottom-0 right-0 z-10 fixed p-2 bg-white rounded-t-2xl rounded-l-2xl shadow-2xl">
          <div className="flex justify-between items-center pl-2">
            <h1 className="text-xl font-bold tracking-widest">Filters</h1>
            <button
              onClick={() => setOpen(!open)}
              className="absolute top-0 right-0 text-xl font-medium border pr-2 pl-2 bg-gray-500 text-white"
            >
              x
            </button>
          </div>
          <div className="mt-5 space-y-6 border-b-2 pb-10">
            <h1 className="text-lg font-medium pl-2">Guests</h1>
            <div className="flex items-center justify-around font-medium">
              <button
                onClick={() => handleFilter("guests", "1")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                1
              </button>
              <button
                onClick={() => handleFilter("guests", "2")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                2
              </button>
              <button
                onClick={() => handleFilter("guests", ">2")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                {">"}2
              </button>
              <button
                onClick={() => handleFilter("guests", ">10")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                {">"}10
              </button>
            </div>
          </div>
          <div className="mt-5 space-y-6 border-b-2 pb-10">
            <h1 className="text-lg font-medium pl-2">Bedrooms</h1>
            <div className="flex items-center justify-around font-medium">
              <button
                onClick={() => handleFilter("bedrooms", "1")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                1
              </button>
              <button
                onClick={() => handleFilter("bedrooms", "2")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                2
              </button>
              <button
                onClick={() => handleFilter("bedrooms", ">2")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                {">"} 2
              </button>
              <button
                onClick={() => handleFilter("bedrooms", ">5")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                {">"} 5
              </button>
            </div>
          </div>
          <div className=" mt-5 space-y-6  pb-10">
            <h1 className="text-lg font-medium pl-2">Price / night</h1>
            <div className="flex flex-wrap gap-y-5 justify-around font-medium">
              <button
                onClick={() => handleFilter("price", "<200")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                {"<"} 200
              </button>
              <button
                onClick={() => handleFilter("price", "<500")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                {"<"} 500
              </button>
              <button
                onClick={() => handleFilter("price", "<1000")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                {"<"} 1000
              </button>
              <button
                onClick={() => handleFilter("price", ">1000")}
                className="border pt-1 pb-1 pr-3 pl-3 rounded-lg shadow"
              >
                {">"} 1000
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
