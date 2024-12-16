import BackBtn from "@/components/backBtn";
import NavBar from "@/components/navbar";
import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function TripsLayout({ children }: { children: React.ReactNode }) {
    const supabase = createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) redirect("/signin");
    return (
    <div>
    <NavBar user={user} />
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
