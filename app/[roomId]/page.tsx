import { CiHeart } from "react-icons/ci";
import { Calender } from "@/components/calender";
import CheckForm from "@/components/CheckForm";
import { getAllRooms, getRoomById } from "@/lib/functions";
import SaveButton from "@/components/saveButton";
import PlaceOffers from "@/components/placeOffers";
import PlaceRule from "@/components/placeRule";
import ImageComponent from "@/components/imageComponent";
import { createServerComponentClient } from "@/lib/server";
import { Suspense } from "react";
import Loader from "../loader";

export type Room = {
  id: number;
  roomName: string;
  country: string;
  city: string;
  price: number;
  guests: number;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  hostedName: string;
  noBath: number;
  noBed: number;
  noBedroom: number;
};

type PageProps = {
  params: {
    roomId: string;
  };
  searchParams: {
    startDay: string;
    endDay: string;
    nights: number;
  };
};

export async function generateStaticParams() {
  const rooms = await getAllRooms();

  const ids = rooms.map((room) => ({ roomId: String(room.id) }));

  return ids;
}

export default async function Page({ params, searchParams }: PageProps) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const room: Room = await getRoomById(params.roomId);

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
  } = room;

  return (
    <>
      <div className="mx-2 lg:mx-14 p-6 mb-16">
        <div className="flex justify-between mb-10">
          <h1 className="text-2xl font-semibold">{roomName}</h1>
          <span className="flex items-center gap-2 text-lg">
            <SaveButton roomId={room.id} user={user}>
              <CiHeart size={25} />
            </SaveButton>
            save
          </span>
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
          <div className="mt-7 border-b-2 pb-7">
            <h1 className="text-lg font-semibold mb-2">
              {city}, {country}
            </h1>
            <span>
              {guests} guests . {noBedroom} bedrooms . {noBed} beds . {noBath}{" "}
              bath
            </span>
          </div>
        </Suspense>
        <Suspense fallback={<Loader />}>
          <div className="lg:grid lg:grid-cols-5 lg:gap-4 lg:items-center">
            <div className="col-span-3">
              <div className="mt-10 border-b-2 pb-5">
                <h1 className="text-lg font-semibold">
                  Hosted by <span className="font-normal">{hostedName}</span>
                </h1>
              </div>
              <div className="mt-10 border-b-2 pb-5 ">
                <p>{description}</p>
              </div>
              <div className="mt-10 border-b-2 pb-7">
                <h1 className="text-2xl font-semibold mb-10">
                  What this place offers
                </h1>
                <PlaceOffers />
              </div>
              <div className="mt-10 pb-5">
                <h1 className="text-2xl font-semibold mb-10">
                  Select checkout date
                </h1>
                <div className="flex justify-center">
                  <Calender searchParams={searchParams} />
                </div>
              </div>
            </div>
            <div className="col-span-2 mt-10">
              <CheckForm room={room} searchParams={searchParams} />
            </div>
          </div>
        </Suspense>
        <Suspense fallback={<Loader />}>
          <div className="mt-10 border-t-2 pt-10 pb-5">
            <h1 className="text-2xl font-semibold mb-7">Things to know</h1>
            <PlaceRule />
          </div>
        </Suspense>
      </div>
    </>
  );
}
