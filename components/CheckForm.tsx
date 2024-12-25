"use client";

import { useEffect, useState } from "react";
import { checkAvailability } from "@/lib/functions";
import Link from "next/link";

type CheckParams = {
  room: {
    id: number;
    room_price: number;
    guests_num: number;
  };
  searchParamsData: {
    startDay: string;
    endDay: string;
    nights: number;
  };
};

export default function CheckForm({ room, searchParamsData }: CheckParams) {
  const { startDay, endDay, nights } = searchParamsData;
  const [numGuests, setNumGuests] = useState(1);
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
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-2xl w-fit">
      <div>
        <h2 className="text-xl text-black"> Add dates to check
        </h2>
      </div>
      <form className="mt-5 w-fit md:w-96">
        <div className="grid grid-cols-2 items-center border border-[#6e6e6e] rounded-3xl p-3">
          <div className="border-r border-[#6e6e6e] pb-2">
            <label className="text-black block pb-2">CHECK-IN</label>
            <input
              type="text"
              value={startDay || ""}
              placeholder="Add date"
              readOnly
              className="bg-transparent outline-none text-black w-full"
            />
          </div>
          <div className="pl-2 pb-2">
            <label className="text-black block pb-2">CHECKOUT</label>
            <input
              type="text"
              value={endDay || ""}
              placeholder=" Add date"
              readOnly
              className="bg-transparent outline-none text-black w-full"
            />
          </div>
          <div className="col-span-2 border-t border-[#6e6e6e] pt-2 flex flex-col">
          <label className="text-black block pb-1">GUESTS</label>
          <select
            name="numGuests"
            id="numGuests"
            value={numGuests}
            className="bg-transparent outline-none text-black w-full"
            onChange={(e) => setNumGuests(Number(e.target.value))}
          >
            {Array.from({ length: room.guests_num }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x} className="text-gray-600">
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        </div>

        

        {!startDay && !endDay ? (
          <button
            disabled
            className="block mx-auto w-full bg-[#F5556C] text-lg text-white font-medium p-3 rounded-full mt-5"
          >
             Check availability
          </button>
        ) : available === true ? (
          <Link
            href={`/booking?roomId=${
              room.id
            }&startDay=${startDay}&endDay=${endDay}&nights=${nights}&guests=${numGuests}&totalPrice=${
              room.room_price * nights
            }&cleaningFee=${cleaningFee}&serviceFee=${serviceFee}`}
          >
            <button
            className="block mx-auto w-full bg-[#F5556C] text-lg text-white font-medium p-3 rounded-full mt-5"
            type="button"
            >
              Complete reservation
            </button>
          </Link>
        ) : (
          <button
          className="block mx-auto w-full bg-[#F5556C] text-lg text-white font-medium p-3 rounded-full mt-5"
          type="button"
            onClick={handleCheck}
          >
                         Check availability

          </button>
        )}

        {available === false && (
          <div className="text-red-500 text-lg font-semibold mt-5 mb-5">
            This room is not available
          </div>
        )}

        {available === true && (
          <div>
            <span className="text-black text-lg py-5 block text-center">
              This room is available
            </span>
          </div>
        )}
      </form>
    </div>
  );
}
