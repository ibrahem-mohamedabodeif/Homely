import Loader from "@/app/loader";
import BecomeahostForm from "@/components/becomeahostForm";
import { getRoomById } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({ searchParams }: any) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const roomId: string | undefined = searchParams.edite;
  const roomEdite = roomId ? await getRoomById(roomId) : null;

  return (
    <div className="my-7 mx-16 max-sm:mx-4 mb-20">
      <h1 className="text-center text-4xl font-bold tracking-wider mb-10">
        PEGASUS Setup
      </h1>
      <Suspense fallback={<Loader />}>
        <BecomeahostForm user={user} room={roomEdite} />
      </Suspense>
    </div>
  );
}
