"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";

interface Filters {
  price: string;
  bedsNum: string;
  bedroomsNum: string;
  guestsNum: string;
}

export default function Filter() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [price, setPrice] = useState<string>(searchParams.get("price") || "");
  const [guestsNum, setGuestsNum] = useState<string>(searchParams.get("guestsNum") || "0");
  const [bedsNum, setBedsNum] = useState<string>(searchParams.get("bedsNum") || "0");
  const [bedroomsNum, setBedroomsNum] = useState<string>(searchParams.get("bedroomsNum") || "0");

  const handlePlus = (count: number, setCount: (count: string) => void) => {
    setCount((count + 1).toString());
  };

  const handleMinus = (count: number, setCount: (count: string) => void) => {
    setCount((count > 0 ? count - 1 : 0).toString());
  };

  const handleFilter = (filters: Filters) => {
    if (!filters.guestsNum || filters.guestsNum === "0") {
      filters.guestsNum = searchParams.get("guestsNum") || "0";
    }
    const params = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "0" && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.replace(`${pathName}?${params.toString()}`);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setPrice("");
    setBedsNum("0");
    setBedroomsNum("0");
    setGuestsNum("0");
    router.replace(pathName);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-[#6e6e6e] rounded-full pt-2 pb-2 pl-3 pr-3 text-lg"
      >
        <CiFilter size={20} />
        <span className="hidden sm:block tracking-wider">Filters</span>
      </button>
      {open && (
        <div>
          <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
          <div className="w-full max-w-md h-fit overflow-y-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 fixed p-4 bg-white rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="border-b border-[#6e6e6e] pb-4">
              <h1 className="text-2xl text-center font-medium tracking-widest">Filters</h1>
              <button
                onClick={() => setOpen(!open)}
                className="absolute top-4 right-6 text-2xl text-black"
              >
                x
              </button>
            </div>
            {/* Price */}
            <div className="mt-2 space-y-6 border-[#6e6e6e] border-b pb-7">
              <h1 className="text-xl pl-2 tracking-wider">Price</h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setPrice("<200")}
                  className={`border p-2 rounded-full ${price === "<200" && "bg-[#F5556C] text-white"}`}
                >
                  $10 - $200
                </button>
                <button
                  onClick={() => setPrice("<500")}
                  className={`border p-2 rounded-full ${price === "<500" && "bg-[#F5556C] text-white"}`}
                >
                  $200 - $500
                </button>
                <button
                  onClick={() => setPrice("<1000")}
                  className={`border p-2 rounded-full ${price === "<1000" && "bg-[#F5556C] text-white"}`}
                >
                  $500 - $1000
                </button>
                <button
                  onClick={() => setPrice(">1000")}
                  className={`border p-2 rounded-full ${price === ">1000" && "bg-[#F5556C] text-white"}`}
                >
                  {">"} 1000
                </button>
              </div>
            </div>
            {/* Beds and Bedrooms */}
            <div className="mt-2 space-y-6 border-[#6e6e6e] border-b pb-7">
              <h1 className="text-xl pl-2 tracking-wider">Rooms and Bedrooms</h1>
              <div className="flex justify-between mx-5">
                <h1 className="text-lg font-light">Bedrooms</h1>
                <div className="flex gap-5">
                  <button
                    onClick={() => handleMinus(Number(bedroomsNum), setBedroomsNum)}
                    className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-center text-3xl"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{bedroomsNum === "0" ? "Any" : bedroomsNum}</span>
                  <button
                    onClick={() => handlePlus(Number(bedroomsNum), setBedroomsNum)}
                    className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between mx-5">
                <h1 className="text-lg font-light">Beds</h1>
                <div className="flex gap-5">
                  <button
                    onClick={() => handleMinus(Number(bedsNum), setBedsNum)}
                    className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-center text-3xl"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{bedsNum === "0" ? "Any" : bedsNum}</span>
                  <button
                    onClick={() => handlePlus(Number(bedsNum), setBedsNum)}
                    className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* Guests */}
            <div className="mt-2 space-y-6 border-[#6e6e6e] border-b pb-7">
              <h1 className="text-xl pl-2 tracking-wider">Guests</h1>
              <div className="flex justify-between mx-5">
                <h1 className="text-lg font-light">Guests Num</h1>
                <div className="flex gap-5">
                  <button
                    onClick={() => handleMinus(Number(guestsNum), setGuestsNum)}
                    className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-center text-3xl"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{guestsNum === "0" ? "Any" : guestsNum}</span>
                  <button
                    onClick={() => handlePlus(Number(guestsNum), setGuestsNum)}
                    className="border border-[#6e6e6e] pb-1 w-6 h-6 rounded-full flex items-center justify-center text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-between mt-3 mx-2">
              <button onClick={handleClearFilters} className="text-lg">
                Clear All
              </button>
              <button
                onClick={() =>
                  handleFilter({
                    price,
                    bedsNum,
                    bedroomsNum,
                    guestsNum,
                  })
                }
                className="text-lg border rounded-full pt-2 pb-2 pl-5 pr-5 bg-[#1D201F] text-white"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}