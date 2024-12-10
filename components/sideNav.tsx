import Image from "next/image";
import Link from "next/link";

export default function SideNav() {
  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-40 h-48 overflow-hidden">
          <Image src={"/icon.ico"} fill alt="image"/>
        </div>
        <span className="text-xl">Ibrahem Mohamed</span>
      </div>
      <Link href={"/account"}>
        <span className="text-lg font-light">Personal Information</span>
      </Link>
      <Link href={"/account/about-you"}>
        <span className="text-lg font-light">About You</span>
      </Link>
      <Link href={"/account/pegasus-rooms"}>
        <span className="text-lg font-light">Your Homely Rooms</span>
      </Link>
    </div>
  );
}
