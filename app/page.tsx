import CardItem from "@/components/CardItem";
import NavBar from "@/components/navbar";
import NavBarBottom from "@/components/navBarBottom";
import NavIcon from "@/components/navIcon";
import { getAllRooms, getFilterRooms, getRoomsBySearch } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";

type searchType = {
  searchParams: {
    type: string;
    country: string;
  };
};

export default async function Home({ searchParams }: searchType) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let rooms: any[];

  const { type, country } = searchParams;

  if (type) {
    rooms = await getFilterRooms(type);
  } else if (country) {
    rooms = await getRoomsBySearch(country.toLowerCase());
  } else {
    rooms = await getAllRooms();
  }

  return (
    <div className="relative">
      <NavBar />
      <NavIcon />
      {!rooms.length && (
        <div className="flex justify-center items-center mt-36 text-xl">
          There&apos;s no Rooms in this country
        </div>
      )}
      <div className="grid justify-center grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-10 min-[320px]:mx-12 min-[425px]:mx-16 md:mx-16 my-10">
        {rooms?.map((room: any) => (
          <CardItem key={room.id} room={room} userId={user?.id} />
        ))}
      </div>
      <div className="fixed -bottom-1 w-full lg:hidden md:hidden ">
        <NavBarBottom />
      </div>
    </div>
  );
}
