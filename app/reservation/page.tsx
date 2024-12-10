import BookCard from "@/components/bookCard";
import BookForm from "@/components/bookForm";
import { getRoomById } from "@/lib/functions";
import { Room } from "../[roomId]/page";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "../loader";
import NavBar from "@/components/navbar";
import { IoIosArrowBack } from "react-icons/io";

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

export default async function page({ searchParams }: searchType) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const params = new URLSearchParams(searchParams as any).toString();
    redirect(`/signin?${params}`);
  }
  const room: Room = await getRoomById(searchParams.roomId);

  return (
    <>
    <NavBar user={user} />
      <div className="lg:mx-20 mt-5 mb-24">
        <div className="flex items-center gap-4">
        <IoIosArrowBack />
          <h1 className="text-2xl tracking-wide font-semibold">Request to book</h1>
        </div>
        <div className="mx-10 grid grid-cols-1 md:grid-cols-2 justify-center mt-10 ">
          <Suspense fallback={<Loader />}>
            <div>
              <div className="lg:max-w-lg">
              <h1 className="text-2xl font-semibold text-[#F5556C]">Your Trip</h1>
              <div className="pt-5 pb-5 mb-5 border-b border-[#6e6e6e] flex flex-col gap-5">
                <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium tracking-wide">Dates</h2>
                <span className="text-lg font-light">5 Nov - 7 Nov</span>
                </div>
                <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium tracking-wide">Guests</h2>
                <span className="text-lg font-light">1 guest</span>
                </div>
              </div>
              </div>
              <BookForm searchParams={searchParams} />
            </div>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <div>
              <BookCard room={room} searchParams={searchParams} />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}
