import HomelyRoomCard from "@/components/homelyRoomCard";
import { getHomelyRooms } from "@/lib/functions";
import { currentUser } from "@clerk/nextjs/server";
export default async function Page() {
const user = await currentUser()
  const homelyRooms = await getHomelyRooms(user?.id);

  return (
    <>
      {!homelyRooms?.length ? (
        <div className="text-4xl flex justify-center mt-40">No Rooms yet</div>
      ) : (
        <div className="grid grid-cols-1 items-center w-full mx-auto md:grid-cols-3 justify-center gap-y-10 gap-16 mb-24">
          {homelyRooms.map((room) => (
            <HomelyRoomCard room={room} key={room.id} />
          ))}
        </div>
      )}
    </>
  );
}
