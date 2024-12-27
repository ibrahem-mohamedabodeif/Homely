import Loader from "@/app/loading";
import BackBtn from "@/components/backBtn";
import BecomeahostForm from "@/components/becomeahostForm";
import NavBar from "@/components/navbar";
import { getRoomById } from "@/lib/functions";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams:Promise< { edite?: string }> }) {
 
  const user = await currentUser();

  const roomId = (await searchParams).edite;
  const roomEdite = roomId ? await getRoomById(roomId) : null;

  return (
    <>
      <NavBar />
      <div className="md:mt-5 mx-20 max-sm:mx-4 mb-20">
        <div className="pb-5 md:pb-10">
          <div className="flex items-center gap-4 pb-4">
            <BackBtn />
            <h1 className="text-2xl tracking-wide font-semibold capitalize">
              Welcom, {user?.firstName}
            </h1>
          </div>
          <div className=" mx-10 flex justify-between">
            <h3 className="text-base md:text-lg font-light ">
              Are you ready to become a host ?
            </h3>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <BecomeahostForm room={roomEdite} />
        </Suspense>
      </div>
    </>
  );
}
