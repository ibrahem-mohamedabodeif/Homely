import CancelledBtn from "@/components/cancelledBtn";
import { getHomelyBookingsInfo} from "@/lib/functions";
import { clerkClient } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Image from "next/image";

export default async function TripInfo({
  params,
}: {
  params:Promise< { tripId: number }>;
}) {
  const tripId = (await params).tripId;

  const tripInfo = await getHomelyBookingsInfo(tripId);
  
  
  const hosted_name = (await clerkClient()).users.getUser(tripInfo.rooms.user_id)
  function formatDateRange(startDate: string, endDate: string) {
    const startFormatted = format(new Date(startDate), "d MMM");
    const endFormatted = format(new Date(endDate), "d MMM");

    return `${startFormatted} - ${endFormatted}`;
  }

  
  return (
    <>
    <div className="mb-20">
      <div className="lg:max-w-lg">
        <h1 className="text-2xl font-semibold text-[#F5556C]">
          {tripInfo.rooms.room_name}
        </h1>
        <div className="pt-5 pb-5 mb-5 border-b border-[#6e6e6e] flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg  tracking-wide">Dates</h2>
            <span className="text-lg font-light">
              {formatDateRange(
                tripInfo.check_in,
                tripInfo.check_out
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg tracking-wide">Guests</h2>
            <span className="text-lg font-light">
              {tripInfo.guests_num} guest
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg tracking-wide">Total Price</h2>
            <span className="text-lg font-light">
              {tripInfo.total_price} $
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:max-w-lg">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 border-b pb-2">
            <label className="text-lg tracking-wide">Hosted by</label>
            <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={(await hosted_name).imageUrl}
                          alt="image"
                          fill={true}
                          className="h-full rounded-full object-cover"
                        />
                      </div>
            <span className="text-xl font-extralight capitalize">
              {(await hosted_name).fullName}
            </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Room Info</label>
            <span className="text-lg font-extralight">
              {tripInfo.rooms.guests_num + " guests, " + tripInfo.rooms.bedrooms_num + " Bedroom, " + tripInfo.rooms.beds_num +" Bed, " + tripInfo.rooms.bathrooms_num +" Bath"}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg tracking-wide">Room Location</label>
            <span className="text-lg font-extralight">
              {tripInfo.rooms.country + ", " + tripInfo.rooms.city + ", " + tripInfo.rooms.address}
            </span>
          </div>
          
          <div className="flex items-center justify-between gap-2 border-t border-[#6e6e6e] mt-5 pt-2">
            <CancelledBtn reservationId={tripId}/>
            <span className="text-lg font-extralight">
              {tripInfo.status}
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
