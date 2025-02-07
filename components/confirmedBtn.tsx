"use client"

import { updateReservationStatus } from "@/lib/actions";
import toast from "react-hot-toast";


export default function ConfirmedBtn({reservationId}:any) {
    const updatedReservationStatus = async(reservationId: number, status: string)=>{
      try{
        await updateReservationStatus(reservationId, status);
        toast.success("Booking confirmed successfully.")
      }catch(err){
        toast.error("Somthing went wrong, try again later.")
       }
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
