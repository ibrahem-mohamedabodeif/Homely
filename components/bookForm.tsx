"use client";

import { createReservation } from "@/lib/actions";
import { useFormStatus } from "react-dom";

type searchType = {
  searchParams: {
    roomId: string;
    startDay: string;
    endDay: string;
    nights: number;
    guests: number;
    totalPrice: number;
    cleaningFee: number;
    serviceFee: number;
  };
};

export default function BookForm({ searchParams }: searchType) {
  const { pending } = useFormStatus();
  const {
    roomId,
    startDay,
    endDay,
    nights,
    guests,
    totalPrice,
    cleaningFee,
    serviceFee,
  } = searchParams;

  const bookingData = {
    roomId,
    startDay,
    endDay,
    nights,
    guests,
    totalPrice,
    cleaningFee,
    serviceFee,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);
  return (
    <div className="flex justify-center lg:max-w-lg">
      <div className="w-full p-6 border rounded-md bg-white shadow-md">
        <form action={createReservationWithData} className="flex flex-col">
          <input
            name="fullName"
            placeholder="Full Name"
            className="h-12 border rounded-md p-2 mb-4 w-full"
            type="text"
          />
          <input
            name="email"
            placeholder="Email"
            className="h-12 border rounded-md p-2 mb-4 w-full"
            type="email"
          />
          <input
            name="number"
            placeholder="Phone Number"
            className="h-12 border rounded-md p-2 mb-4 w-full"
            type="text"
          />
          <input
            name="idNumber"
            placeholder="Identity Number"
            className="h-12 border rounded-md p-2 mb-4 w-full"
            type="number"
          />
          <textarea
            name="notes"
            placeholder="Notes"
            className="h-24 border rounded-md p-2 mb-4 w-full"
          ></textarea>

          <button
            className="bg-black w-full sm:w-72 mx-auto text-white font-bold py-2 px-4 rounded-md mt-4"
            type="submit"
            disabled={pending}
          >
            Request to book
          </button>
        </form>
      </div>
    </div>
  );
}
