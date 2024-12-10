import Loader from "@/app/loader";
import BecomeahostForm from "@/components/becomeahostForm";
import NavBar from "@/components/navbar";
import { getRoomById } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default async function Page({ searchParams }: any) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const roomId: string | undefined = searchParams.edite;
  const roomEdite = roomId ? await getRoomById(roomId) : null;

  return (
    <>
    <NavBar user={user} />
    <div className="mt-5 mx-20 max-sm:mx-4 mb-20">
      <div className="pb-10">
      <div className="flex items-center gap-4 pb-4">
        <IoIosArrowBack />
          <h1 className="text-2xl tracking-wide font-semibold capitalize"> Welcom, {user?.user_metadata.name.split(" ")[0]}
          </h1>
        </div>
        <div className="mx-10 flex justify-between">
          <h3 className="text-lg font-light "> Are you ready to become a host ?          </h3>
          <button className="text-center border pt-2 pb-2 pl-5 pr-5 rounded-xl bg-[#F5556C] text-white capitalize">add place</button>
        </div>
        </div>
      <Suspense fallback={<Loader />}>
        <BecomeahostForm user={user} room={roomEdite} />
      </Suspense>
    </div>
    </>
  );
}
