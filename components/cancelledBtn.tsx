"use client"

import { updateReservationStatus } from "@/lib/actions";
import toast from "react-hot-toast";


export default function CancelledBtn({ reservationId}: any) {
    const updatedReservationStatus = async(reservationId: number, status: string)=>{
      try{
        await updateReservationStatus(reservationId, status);
        toast.success("Booking cancelled successfully.")
      }catch(err){
        toast.error("Somthing went wrong, try again later.")
       } 
      
       }
    return (
    <button onClick={() => updatedReservationStatus(reservationId, "cancelled")} className="bg-white text-black border text-base md:text-lg py-2 px-4 rounded-md mt-4">
              Cancel Booking
            </button>
  )
}
