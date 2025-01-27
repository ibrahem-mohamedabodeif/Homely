import CardItem from "@/components/CardItem";
import NavIcon from "@/components/navIcon";
import { checkAvailability, getAllRooms, searchRooms } from "@/lib/functions";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "./loading";
import HeroSec from "@/components/heroSec";
type searchType = {
  searchParams: Promise<{
    type?: string;
    destination?: string;
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

  let filteredRooms = rooms;

  if (searchParams) {
    filteredRooms = await searchRooms(searchParams);
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
