import CheckForm from "@/components/CheckForm";
import { getAllRooms, getRoomById} from "@/lib/functions";
import PlaceRule from "@/components/placeRule";
import { Suspense } from "react";

import Loader from "../loading";
import NavBar from "@/components/navbar";
import RoomInfo from "@/components/roomInfo";
import HostedComp from "@/components/hostedComp";
import RoomDesc from "@/components/roomDesc";
import SelectDates from "@/components/selectDates";
import CommentsSec from "@/components/commentsSec";
import HostInfo from "@/components/hostInfo";

export type Room = {
  id: number;
  room_name: string;
  country: string;
  city: string;
  room_price: number;
  guests_num: number;
  room_description: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  user_id: string;
  bathrooms_num: number;
  beds_num: number;
  bedrooms_num: number;
  room_category: string;
  address: string;
};

type PageProps = {
  params: Promise<{ roomId: string }>;

  searchParams: Promise<{
    startDay: string;
    endDay: string;
    nights: number;
  }>;
};

export async function generateStaticParams() {
  const rooms = await getAllRooms();

  const ids = rooms.map((room) => ({ roomId: String(room.id) }));

  return ids;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { roomId } = await params;

  const searchParamsData = await searchParams;
  const room: Room = await getRoomById(roomId);

  return (
    <>
      <NavBar />
      <div className="md:mx-20 mx-5 mb-16">
        <Suspense fallback={<Loader />}>
          <RoomInfo room={room} roomId={roomId} />
        </Suspense>
        <div className="lg:grid lg:grid-cols-5 gap-40">
          <div className="col-span-3">
            <Suspense fallback={<Loader />}>
              <HostedComp userId={room.user_id} />
            </Suspense>
            <Suspense fallback={<Loader />}>
              <RoomDesc room = {room}/>
            </Suspense>
            <Suspense fallback={<Loader />}>
              <SelectDates searchParams={searchParamsData} />
            </Suspense>
          </div>
          <Suspense fallback={<Loader />}>
            <div className="col-span-2 mt-10">
              <CheckForm room={room} searchParams={searchParamsData} />
            </div>
          </Suspense>
        </div>
        <div className="border-t-2 py-10">
          <Suspense fallback={<Loader />}>
            <CommentsSec roomId={roomId} />
          </Suspense>
        </div>
        <div className="border-t-2 py-5">
          <Suspense fallback={<Loader />}>
            <HostInfo userId={room.user_id} />
          </Suspense>
        </div>
        <Suspense fallback={<Loader />}>
          <PlaceRule />
        </Suspense>
      </div>
    </>
  );
}