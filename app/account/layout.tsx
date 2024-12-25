import SideNav from "@/components/sideNav";
import { Suspense } from "react";
import NavBar from "@/components/navbar";
import Loading from "../loading";

export default async function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 


  return (
    <div className="relative">
      <NavBar />
      <div className="md:grid md:grid-cols-12 flex flex-col mx-5 md:mx-20 md:items-start">
        <div className="md:col-span-2 md:h-svh justify-center mx-auto">
          <SideNav />
        </div>
        <Suspense fallback={<Loading />}>
          <div className="w-full md:ml-20 md:col-span-10 md:w-auto mb-10 md:mb-auto">{children}</div>
        </Suspense>
      </div>
    </div>
  );
}
