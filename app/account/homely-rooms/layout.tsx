import Loader from "@/app/loading";
import AccountMegaMenu from "@/components/accountMegaMenu";
import Link from "next/link";
import { Suspense } from "react";
import { IoAdd } from "react-icons/io5";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AccountMegaMenu />
            <h1 className="text-2xl text-[#F5556C] font-medium pb-5">
              Your Homely Rooms
            </h1>
          </div>
          <Link href={"/hosting/become-a-host"}>
            <IoAdd size={30} />
          </Link>
        </div>
        <p className="text-xl font-extralight">
          You can add your rooms and manage it and bookings
        </p>
      </div>

      <Suspense fallback={<Loader />}>
        <div className="mt-10">{children}</div>
      </Suspense>
    </div>
  );
}
