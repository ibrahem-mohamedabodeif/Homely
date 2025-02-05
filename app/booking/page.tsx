import BookCard from "@/components/bookCard";
import BookForm from "@/components/bookForm";
import { getRoomById } from "@/lib/functions";
import { Room } from "../[roomId]/page";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "./loading";
import NavBar from "@/components/navbar";
import BackBtn from "@/components/backBtn";
import { format } from "date-fns";
import { currentUser } from "@clerk/nextjs/server";

type searchType = {
  roomId: string;
  startDay: string;
  endDay: string;
  nights: number;
  guests: number;
  totalPrice: number;
  cleaningFee: number;
  serviceFee: number;
};

  export default async function Page({ searchParams }: { searchParams: Promise<searchType> }) {
    const params = await searchParams;
    const userData = await currentUser();
    
    if (!userData) {
      const searchParamsString = new URLSearchParams(params as any).toString();
      const returnTo = `/booking?${searchParamsString}`;
      const signInUrl = `/sign-in?redirect_url=${encodeURIComponent(returnTo)}`;
      redirect(signInUrl);
    }
  
    const roomId = params.roomId;
    const room: Room = await getRoomById(roomId);
    const startDay = params.startDay;
    const endDay = params.endDay;
    const guests = params.guests;
  
    function formatDateRange(startDate: string, endDate: string) {
      const startFormatted = format(new Date(startDate), "d MMM");
      const endFormatted = format(new Date(endDate), "d MMM");
  
      return `${startFormatted} - ${endFormatted}`;
    }
  

  return (
    <>
      <NavBar />
      <div className="lg:mx-20 mt-5 mb-24">
        <div className="flex items-center gap-4">
          <BackBtn />
          <h1 className="text-2xl tracking-wide font-semibold">Request to book</h1>
        </div>
        <div className="mx-10 grid grid-cols-1 space-y-reverse gap-10 md:grid-cols-2 justify-center mt-10 ">
          <Suspense fallback={<Loader />}>
            <div>
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-[#F5556C]">Your Trip</h1>
                <div className="pt-5 pb-5 mb-5 border-b border-[#6e6e6e] flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg tracking-wide">Dates</h2>
                    <span className="text-lg font-light">{formatDateRange(startDay, endDay)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg tracking-wide">Guests</h2>
                    <span className="text-lg font-light">{guests} guest</span>
                  </div>
                </div>
              </div>
              <BookForm />
            </div>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <div>
              <BookCard room={room} searchParams={params} />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}