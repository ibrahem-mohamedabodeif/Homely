import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function HostInfo({ userId }: { userId: string }) {
  const user = await (await clerkClient()).users.getUser(userId);

  return (
    <div  id="meet-your-host">
      <h1 className="text-2xl font-medium mb-10"> Meet your Host</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 justify-between items-start">
        <div>
          <div className="col-span-1 flex flex-col items-center border border-transparent p-10 rounded-3xl shadow-2xl">
            <div className="relative w-36 h-36 rounded-full overflow-hidden">
              <Image
                src={user.imageUrl}
                alt="image"
                fill={true}
                className="h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xl font-medium pt-5 capitalize">
              {user.firstName}
            </span>
          </div>
          <div className="flex justify-center py-5">
            
          </div>
        </div>
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <h1 className="capitalize text-2xl font-medium pb-10">
            {user.fullName}
          </h1>
          <p className="text-lg font-light leading-relaxed">
            {user.publicMetadata.about as string}
          </p>
          <div className="flex items-center pt-10 gap-5">
          <Link href={`/host/${userId}`}>
          <button
              className="w-28 bg-black text-base text-white font-medium tracking-wider p-3 rounded-full"
              type="button"
            >
              Profile
            </button>
            </Link>
          <button
              className="w-48 bg-[#F5556C] text-base text-white font-medium tracking-wider p-3 rounded-full"
              type="button"
            >
              Message host
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
