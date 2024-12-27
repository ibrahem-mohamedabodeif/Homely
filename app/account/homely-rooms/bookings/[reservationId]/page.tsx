import CancelledBtn from "@/components/cancelledBtn";
import ConfirmedBtn from "@/components/confirmedBtn";
import { getHomelyBookingsInfo } from "@/lib/functions";
import { format } from "date-fns";

export default async function ConfirmReservation(
  props: {
    params: Promise<{ reservationId: number }>;
  }
) {
  const params = await props.params;
  const reservationId = params.reservationId;

  const reservationInfo = await getHomelyBookingsInfo(reservationId);

  function formatDateRange(startDate: string, endDate: string) {
    const startFormatted = format(new Date(startDate), "d MMM");
    const endFormatted = format(new Date(endDate), "d MMM");

    return `${startFormatted} - ${endFormatted}`;
  }


  return (
    <div className="mb-20">
      <div className="lg:max-w-lg">
        <h1 className="text-2xl font-semibold text-[#F5556C]">
          {reservationInfo.rooms.room_name}
        </h1>
        <div className="pt-5 pb-5 mb-5 border-b border-[#6e6e6e] flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg  tracking-wide">Dates</h2>
            <span className="text-lg font-light">
              {formatDateRange(
                reservationInfo.check_in,
                reservationInfo.check_out
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg tracking-wide">Guests</h2>
            <span className="text-lg font-light">
              {reservationInfo.guests_num} guest
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg tracking-wide">Total Price</h2>
            <span className="text-lg font-light">
              {reservationInfo.total_price} $
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:max-w-lg">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Guest Name</label>
            <span className="text-lg font-extralight">
              {reservationInfo.client_name}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">E-mail</label>
            <span className="text-lg font-extralight">
              {reservationInfo.client_email}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Phone Number</label>
            <span className="text-lg font-extralight">
              {reservationInfo.client_phone}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Id Number </label>
            <span className="text-lg font-extralight">
              {reservationInfo.client_idNum}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Notes </label>
            <span className="text-lg font-extralight">
              {reservationInfo.client_notes ? reservationInfo.client_notes : "No notes"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-[#6e6e6e] mt-5 pt-2">
            <CancelledBtn reservationId={reservationId}/>
            <ConfirmedBtn reservationId={reservationId}/>
          </div>
        </div>
      </div>
    </div>
  );
}
