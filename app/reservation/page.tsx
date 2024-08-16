import BookCard from "@/components/bookCard";
import BookForm from "@/components/bookForm";
import { getReservations, getRoomById } from "@/lib/functions";
import { FaArrowLeft } from "react-icons/fa";
import { Room } from "../rooms/[roomId]/page";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/navbar";
import ReservationCard from "@/components/reservationCard";
import NavBarBottom from "@/components/navBarBottom";

type searchType = {
  searchParams: {
    roomId: string;
    startDay: string;
    endDay: string;
    nights: number;
    guests: number;
    totalPrice: number;
    cleaningFee: number;
    serviceFee: number;
  };
};

type reservationRooms = {
  id: string;
  totalPrice: number;
  nights: number;
  startDay: string;
  endDay: string;
  country: string;
  city: string;
  roomName: string;
  image1: string;
};

export default async function page({ searchParams }: searchType) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/signin?${searchParams}`);

  const room: Room = await getRoomById(searchParams.roomId);

  return (
    <>
      <div className="hidden md:block">
        <NavBar />
      </div>
      <div className="mx-2 lg:mx-16 mt-10 mb-24">
        <div>
          <h1 className="text-2xl font-semibold">Request for booking</h1>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 justify-center mt-10 ">
          <div>
            <BookCard room={room} searchParams={searchParams} />
          </div>
          <div>
            <BookForm searchParams={searchParams} />
          </div>
        </div>
      </div>
      <div className="fixed -bottom-1 w-full lg:hidden md:hidden ">
        <NavBarBottom />
      </div>
    </>
  );
}
