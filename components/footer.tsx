"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaRegCopyright } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

export default function Footer() {
  const pathName = usePathname();
  return (
    <div
      className={
        pathName === "/sign-in" || pathName === "/sign-up"
          ? "max-sm:relative max-sm:bottom-0 w-full h-full"
          : "relative bottom-0  w-full"
      }
    >
      <div className="px-5 md:px-20 flex items-center flex-col md:flex-row justify-center md:justify-between p-2 gap-5 border-t py-3 border-[#999898] bg-white text-white">
      <div className="relative w-8 h-8 hidden md:block">
        <Image src={"/my logo.png"} alt="logo" width={150} height={150} className="h-full object-cover"/>
        </div>
        <span className="text-lg max-sm:text-base text-black font-light tracking-wide text-center ">
          Designed and Developed by <span className="text-[#F5556C]">Ibrahem Mohamed</span>
        </span>
        <div className="flex items-center gap-5">
        <a href="mailto:ibrahem.mohamed191999@gmail.com" aria-label="Email">
            <MdAttachEmail size={22} className="text-black"/>
          </a>
          <a
            href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={22} className="text-black"/>
          </a>
          <a
            href="https://portfolio-lemon-nine-56.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="portfolio"
          >
        <div className="relative w-6 h-6">
        <Image src={"/my logo.png"} alt="logo" width={150} height={150} className="h-full object-cover"/>
        </div>
        </a>
        </div>
      </div>
    </div>
  );
}
