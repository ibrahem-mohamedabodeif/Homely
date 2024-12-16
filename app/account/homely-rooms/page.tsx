import HomelyRoomCard from "@/components/homelyRoomCard";
import { getHomelyRooms } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
export const revalidate = 10;
export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const homelyRooms = await getHomelyRooms(user?.id);

  return (
    <>
      {!homelyRooms?.length ? (
        <div className="text-4xl flex justify-center mt-40">No Rooms yet</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-y-10 gap-16 mb-24">
          {homelyRooms.map((room) => (
            <HomelyRoomCard room={room} key={room.id} />
          ))}
        </div>
      )}
    </>
  );
}
