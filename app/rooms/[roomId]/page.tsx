import Image from "next/image";
import NavBar from "@/components/navbar";
import { CiHeart, CiWifiOn } from "react-icons/ci";
import { GiAtSea } from "react-icons/gi";
import { TbBeach, TbToolsKitchen3 } from "react-icons/tb";
import { IoCarSportOutline } from "react-icons/io5";
import { PiTelevision } from "react-icons/pi";
import { MdOutlineBalcony } from "react-icons/md";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { Calender } from "@/components/calender";
import CheckForm from "@/components/CheckForm";
import { getRoomById } from "@/lib/functions";
import SaveButton from "@/components/saveButton";
import { createServerComponentClient } from "@/lib/server";
import NavBarBottom from "@/components/navBarBottom";

export type Room = {
  id: number;
  roomName: string;
  country: string;
  city: string;
  price: number;
  guests: number;
  description: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  hostedName: string;
  noBath: number;
  noBed: number;
  noBedroom: number;
};

type PageProps = {
  params: {
    roomId: string;
  };
  searchParams: {
    startDay: string;
    endDay: string;
    nights: number;
  };
};

export default async function Page({ params, searchParams }: PageProps) {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const room: Room = await getRoomById(params.roomId);

  const {
    roomName,
    country,
    city,
    price,
    guests,
    description,
    image1,
    image2,
    image3,
    image4,
    image5,
    hostedName,
    noBath,
    noBed,
    noBedroom,
  } = room;

  return (
    <>
      <div className="hidden md:block">
        <NavBar />
      </div>

      <div className="mx-2 lg:mx-14 p-6 mb-16">
        <div className="flex justify-between mb-10">
          <h1 className="text-2xl font-semibold">{roomName}</h1>
          <span className="flex items-center gap-2 text-lg">
            <SaveButton userId={user?.id} roomId={room.id}>
              <CiHeart size={25} />
            </SaveButton>
            save
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-4 lg:col-span-2 row-span-2 h-[370px] max-w-3xl ">
            <Image
              src={image1}
              alt="room image 1"
              className="rounded-lg h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="hidden lg:block lg:h-44 lg:max-w-sm">
            <Image
              src={image2}
              alt="room image 2"
              className="rounded-lg h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="hidden lg:block lg:h-44 lg:max-w-sm">
            <Image
              src={image3}
              alt="room image 3"
              className="rounded-lg h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="hidden lg:block lg:h-44 lg:max-w-sm">
            <Image
              src={image4}
              alt="room image 4"
              className="rounded-lg h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
          <div className="hidden lg:block lg:h-44 lg:max-w-sm">
            <Image
              src={image5}
              alt="room image 5"
              className="rounded-lg h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="mt-7 border-b-2 pb-7">
          <h1 className="text-lg font-semibold mb-2">
            {city}, {country}
          </h1>
          <span>
            {guests} guests . {noBedroom} bedrooms . {noBed} beds . {noBath}{" "}
            bath
          </span>
        </div>
        <div className="lg:grid lg:grid-cols-5 lg:gap-4 lg:items-center">
          <div className="col-span-3">
            <div className="mt-10 border-b-2 pb-5">
              <h1 className="text-lg font-semibold">
                Hosted by <span className="font-normal">{hostedName}</span>
              </h1>
            </div>
            <div className="mt-10 border-b-2 pb-5 ">
              <p>{description}</p>
            </div>
            <div className="mt-10 border-b-2 pb-7">
              <h1 className="text-2xl font-semibold mb-10">
                What this place offers
              </h1>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center gap-4 pb-4">
                  <GiAtSea size={25} />
                  <span className="text-lg">Sea view</span>
                </div>
                <div className="flex items-center gap-4 pb-4">
                  <TbToolsKitchen3 size={25} />
                  <span className="text-lg">Kitchen</span>
                </div>
                <div className="flex items-center gap-4 pb-4">
                  <IoCarSportOutline size={25} />
                  <span className="text-lg">Free parking</span>
                </div>
                <div className="flex items-center gap-4 pb-4">
                  <PiTelevision size={25} />
                  <span className="text-lg">TV</span>
                </div>
                <div className="flex items-center gap-4 pb-4">
                  <TbBeach size={30} />
                  <span className="text-lg">Shared beach</span>
                </div>
                <div className="flex items-center gap-4 pb-4">
                  <CiWifiOn size={25} />
                  <span className="text-lg">Wifi</span>
                </div>
                <div className="flex items-center gap-4 pb-4">
                  <MdOutlineBalcony size={30} />
                  <span className="text-lg">Private patio or balcony</span>
                </div>
                <div className="flex items-center gap-4 pb-4">
                  <LiaSwimmingPoolSolid size={30} />
                  <span className="text-lg">Private outdoor pool</span>
                </div>
              </div>
            </div>
            <div className="mt-10 pb-5">
              <h1 className="text-2xl font-semibold mb-10">
                Select checkout date
              </h1>
              <div className="flex justify-center">
                <Calender searchParams={searchParams} />
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-10">
            <CheckForm room={room} searchParams={searchParams} />
          </div>
        </div>
        <div className="mt-10 border-t-2 pt-10 pb-5">
          <h1 className="text-2xl font-semibold mb-7">Things to know</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-medium">House rules</h1>
              <span>Check-in after 3:00 PM</span>
              <span>Checkout before 10:00 AM</span>
              <span>6 guests maximum</span>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-medium">Safety & property</h1>
              <span>Carbon monoxide alarm not reported</span>
              <span>Smoke alarm not reported</span>
              <span>Not suitable for infants (under 2 years)</span>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-medium">Cancellation policy</h1>
              <span>
                Add your trip dates to get the cancellation details for this
                stay.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed -bottom-1 w-full md:hidden">
        <NavBarBottom />
      </div>
    </>
  );
}
