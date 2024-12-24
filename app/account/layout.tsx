import SideNav from "@/components/sideNav";
import { Suspense } from "react";
import NavBar from "@/components/navbar";
import { redirect } from "next/navigation";
import Loading from "../loading";

export default async function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 


  return (
    <div className="relative">
      <NavBar />
      <div className="grid grid-cols-12 mx-20 items-start">
        <div className="col-span-2 h-svh md:col-span-1 lg:col-span-2">
          <SideNav />
        </div>
        <Suspense fallback={<Loading />}>
          <div className="ml-20 col-span-10">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
