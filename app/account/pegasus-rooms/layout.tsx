import Loader from "@/app/loader";
import Link from "next/link";
import { Suspense } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex items-center gap-5">
        <Link
          href={"/account/pegasus-rooms"}
          className="text-center border p-2 w-24 rounded-2xl bg-gray-800 text-white"
        >
          <span>Rooms</span>
        </Link>
        <Link
          href={"/account/pegasus-rooms/bookings"}
          className="text-center border p-2 w-24 rounded-2xl bg-gray-800 text-white"
        >
          <span>Bookings</span>
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <div>{children}</div>
      </Suspense>
    </div>
  );
}
