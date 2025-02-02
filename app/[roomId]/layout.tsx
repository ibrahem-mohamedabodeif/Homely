import { Suspense } from "react";
import NavBar from "@/components/navbar";
import Loading from "@/app/loading";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <NavBar />
      <div className=" mx-5 md:mx-20">
        <Suspense fallback={<Loading />}>
          <div className="w-full">
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
