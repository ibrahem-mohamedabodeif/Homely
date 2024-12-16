import Loader from "@/app/loading";
import BackBtn from "@/components/backBtn";
import BecomeahostForm from "@/components/becomeahostForm";
import NavBar from "@/components/navbar";
import { getRoomById, getUserData } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({ searchParams }: any) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await getUserData(user?.id);

  if (!user) redirect("/signin");

  const roomId: string | undefined = searchParams.edite;
  const roomEdite = roomId ? await getRoomById(roomId) : null;

  return (
    <>
      <NavBar user={user} />
      <div className="mt-5 mx-20 max-sm:mx-4 mb-20">
        <div className="pb-10">
          <div className="flex items-center gap-4 pb-4">
            <BackBtn />
            <h1 className="text-2xl tracking-wide font-semibold capitalize">
              Welcom, {userData.user_name.split(" ")[0]}
            </h1>
          </div>
          <div className=" mx-10 flex justify-between">
            <h3 className="text-lg font-light ">
              Are you ready to become a host ?
            </h3>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <BecomeahostForm user={user} room={roomEdite} />
        </Suspense>
      </div>
    </>
  );
}
