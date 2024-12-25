import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function HostedComp({userId}:{userId:string}) {
  const user = await (await clerkClient()).users.getUser(userId);
  return (
    <div className="flex items-center gap-5  border-b-2 pb-5 border-t-2 pt-5">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={user.imageUrl}
                    alt="image"
                    width={200}
                    height={200}
                    className="h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="font-medium text-lg">Hosted by</h1>
                  <h2 className="font-light capitalize text-base">{user.fullName}</h2>
                </div>
              </div>
  )
}
