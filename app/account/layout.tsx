import NavBar from "@/components/navbar";
import NavBarBottom from "@/components/navBarBottom";
import SideNav from "@/components/sideNav";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden md:block">
        <NavBar />
      </div>
      <div className="grid grid-cols-12 ">
        <div className="col-span-2 pt-10 min-h-svh bg-white shadow-xl rounded-3xl md:col-span-1 lg:col-span-2">
          <SideNav />
        </div>
        <div className="mx-7 mt-10 col-span-10">{children}</div>
      </div>
      <div className="fixed -bottom-1 w-full lg:hidden md:hidden ">
        <NavBarBottom />
      </div>
    </>
  );
}
