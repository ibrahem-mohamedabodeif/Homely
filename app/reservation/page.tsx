import BookCard from "@/components/bookCard";
import BookForm from "@/components/bookForm";
import { getRoomById } from "@/lib/functions";
import { Room } from "../[roomId]/page";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "../loader";

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
      <div className="mx-2 lg:mx-16 mt-10 mb-24">
        <div>
          <h1 className="text-2xl font-semibold">Request for booking</h1>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 justify-center mt-10 ">
          <Suspense fallback={<Loader />}>
            <div>
              <BookCard room={room} searchParams={searchParams} />
            </div>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <div>
              <BookForm searchParams={searchParams} />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}
