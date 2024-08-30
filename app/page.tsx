import CardItem from "@/components/CardItem";
import NavBar from "@/components/navbar";
import NavBarBottom from "@/components/navBarBottom";
import NavIcon from "@/components/navIcon";
import { getAllRooms } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "./loader";

type searchType = {
  searchParams: {
    type?: string;
    country?: string;
    guests?: string;
    bedrooms?: string;
    price?: string;
  };
};

export default async function Home({ searchParams }: searchType) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const rooms = await getAllRooms();
  const { type, country, guests, bedrooms, price } = searchParams;

  let filteredRooms = rooms;

  if (type) {
    filteredRooms = filteredRooms.filter((room) => room.category === type);
  }

  if (country) {
    filteredRooms = filteredRooms.filter((room) => room.country === country);
  }

  if (guests) {
    if (guests === "1")
      filteredRooms = filteredRooms.filter((room) => room.guests === 1);
    else if (guests === "2")
      filteredRooms = filteredRooms.filter((room) => room.guests === 2);
    else if (guests === ">2")
      filteredRooms = filteredRooms.filter(
        (room) => room.guests > 2 && room.guests < 10
      );
    else if (guests === ">10")
      filteredRooms = filteredRooms.filter((room) => room.guests >= 10);
  }

  if (bedrooms) {
    if (bedrooms === "1")
      filteredRooms = filteredRooms.filter((room) => room.noBedroom === 1);
    else if (bedrooms === "2")
      filteredRooms = filteredRooms.filter((room) => room.noBedroom === 2);
    else if (bedrooms === ">2")
      filteredRooms = filteredRooms.filter(
        (room) => room.noBedroom > 2 && room.noBedroom <= 5
      );
    else if (bedrooms === ">5")
      filteredRooms = filteredRooms.filter((room) => room.noBedroom >= 5);
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
      {!filteredRooms.length && (
        <div className="flex justify-center items-center mt-36 text-xl">
          There&apos;s no Rooms matching the filters
        </div>
      )}
      <div className="mb-20 mx-10 max-sm:mb-32 grid justify-center grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-10 my-10">
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
