import BackBtn from "@/components/backBtn";
import NavBar from "@/components/navbar";
import WishListCard from "@/components/wishListCard";
import { getWishRooms } from "@/lib/functions";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  
  const user = await currentUser();
 

  const wishRooms: any = await getWishRooms(user?.id);

  return (
    <>
    <NavBar />
      <div className="md:mx-20 mx-5 md:mt-5">
        <div className="flex items-center gap-4 pb-10">
        <BackBtn/>
          <h1 className="text-2xl tracking-wide font-semibold"> Wish List
          </h1>
        </div>
      {!wishRooms?.length ? (
        <div className="text-2xl md:text-4xl flex justify-center items-center text-center">
          Add some rooms to explore oneday ✨.
        </div>
      ) : (
        <div className="grid grid-cols-1 mx-5 md:grid-cols-4 justify-center gap-y-10 gap-10 mb-24 md:mx-10">
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
                room_name: string;
                room_price: number;
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
