import SideNav from "@/components/sideNav";
import Loader from "../loader";
import { Suspense } from "react";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className="col-span-2 pt-10 min-h-svh bg-white shadow-xl rounded-3xl md:col-span-1 lg:col-span-2">
          <SideNav />
        </div>
        <Suspense fallback={<Loader />}>
          <div className="mx-7 mt-10 col-span-10">{children}</div>
        </Suspense>
      </div>
    </>
  );
}
