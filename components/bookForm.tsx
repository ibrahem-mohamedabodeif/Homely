"use client";

import { createReservation } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";


export default function BookForm() {
    const {user} = useUser()
    const [bookingData, setBookingData] = useState<any>({});
    const searchParams = useSearchParams()
 useEffect(() => {
  if (searchParams) {
    const params = Object.fromEntries(searchParams.entries());
    setBookingData(params);
  }
}, [searchParams]);

  
  const totalPriceReservation = Math.ceil(Number(bookingData.totalPrice) + Number(bookingData.serviceFee) + Number(bookingData.cleaningFee));
const[error, formAction] = useActionState(createReservation, null)
  return (
    <div className="flex justify-center lg:max-w-lg">
      <div className="w-full ">
        <form action={formAction} className="flex flex-col">
        <input type="hidden" name="userId" value={user?.id || ""} />
  <input type="hidden" name="roomId" value={bookingData.roomId || ""} />
  <input type="hidden" name="startDay" value={bookingData.startDay || ""} />
  <input type="hidden" name="endDay" value={bookingData.endDay || ""} />
  <input type="hidden" name="nights" value={bookingData.nights || 0} />
  <input type="hidden" name="guests" value={bookingData.guests || 0} />
  <input type="hidden" name="totalPrice" value={totalPriceReservation || 0} />
          <input
            name="fullName"
            placeholder="Your Name"
            className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full"
            type="text"
            required
          />
          <input
            name="email"
            placeholder="Your Email"
            className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full"
            type="email"
            required
          />
          <input
            name="number"
            placeholder="Phone Number"
            className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full"
            type="text"
            required
          />
          <input
            name="idNumber"
            placeholder="Identity Number"
            className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full"
            type="number"
            required
          />
          <textarea
            name="notes"
            placeholder="Notes"
            className="h-36 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full resize-none"
          ></textarea>

          <button
            className="bg-[#F5556C] w-full mx-auto text-white text-xl font-bold py-2 px-4 rounded-md mt-4"
            type="submit"
          >
            Request to book
          </button>
        </form>
      </div>
    </div>
  );
}
