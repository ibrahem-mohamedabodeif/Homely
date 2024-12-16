import { GoShare } from "react-icons/go";
import SaveButton from "./saveButton";
import { CiHeart } from "react-icons/ci";
import { Suspense } from "react";
import ImageComponent from "./imageComponent";
import Loader from "@/app/loading";

export default function RoomInfo({...props}:any) {
    const {
        roomName,
        country,
        city,
        price,
        guests,
        description,
        image1,
        image2,
        image3,
        image4,
        image5,
        hostedName,
        noBath,
        noBed,
        noBedroom,
      } = props.room;
      const roomId = props.room.id;
      const user = props.user;
  return (
    <>
    <div className="flex justify-between mb-10">
          <h1 className="text-2xl font-medium capitalize">{roomName}</h1>
          <div className="flex gap-5 items-center">
            <div className="flex items-center gap-2 ">
              <GoShare size={22} />
              <span className="capitalize text-lg">share</span>
            </div>

            <div className="flex items-center gap-1 ">
              <SaveButton roomId={roomId} user={user}>
                <CiHeart size={25} />
              </SaveButton>
              <span className="capitalize text-lg">save</span>
            </div>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <ImageComponent
            image1={image1}
            image2={image2}
            image3={image3}
            image4={image4}
            image5={image5}
          />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <div className="mt-7 pb-5">
            <h1 className="text-xl font-medium mb-2 capitalize">
              {city}, {country}
            </h1>
            <span className="font-light text-base">
              {guests} guests . {noBedroom} bedrooms . {noBed} beds . {noBath}{" "}
              bath
            </span>
          </div>
        </Suspense>
    </>
  )
}
