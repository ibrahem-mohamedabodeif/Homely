import Loader from "@/app/loader";
import WishListCard from "@/components/wishListCard";
import { getWishRooms } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const wishRooms: any = await getWishRooms(user.id);

  return (
    <>
      {!wishRooms?.length ? (
        <div className="text-4xl flex justify-center mt-40">
          Add some rooms to explore oneday ✨.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-y-10 gap-16 mb-24">
          {wishRooms?.map(
            (room: {
              id: any;
              totalPrice?: number;
              nights?: number;
              startDay?: string;
              endDay?: string;
              roomId?: string;
              rooms?: {
                city: string;
                image1: string;
                country: string;
                roomName: string;
                hostedName: string;
                price: number;
              };
            }) => (
              <WishListCard room={room} key={room.id} />
            )
          )}
        </div>
      )}
    </>
  );
}
