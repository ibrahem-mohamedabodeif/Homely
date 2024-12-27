import CardItem from "@/components/CardItem";
import NavIcon from "@/components/navIcon";
import { checkAvailability, getAllRooms } from "@/lib/functions";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "./loading";
import HeroSec from "@/components/heroSec";
type searchType = {
  searchParams:Promise< {
    type?: string;
    country?: string;
    guestsNum?: number;
    bedroomsNum?: number;
    price?: string;
    bedsNum?: number;
    checkIn?: string;
    checkOut?: string;
  }>;
};

export default async function Home({ searchParams }: searchType) {
  const rooms = await getAllRooms();
  const {
    type,
    country,
    guestsNum,
    bedroomsNum,
    bedsNum,
    price,
    checkIn,
    checkOut,
  } = await searchParams;

  let filteredRooms = rooms;

  if (type) {
    filteredRooms = filteredRooms.filter((room) => room.room_category === type);
  }

  if (country) {
    filteredRooms = filteredRooms.filter((room) => room.country === country);
  }

  if (guestsNum) {
    filteredRooms = filteredRooms.filter(
      (room) => room.guests_num === Number(guestsNum)
    );
  }

  if (checkIn && checkOut) {
    const promises = filteredRooms.map(async (room) => {
      const isAvailable = await checkAvailability(room.id, checkIn, checkOut);
      return isAvailable ? room : null;
    });
    filteredRooms = (await Promise.all(promises)).filter(Boolean);
  }

  if (bedroomsNum) {
    filteredRooms = filteredRooms.filter(
      (room) => room.bedrooms_num === Number(bedroomsNum)
    );
  }
  if (bedsNum) {
    filteredRooms = filteredRooms.filter(
      (room) => room.beds_num === Number(bedsNum)
    );
  }

  if (price) {
    if (price === "<200")
      filteredRooms = filteredRooms.filter((room) => room.room_price <= 200);
    else if (price === "<500")
      filteredRooms = filteredRooms.filter(
        (room) => room.room_price > 200 && room.room_price <= 500
      );
    else if (price === "<1000")
      filteredRooms = filteredRooms.filter(
        (room) => room.room_price > 500 && room.room_price <= 1000
      );
    else if (price === ">1000")
      filteredRooms = filteredRooms.filter((room) => room.room_price >= 1000);
  }

  return (
    <div className="relative">
      <div>
        <div className="relative h-svh">
          <HeroSec />
        </div>
        <NavIcon />
      </div>
      {!filteredRooms.length && (
        <div className="flex justify-center items-center mt-36 text-xl">
          There&apos;s no Rooms matching the filters
        </div>
      )}
      <div className="mb-20 mx-5 md:mx-20 max-sm:mb-32 grid justify-center grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        {filteredRooms?.map((room: any) => (
          <Link href={`/${room.id}`} key={room.id}>
            <Suspense fallback={<Loader />}>
              <CardItem room={room} />
            </Suspense>
          </Link>
        ))}
      </div>
    </div>
  );
}
