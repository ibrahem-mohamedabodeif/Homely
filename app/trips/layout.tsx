import BackBtn from "@/components/backBtn";
import NavBar from "@/components/navbar";
// import { getUserData } from "@/lib/actions";
// import { createServerComponentClient } from "@/lib/server";
// import { redirect } from "next/navigation";

export default async function TripsLayout({ children }: { children: React.ReactNode }) {
//   const userData = await getUserData();
//     if (!userData) redirect("/signin");
    return (
    <div>
    <NavBar />
      <div className="lg:mx-20 mt-5">
        <div className="flex items-center gap-4 pb-10">
        <BackBtn/>
          <h1 className="text-2xl tracking-wide font-semibold"> Trips

          </h1>
        </div>
        {children}
        </div>
        </div>
  )
}
