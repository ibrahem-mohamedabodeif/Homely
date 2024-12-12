import CardItem from "@/components/CardItem";
import NavIcon from "@/components/navIcon";
import { getAllRooms } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "./loader";
import HeroSec from "@/components/heroSec";

type searchType = {
  searchParams: {
    type?: string;
    country?: string;
    guestsNum?: number;
    bedroomsNum?: number;
    price?: string;
    bedsNum?: number;
  };
};

export default async function Home({ searchParams }: searchType) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const rooms = await getAllRooms();
  const { type, country, guestsNum, bedroomsNum, bedsNum, price } =
    searchParams;

  let filteredRooms = rooms;

  if (type) {
    filteredRooms = filteredRooms.filter((room) => room.category === type);
  }

  if (country) {
    filteredRooms = filteredRooms.filter((room) => room.country === country);
  }

  if (guestsNum) {
    filteredRooms = filteredRooms.filter(
      (room) => room.guests === Number(guestsNum)
    );
  }

  if (bedroomsNum) {
    filteredRooms = filteredRooms.filter(
      (room) => room.noBedroom === Number(bedroomsNum)
    );
  }
  if (bedsNum) {
    filteredRooms = filteredRooms.filter(
      (room) => room.noBed === Number(bedsNum)
    );
  }

  if (price) {
    if (price === "<200")
      filteredRooms = filteredRooms.filter((room) => room.price <= 200);
    else if (price === "<500")
      filteredRooms = filteredRooms.filter(
        (room) => room.price > 200 && room.price <= 500
      );
    else if (price === "<1000")
      filteredRooms = filteredRooms.filter(
        (room) => room.price > 500 && room.price <= 1000
      );
    else if (price === ">1000")
      filteredRooms = filteredRooms.filter((room) => room.price >= 1000);
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
      <div className="mb-20 mx-20 max-sm:mb-32 grid justify-center grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        {filteredRooms?.map((room: any) => (
          <Link href={`/${room.id}`} key={room.id}>
            <Suspense fallback={<Loader />}>
              <CardItem room={room} user={user} />
            </Suspense>
          </Link>
        ))}
      </div>
    </div>
  );
}
