import BackBtn from "@/components/backBtn";
import NavBar from "@/components/navbar";

export default async function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <div className="md:mx-20 mx-5 md:mt-5">
        <div className="flex items-center gap-4 pb-10">
          <BackBtn />
          <h1 className="text-2xl tracking-wide font-semibold"> Trips</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
