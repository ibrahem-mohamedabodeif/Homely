"use client";
import Image from "next/image";
import logo from "@/app/icon.ico";
import SearchBar from "./searchBar";
import AccountBar from "./accountBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const revalidate = 0;
export default function NavBar() {
  const pathName = usePathname();
  return (
    <div className="flex max-sm:justify-center mx-5 mt-3 pb-4 border-b-2 justify-between items-center">
      <Link href={"/"} className="flex items-center gap-2 max-sm:hidden ">
        <Image src={logo} alt="logo" width={77} className="" />
      </Link>
      <div>
        {pathName === "/" ? (
          <div className=" flex justify-center w-auto min-w-80 max-w-96">
            <SearchBar />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="max-sm:hidden">
        <AccountBar />
      </div>
    </div>
  );
}
