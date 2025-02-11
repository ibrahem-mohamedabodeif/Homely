import SaveButton from "./saveButton";
import { CiHeart } from "react-icons/ci";
import { Suspense } from "react";
import ImageComponent from "./imageComponent";
import Loader from "@/app/loading";
import ShareBtn from "./shareBtn";
import BackBtn from "./backBtn";

export default async function RoomInfo({ ...props }: any) {
  const {
    room_name,
    country,
    city,
    guests_num,
    room_images,
    bathrooms_num,
    beds_num,
    bedrooms_num,
    room_category,
    address,
  } = props.room;
  const roomId = props.room.id;

  return (
    <>
      <div className="flex justify-between mb-10 w-full">
        <div className="flex items-center gap-2">
        <BackBtn/>
        <h1 className="text-xl md:text-2xl font-medium capitalize">
          {room_name},{country}
        </h1>
        </div>
        <div className="flex gap-5 items-center">
          
          <div className="flex items-center gap-1 ">
            <SaveButton roomId={roomId}>
              <CiHeart size={25} />
            </SaveButton>
            <span className="capitalize text-lg">save</span>
          </div>
          <div className="text-lg">
          <ShareBtn
            room_name={room_name}
            room_category={room_category}
            city={city}
            country={country}
            type={"room"}
          />
          </div>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <ImageComponent
          images={room_images}
          roomId={roomId}
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div className="mt-7 pb-5">
          <h1 className="text-xl font-medium mb-2 capitalize">{address}</h1>
          <span className="font-light text-base">
            {guests_num} guests . {bedrooms_num} bedrooms . {beds_num} beds .{" "}
            {bathrooms_num} bathrooms
          </span>
        </div>
      </Suspense>
    </>
  );
}
