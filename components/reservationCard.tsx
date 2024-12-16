"use client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ReservationCard({ room }: any) {
  const pathName = usePathname();

  function formatDateRange(startDate: string, endDate?: string) {
    if (!endDate) {
      const startFormatted = format(new Date(startDate), "d MMM");
      return startFormatted;
    }
    const startFormatted = format(new Date(startDate), "d MMM");
    const endFormatted = format(new Date(endDate), "d MMM");
    return `${startFormatted} - ${endFormatted}`;
  }
  return (
    <>
      {pathName === "/account/homely-rooms/bookings" ? (
        <Link href={`/account/homely-rooms/bookings/${room.id}`}>
        <div className="w-fit h-full flex items-center gap-2 border border-[#6e6e6e] p-3 rounded-2xl">
          <div className="flex flex-col items-center justify-center border-r border-[#6e6e6e] pr-2 h-full">
            <span className="text-xl text-[#F5556C]">
              {formatDateRange(room.startDay).split(" ")[1]}
            </span>
            <span className="text-xl text-[#F5556C]">
              {formatDateRange(room.startDay).split(" ")[0]}
            </span>
          </div>
          <div className="flex">
            <div className="relative w-40 h-28 rounded-3xl overflow-hidden">
              <Image
                src={room.rooms.image1}
                alt={room.rooms.roomName}
                width={500}
                height={500}
                className="h-full object-cover"
              />
            </div>
            <div className="pl-2 flex flex-col justify-between items-start">
              <h1 className="text-base">{room.rooms.roomName.slice(0, 15)}</h1>
              <span className="text-sm font-light">
                {formatDateRange(room.startDay, room.endDay)}
              </span>
              <span className="text-sm font-light">
                {room.guests} guest . {room.nights} nights
              </span>
              <span className="font-light">
                {room.fullName.length > 10
                  ? room.fullName.slice(0, 10) + "..."
                  : room.fullName}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center h-full ml-5">
            <span className="font-light">$ {room.totalPrice}</span>
            <span className="text-[#F5556C] font-light"> {room.status} </span>
          </div>
        </div>
        </Link>
      ) : (
        <Link href={`/trips/${room.id}`}>
        <div className="w-fit h-full flex items-center gap-5 border border-[#6e6e6e] p-4 rounded-2xl">
          <div className="flex flex-col items-center justify-center border-r border-[#6e6e6e] pr-2 h-full">
            <span className="text-xl text-[#F5556C]">
              {formatDateRange(room.startDay).split(" ")[1]}
            </span>
            <span className="text-xl text-[#F5556C]">
              {formatDateRange(room.startDay).split(" ")[0]}
            </span>
          </div>
          <div className="flex">
            <div className="relative w-48 h-32 rounded-3xl overflow-hidden">
              <Image
                src={room.rooms.image1}
                alt={room.rooms.roomName}
                width={500}
                height={500}
                className="h-full object-cover"
              />
            </div>
            <div className="pl-4 flex flex-col justify-between items-start">
              <h1 className="text-base">{room.rooms.roomName.slice(0, 15)}</h1>
              <span className="text-base font-extralight">
                {formatDateRange(room.startDay, room.endDay)}
              </span>
              <span className="text-base font-extralight">
              {room.guests} guest . {room.nights} nights
              </span>
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 border border-[#6e6e6e] rounded-full overflow-hidden">
                  <Image
                    src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
                    alt="image"
                    width={200}
                    height={200}
                    className="h-full rounded-full object-cover"
                  />
                </div>
                <span className="font-extralight">
                  {" "}
                  {room.rooms.hostedName}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center h-full pl-5">
            <span className="font-light">$ {room.totalPrice}</span>
            <span className="text-[#F5556C] font-light"> {room.status} </span>
          </div>
        </div>
        </Link>
      )}
    </>
  );
}
