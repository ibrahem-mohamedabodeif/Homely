"use client";

import { useEffect, useState } from "react";
import { checkAvailability } from "@/lib/functions";
import Link from "next/link";

type CheckParams = {
  room: {
    id: number;
    price: number;
    guests: number;
  };
  searchParams: {
    startDay: string;
    endDay: string;
    nights: number;
  };
};

export default function CheckForm({ room, searchParams }: CheckParams) {
  const { startDay, endDay, nights } = searchParams;
  const cleaningFee = 130.19;
  const serviceFee = 118.89;

  const roomId = room.id;

  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    setAvailable(null);
  }, [startDay, endDay]);

  const handleCheck = async () => {
    const isAvailable = await checkAvailability(roomId, startDay, endDay);
    setAvailable(isAvailable);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto  lg:max-w-md ">
      <div>
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Check room</h2>
        <span className="text-lg text-gray-200">${room.price} / night</span>
      </div>
      <form className="mt-5 w-full">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-5">
          <div className="border p-2 rounded w-full md:w-full">
            <label className="text-gray-200 block mb-1">CHECK-IN</label>
            <input
              type="date"
              value={startDay}
              readOnly
              className="bg-transparent outline-none text-gray-200 w-full"
            />
          </div>
          <div className="border p-2 rounded w-full md:w-full">
            <label className="text-gray-200 block mb-1">CHECKOUT</label>
            <input
              type="date"
              value={endDay}
              readOnly
              className="bg-transparent outline-none text-gray-200 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col border p-2 rounded w-full md:w-auto  mb-5">
          <label className="text-gray-200 block mb-1">GUESTS</label>
          <input
            type="number"
            value={room.guests}
            readOnly
            className="bg-transparent outline-none text-gray-200 w-full"
          />
        </div>

        {!startDay && !endDay ? (
          <button
            disabled
            className="block mx-auto w-full md:w-56 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-5"
          >
            Choose Range to check
          </button>
        ) : available === true ? (
          <Link
            href={`/reservation?roomId=${
              room.id
            }&startDay=${startDay}&endDay=${endDay}&nights=${nights}&guests=${
              room.guests
            }&totalPrice=${
              room.price * nights
            }&cleaningFee=${cleaningFee}&serviceFee=${serviceFee}`}
          >
            <button
              className="block mx-auto w-full md:w-44 text-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-5 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="button"
            >
              Reserve
            </button>
          </Link>
        ) : (
          <button
            className="block mx-auto w-full md:w-44 text-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-5 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="button"
            onClick={handleCheck}
          >
            Check
          </button>
        )}

        {available === false && (
          <div className="text-red-500 text-lg font-semibold mt-5 mb-5">
            This room is not available
          </div>
        )}

        {available === true && (
          <div>
            <span className="text-white text-lg font-semibold mt-5 mb-5 block">
              This room is available
            </span>
          </div>
        )}
      </form>
    </div>
  );
}
