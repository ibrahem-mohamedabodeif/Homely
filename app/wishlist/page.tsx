import BackBtn from "@/components/backBtn";
import NavBar from "@/components/navbar";
import WishListCard from "@/components/wishListCard";
import { getUserData, getWishRooms } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");
  const userData = await getUserData(user?.id);

  const wishRooms: any = await getWishRooms(user.id);

  return (
    <>
    <NavBar userData={userData} />
      <div className="lg:mx-20 mt-5">
        <div className="flex items-center gap-4 pb-10">
        <BackBtn/>
          <h1 className="text-2xl tracking-wide font-semibold"> Wish List
          </h1>
        </div>
      {!wishRooms?.length ? (
        <div className="text-4xl flex justify-center mt-40">
          Add some rooms to explore oneday ✨.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center gap-y-10 gap-10 mb-24 mx-10">
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
                address:string;
              };
            }) => (
              <WishListCard room={room} key={room.id} />
            )
          )}
        </div>
      )}
            </div>  

    </>
  );
}
