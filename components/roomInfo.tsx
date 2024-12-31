import SaveButton from "./saveButton";
import { CiHeart } from "react-icons/ci";
import { Suspense } from "react";
import ImageComponent from "./imageComponent";
import Loader from "@/app/loading";
import ShareBtn from "./shareBtn";

export default async function RoomInfo({...props}:any) {
    const {
        room_name,
        country,
        city,
        guests_num,
        image1,
        image2,
        image3,
        image4,
        image5,
        bathrooms_num,
        beds_num,
        bedrooms_num,
        room_category,
        address
      } = props.room;
      const roomId =  props.room.id;



      

  return (
    <>
    <div className="flex justify-between mb-10 w-full">
          <h1 className="text-xl md:text-2xl font-medium capitalize">{room_name},{country}</h1>
          <div className="flex gap-5 items-center">
            
<ShareBtn room_name={room_name} room_category={room_category} city={city} country ={country}/>
            <div className="flex items-center gap-1 ">
              <SaveButton roomId={roomId}>
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
              {address}
            </h1>
            <span className="font-light text-base">
              {guests_num} guests . {bedrooms_num} bedrooms . {beds_num} beds . {bathrooms_num}{" "}
              bathrooms
            </span>
          </div>
        </Suspense>
    </>
  )
}
