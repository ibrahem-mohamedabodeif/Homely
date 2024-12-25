import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function HostInfo({ userId }:{userId:string}) {
  const user = await (await clerkClient()).users.getUser(userId);

  return (
    <div>
      <h1 className="text-2xl font-medium mb-10"> Meet your Host</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-20 justify-between items-start">
        <div className="col-span-1 md:col-span-2 flex flex-col items-center border border-transparent p-10 rounded-3xl shadow-2xl">
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
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <h1 className="capitalize text-2xl font-medium pb-10">
            {user.fullName}
          </h1>
          <p className="text-lg font-light leading-relaxed">
            {user.publicMetadata.about as string}
          </p>
          <div>
            <h4 className="text-base font-light capitalize pb-2 pt-10">
              My work : {user.publicMetadata.work as string}
            </h4>
            <h4 className="text-base font-light capitalize pb-2">
              Hobbies : {user.publicMetadata.hobbies as string}
            </h4>
            <h4 className="text-base font-light capitalize">
              Languages : {user.publicMetadata.languages as string}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
