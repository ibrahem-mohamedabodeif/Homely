import Loading from "@/app/loading";
import BackBtn from "@/components/backBtn";
import CardItem from "@/components/CardItem";
import ShareBtn from "@/components/shareBtn";
import { getHomelyRooms, getHostingNumber } from "@/lib/functions";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CiHome, CiLocationOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { HiMiniLanguage } from "react-icons/hi2";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdPeopleOutline, MdWorkOutline } from "react-icons/md";

export default async function page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const user = await (await clerkClient()).users.getUser(userId);

  const hostRooms = await getHomelyRooms(userId);

  const hostingNum = await getHostingNumber(userId);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start gap-10 md:gap-20 mt-5 border-b pb-10">
        {/* image and numbers */}
        <BackBtn/>
        <div className="flex flex-col items-center justify-center w-full md:w-auto max-sm:border-b max-sm:pb-5">
          <div className=" flex flex-col items-center border border-transparent p-10 rounded-3xl shadow-2xl">
            <div className="relative w-36 h-36 rounded-full overflow-hidden">
              <Image
                src={user.imageUrl}
                alt="image"
                fill={true}
                className="h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="w-full px-2">
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-xl flex items-center gap-2 tracking-wider">
                <CiHome size={25} />
                Places
              </h1>
              <span className="text-xl font-light">{hostRooms.length}</span>
            </div>
            <div className="flex items-center justify-between gap-5 mt-10">
              <h1 className="text-xl flex items-center gap-2 tracking-wider">
                <MdPeopleOutline size={25} />
                Hosting
              </h1>
              <span className="text-xl font-light">{hostingNum?.length}</span>
            </div>
          </div>
        </div>
        {/* about and buttons */}
        <Suspense fallback={<Loading />}>
          <div className="w-full">
            <div className="flex md:justify-between flex-col md:flex-row gap-5 justify-center">
              <h1 className="text-3xl capitalize">
                About <span className="text-[#f5556c]">{user.fullName}</span>
              </h1>
              <div className="flex items-center max-sm:justify-center gap-5">
                <button
                  className="w-auto bg-[#F5556C] text-base text-white font-medium tracking-wider p-3 rounded-full"
                  type="button"
                >
                  Message host
                </button>
                <div className="w-auto bg-black text-white text-base p-3 rounded-full">
                  <ShareBtn type={"host"} hostname={user.firstName} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
              <div className="flex items-center gap-2 text-xl font-light">
                <MdWorkOutline size={20} />
                My work : {user.publicMetadata.work as string}
              </div>
              <div className="flex items-center gap-2 text-xl font-light">
                <LiaBirthdayCakeSolid size={25} />
                Born in : {user.publicMetadata.dateOfBirth as string}
              </div>
              <div className="flex items-center gap-2 text-xl font-light">
                <FaRegHeart size={20} />
                Hobbies: {user.publicMetadata.hobbies as string}
              </div>
              <div className="flex items-center gap-2 text-xl font-light">
                <HiMiniLanguage size={25} />
                Speaks {user.publicMetadata.languages as string}
              </div>
              <div className="flex items-center gap-2 text-xl font-light">
                <CiLocationOn size={25} />
                Lives in {user.publicMetadata.address as string}
              </div>
            </div>
            <div className="mt-10">
              <p className="text-xl font-light tracking-wide leading-relaxed">
                {user.publicMetadata.about as string}
              </p>
            </div>
          </div>
        </Suspense>
      </div>
      {/* places */}
      <Suspense fallback={<Loading />}>
        <div className="mt-10">
          <h1 className="text-3xl text-center">
            <span className="text-[#f5556c] capitalize">{user.firstName}</span>
            {"'"}s places
          </h1>
          <div className="mb-20 mx-5 md:mx-5 max-sm:mb-32 grid justify-center grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-5 my-5">
            {hostRooms?.map((room) => (
              <Link href={`/${room.id}`} key={room.id}>
                <CardItem room={room} />
              </Link>
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
