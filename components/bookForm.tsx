"use client";

import { createReservation } from "@/lib/actions";
import { bookingSchema } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookForm() {
  const { user } = useUser();
  const [bookingData, setBookingData] = useState<any>({});
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams) {
      const params = Object.fromEntries(searchParams.entries());
      setBookingData(params);
    }
  }, [searchParams]);

  const totalPriceReservation = Math.ceil(
    Number(bookingData.totalPrice) +
      Number(bookingData.serviceFee) +
      Number(bookingData.cleaningFee)
  );

  const initialState = {
    success: false,
    message:"",
    errors:{},
    inputs:{
      client_name: "",
      client_email: "",
      client_phone: "",
      client_idNum: "",
      client_notes: "",
      room_id: "",
      check_in: "",
      check_out: "",
      nights: 0,
      guests_num: 0,
      total_price: 0,
      user_id: ""
    }
  }
  const [state, formAction] = useActionState(
    async (previousState: any, formData: FormData) => {
      const formValues = {
        client_name: formData.get("fullName") as string,
        client_email: formData.get("email") as string,
        client_phone: formData.get("number") as string,
        client_idNum: formData.get("idNumber") as string,
        client_notes: formData.get("notes") as string,
        room_id: formData.get("roomId") as string,
        check_in: formData.get("startDay") as string,
        check_out: formData.get("endDay") as string,
        nights: Number(formData.get("nights")) as number,
        guests_num: Number(formData.get("guests")) as number,
        total_price: Number(formData.get("totalPrice")) as number,
        user_id: formData.get("userId") as string,
      };
      const result = bookingSchema.safeParse(formValues);
      if (!result.success) {
        const errorMap: Record<string, string> = {};
        result.error.errors.map((error) => {
          errorMap[error.path[0]] = error.message;
        });
        return {
          success: false,
          errors: errorMap,
          inputs: formValues,
          message:"please entered a valid booking data"
        }
      }

      const response = await createReservation(result.data);
      if(!response.success) {
        toast.error(response.message);
        return {
          success: false,
          errors: response.errors,
          inputs: formValues,
          message:response.message
        }
      }
      toast.success(response.message);
      return response;
    },
    initialState
  );

  return (
    <div className="flex justify-center lg:max-w-lg">
      <div className="w-full ">
        <form action={formAction} className="flex flex-col" noValidate={true}>
          <input type="hidden" name="userId" value={user?.id || ""} />
          <input type="hidden" name="roomId" value={bookingData.roomId || ""} />
          <input
            type="hidden"
            name="startDay"
            value={bookingData.startDay || ""}
          />
          <input type="hidden" name="endDay" value={bookingData.endDay || ""} />
          <input type="hidden" name="nights" value={bookingData.nights || 0} />
          <input type="hidden" name="guests" value={bookingData.guests || 0} />
          <input
            type="hidden"
            name="totalPrice"
            value={totalPriceReservation || 0}
          />
          <input
            name="fullName"
            placeholder="Your Name"
            className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-2 w-full"
            type="text"
            defaultValue={state.inputs.client_name}
          />
          {state.errors?.client_name && <p className="text-red-500 mb-2 capitalize">{state.errors.client_name}</p>}
          <input
            name="email"
            placeholder="Your Email"
            className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-2 w-full"
            type="email"
            defaultValue={state.inputs.client_email}
          />
          {state.errors?.client_email && <p className="text-red-500 mb-2 capitalize">{state.errors.client_email}</p>}
          <input
            name="number"
            placeholder="Phone Number"
            className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-3 w-full"
            type="text"
            defaultValue={state.inputs.client_phone}
          />
          {state.errors?.client_phone && <p className="text-red-500 mb-2 capitalize">{state.errors.client_phone}</p>}
          <input
            name="idNumber"
            placeholder="Identity Number"
            className="h-12 border border-[#e6e6e6] rounded-md p-2 mb-3 w-full"
            type="text"
            defaultValue={state.inputs.client_idNum}
          />
          {state.errors?.client_idNum && <p className="text-red-500 mb-2 capitalize">{state.errors.client_idNum}</p>}
          <textarea
            name="notes"
            placeholder="Notes"
            className="h-36 border border-[#e6e6e6] rounded-md p-2 mb-4 w-full resize-none"
            defaultValue={state.inputs.client_notes}
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
