import { CiHeart } from "react-icons/ci";
import { Calender } from "@/components/calender";
import CheckForm from "@/components/CheckForm";
import { getAllRooms, getRoomById, getUserData } from "@/lib/functions";
import SaveButton from "@/components/saveButton";
import PlaceOffers from "@/components/roomDesc";
import PlaceRule from "@/components/placeRule";
import ImageComponent from "@/components/imageComponent";
import { createServerComponentClient } from "@/lib/server";
import { Suspense } from "react";
import Loader from "../loading";
import NavBar from "@/components/navbar";
import { RiShare2Line } from "react-icons/ri";
import { GoShare } from "react-icons/go";
import Image from "next/image";
import RoomInfo from "@/components/roomInfo";
import HostedComp from "@/components/hostedComp";
import RoomDesc from "@/components/roomDesc";
import SelectDates from "@/components/selectDates";
import CommentsSec from "@/components/commentsSec";
import HostInfo from "@/components/hostInfo";

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
  let userData = null;
 user && (userData = await getUserData(user?.id));
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
      <NavBar userData={userData} />
      <div className="mx-20 mb-16">
        <Suspense fallback={<Loader />}>
          <RoomInfo user={user} room={room} roomId={params.roomId} />
        </Suspense>
        <div className="lg:grid lg:grid-cols-5 gap-40">
          <div className="col-span-3">
            <Suspense fallback={<Loader />}>
              <HostedComp hostedName={hostedName} userData={userData} />
            </Suspense>
            <Suspense fallback={<Loader />}>
              <RoomDesc />
            </Suspense>
            <Suspense fallback={<Loader />}>
              <SelectDates searchParams={searchParams} />
            </Suspense>
          </div>
            <Suspense fallback={<Loader />}>
              <div className="col-span-2 mt-10">
                <CheckForm room={room} searchParams={searchParams} />
              </div>
            </Suspense>
        </div>
        <div className="border-t-2 py-10">
          <Suspense fallback={<Loader />}>
          <CommentsSec userData={userData} roomId={params.roomId}/>
          </Suspense>
        </div>
        <div className="border-t-2 py-5">
          <Suspense fallback={<Loader />}>
          <HostInfo userData={userData}/>
          </Suspense>
        </div>
        <Suspense fallback={<Loader />}>
          <PlaceRule />
        </Suspense>
      </div>
    </>
  );
}
