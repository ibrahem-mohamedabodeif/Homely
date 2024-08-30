import PegasusRoom from "@/components/pegasusRoom";
import { getPegasusRooms } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
export const revalidate = 10;
export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pegasusRooms = await getPegasusRooms(user?.id);

  return (
    <>
      {!pegasusRooms?.length ? (
        <div className="text-4xl flex justify-center mt-40">No Rooms yet</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-y-10 gap-16 mb-24">
          {pegasusRooms.map((room) => (
            <PegasusRoom room={room} key={room.id} />
          ))}
        </div>
      )}
    </>
  );
}
