import Loader from "@/app/loader";
import Link from "next/link";
import { Suspense } from "react";
import { IoAdd } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl text-[#F5556C] font-medium pb-5"> Your Homely Rooms
          </h1>
          <IoAdd
 size={30} />
        </div>
        <p className="text-xl font-extralight">
        You can add your rooms and manage it and bookings
        </p>
      </div>
    
    <div className="flex flex-col gap-y-10">
      <div className="flex items-center gap-5 pt-10">
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
    </div>
  );
}
