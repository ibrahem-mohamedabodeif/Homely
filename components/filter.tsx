"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";

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
        className="flex items-center gap-2 border border-[#6e6e6e] rounded-full pt-2 pb-2 pl-3 pr-3 text-lg"
      >
        <CiFilter size={20} />
        <span className="max-sm:hidden md:hidden max-lg:block lg:block tracking-wider">
          Filters
        </span>
      </button>
      {open && (
        <div>
          <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
          <div className="w-[600px] h-fit overflow-y-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 fixed p-4 bg-white rounded-2xl shadow-2xl">
            <div className="border-b border-[#6e6e6e] pb-4 ">
              <h1 className="text-2xl text-center font-medium tracking-widest">
                Filters
              </h1>
              <button
                onClick={() => setOpen(!open)}
                className="absolute top-4 right-6 text-2xl text-black"
              >
                x
              </button>
            </div>
            <div className=" mt-2 space-y-6 border-[#6e6e6e]  border-b pb-7">
              <h1 className="text-xl pl-2 tracking-wider">Price</h1>
              <div className="flex flex-wrap justify-between">
                <button
                  onClick={() => handleFilter("price", "<200")}
                  className="border border-[#6e6e6e] pt-2 pb-2 pl-6 pr-6  rounded-full"
                >
                  $10 - $200
                </button>
                <button
                  onClick={() => handleFilter("price", "<500")}
                  className="border border-[#6e6e6e] pt-2 pb-2 pl-6 pr-6  rounded-full"
                >
                  $200 - $500
                </button>
                <button
                  onClick={() => handleFilter("price", "<1000")}
                  className="border border-[#6e6e6e] pt-2 pb-2 pl-6 pr-6  rounded-full"
                >
                  $500 - $1000
                </button>
                <button
                  onClick={() => handleFilter("price", ">1000")}
                  className="border border-[#6e6e6e] pt-2 pb-2 pl-6 pr-6  rounded-full"
                >
                  {">"} 1000
                </button>
              </div>
            </div>
            <div className="mt-2 space-y-6 border-[#6e6e6e] border-b pb-7">
              <h1 className="text-xl pl-2 tracking-wider">Guests</h1>
              <div className="flex justify-between mx-5">
                <h1 className="text-lg font-light">Guests Num</h1>
                <div className="flex gap-5">
                  <span className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-center text-3xl">
                    -
                  </span>
                  <span>Any</span>
                  <span className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-2xl">
                    +
                  </span>
                </div>
              </div>
              {/* <div className="flex items-center justify-around font-medium">
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
              </div> */}
            </div>
            <div className="mt-2 space-y-6 border-[#6e6e6e] border-b pb-7">
              <h1 className="text-xl pl-2 tracking-wider">
                Rooms and Bedrooms
              </h1>
              <div className="flex justify-between mx-5">
                <h1 className="text-lg font-light">Rooms</h1>
                <div className="flex gap-5">
                  <span className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-center text-3xl">
                    -
                  </span>
                  <span>Any</span>
                  <span className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-2xl">
                    +
                  </span>
                </div>
              </div>
              <div className="flex justify-between mx-5">
                <h1 className="text-lg font-light">Bedrooms</h1>
                <div className="flex gap-5">
                  <span className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-center text-3xl">
                    -
                  </span>
                  <span>Any</span>
                  <span className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-2xl">
                    +
                  </span>
                </div>
              </div>
              {/* <div className="flex items-center justify-around font-medium">
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
              </div> */}
            </div>
            <div className="flex justify-between mt-3 mx-2">
              <button className="text-lg">Clear All</button>
              <button className="text-lg border rounded-full pt-2 pb-2 pl-5 pr-5 bg-[#1D201F] text-white">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
