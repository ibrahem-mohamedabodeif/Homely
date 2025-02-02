"use client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ReservationCard({ room }: any) {
  const pathName = usePathname();

  function formatDateRange(startDate: string, endDate?: string) {
    const startFormatted = format(new Date(startDate), "d MMM");
    if (!endDate) {
      return startFormatted;
    }
    const endFormatted = format(new Date(endDate), "d MMM");
    return `${startFormatted} - ${endFormatted}`;
  }

  return (
    <>
      {pathName === "/account/homely-rooms/bookings" ? (
        <Link href={`/account/homely-rooms/bookings/${room.id}`}>
          <div className="max-w-sm w-full md:w-fit md:max-w-full h-full flex flex-col md:flex-row items-center max-sm:mx-5 gap-2 border border-[#6e6e6e] p-3 rounded-2xl">
            <div className="flex flex-row md:flex-col items-center justify-center md:border-r md:border-[#6e6e6e] md:pr-2 h-full">
              <span className="text-xl text-[#F5556C]">
                {formatDateRange(room.check_in).split(" ")[1]}
              </span>
              <span className="text-xl text-[#F5556C]">
                {formatDateRange(room.check_in).split(" ")[0]}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center md:flex-row">
              <div className="relative w-60 md:w-40 h-40 md:h-28 rounded-3xl overflow-hidden">
                <Image
                  src={room.rooms.room_images[0]}
                  alt={room.rooms.room_name}
                  width={500}
                  height={500}
                  className="h-full object-cover"
                />
              </div>
              <div className="pl-2 flex flex-col justify-between items-start">
                <h1 className="text-lg md:text-base">{room.rooms.room_name.slice(0, 15)}</h1>
                <span className="text-base md:text-sm font-light">
                  {formatDateRange(room.check_in, room.check_out)}
                </span>
                <span className="text-base md:text-sm font-light">
                  {room.guests_num} guest . {room.nights} nights
                </span>
                <span className="font-light">
                  {room.client_name.length > 10
                    ? room.client_name.slice(0, 10) + "..."
                    : room.client_name}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center h-full ml-5">
              <span className="font-light">$ {room.total_price}</span>
              <span className="text-[#F5556C] font-light"> {room.status} </span>
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`/trips/${room.id}`}>
          <div className=" max-w-sm  md:w-fit md:max-w-full h-full flex flex-col md:flex-row items-center max-sm:mx-5 gap-2 border border-[#6e6e6e] p-3 rounded-2xl">
          <div className="flex flex-row md:flex-col items-center justify-center md:border-r md:border-[#6e6e6e] md:pr-2 h-full">
          <span className="text-xl text-[#F5556C]">
                {formatDateRange(room.check_in).split(" ")[1]}
              </span>
              <span className="text-xl text-[#F5556C]">
                {formatDateRange(room.check_in).split(" ")[0]}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center md:flex-row">
            <div className="relative w-60 md:w-40 h-40 md:h-28 rounded-3xl overflow-hidden">
            <Image
                  src={room.rooms.room_images[0]}
                  alt={room.rooms.room_name}
                  width={500}
                  height={500}
                  className="h-full object-cover"
                />
              </div>
              <div className="pl-2 flex flex-col justify-between items-start">
              <h1 className="text-lg md:text-base">{room.rooms.room_name}</h1>
              <span className="text-base md:text-sm font-light">
              {formatDateRange(room.check_in, room.check_out)}
                </span>
                <span className="text-base font-extralight">
                  {room.guests_num} guest . {room.nights} nights
                </span>
                <span className="capitalize font-light">
                 {room.rooms.city} , {room.rooms.country} 
                </span>
              </div>
            </div>
            <div className="flex flex-row max-sm:w-full  md:flex-col justify-between items-center h-full md:ml-5">
              <span className="font-light">$ {room.total_price}</span>
              <span className="text-[#F5556C] font-light"> {room.status} </span>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}