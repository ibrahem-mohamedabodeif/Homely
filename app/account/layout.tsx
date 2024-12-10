import SideNav from "@/components/sideNav";
import Loader from "../loader";
import { Suspense } from "react";
import NavBar from "@/components/navbar";
import { createServerComponentClient } from "@/lib/server";

export default async function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
    <NavBar user={user} />
      <div className="grid grid-cols-12 mx-20 items-start">
        <div className="col-span-2 h-svh md:col-span-1 lg:col-span-2">
          <SideNav />
        </div>
        <Suspense fallback={<Loader />}>
          <div className="ml-20 col-span-10">{children}</div>
        </Suspense>
      </div>
    </>
  );
}
