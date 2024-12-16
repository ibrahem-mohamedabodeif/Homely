import CancelledBtn from "@/components/cancelledBtn";
import ConfirmedBtn from "@/components/confirmedBtn";
import { getHomelyBookingsInfo, updateReservationStatus } from "@/lib/functions";
import { format } from "date-fns";

export default async function ConfirmReservation({
  params,
}: {
  params: { reservationId: number };
}) {
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
          {reservationInfo.rooms.roomName}
        </h1>
        <div className="pt-5 pb-5 mb-5 border-b border-[#6e6e6e] flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg  tracking-wide">Dates</h2>
            <span className="text-lg font-light">
              {formatDateRange(
                reservationInfo.startDay,
                reservationInfo.endDay
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg tracking-wide">Guests</h2>
            <span className="text-lg font-light">
              {reservationInfo.guests} guest
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg tracking-wide">Total Price</h2>
            <span className="text-lg font-light">
              {reservationInfo.totalPrice} $
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:max-w-lg">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Guest Name</label>
            <span className="text-lg font-extralight">
              {reservationInfo.fullName}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">E-mail</label>
            <span className="text-lg font-extralight">
              {reservationInfo.email}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Phone Number</label>
            <span className="text-lg font-extralight">
              {reservationInfo.number}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Id Number </label>
            <span className="text-lg font-extralight">
              {reservationInfo.idNumber}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Notes </label>
            <span className="text-lg font-extralight">
              {reservationInfo.notes ? reservationInfo.notes : "No notes"}
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
