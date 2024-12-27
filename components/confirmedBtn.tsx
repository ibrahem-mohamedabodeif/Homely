"use client"

import { updateReservationStatus } from "@/lib/functions";

export default function ConfirmedBtn({reservationId}:any) {
    const updatedReservationStatus = async(reservationId: number, status: string)=>{
        await updateReservationStatus(reservationId, status);
       }
    return (
    <button
            onClick={()=>updatedReservationStatus(reservationId, "confirmed")}
              className="bg-[#F5556C] text-white text-base md:text-lg py-2 px-4 rounded-md mt-4"
            >
              confirm Booking
            </button>
  )
}
