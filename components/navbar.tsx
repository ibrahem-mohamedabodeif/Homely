"use client";
import Image from "next/image";
import logo from "@/app/icon.ico";
import SearchBar from "./searchBar";
import AccountBar from "./accountBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar({ user }: any) {
  const pathName = usePathname();

  const isAuthPage = pathName === "/signin" || pathName === "/signup";
  const isHomePage = pathName === "/";
  const isOtherPage = !isAuthPage && !isHomePage;

  return (
    <div
      className={`${
        isAuthPage
          ? "hidden"
          : "flex justify-between items-center mx-5 mt-3 pb-4 border-b-2"
      } ${isHomePage ? "max-sm:flex max-sm:justify-center" : "max-sm:hidden"}`}
    >
      {!isAuthPage && (
        <>
          <Link href={"/"} className="flex items-center gap-2 max-sm:hidden">
            <Image src={logo} alt="logo" width={77} className="" />
          </Link>

          {isHomePage && (
            <div className="flex justify-center w-auto min-w-80 max-w-96">
              <SearchBar />
            </div>
          )}

          <div className="flex items-center gap-10">
            {!isAuthPage && isOtherPage && (
              <Link
                href={"/hosting"}
                className="max-sm:hidden hover:border p-3 hover:bg-gray-800 hover:text-white hover:rounded-full"
              >
                PEGASUS Your Home
              </Link>
            )}
            <div className="max-sm:hidden">
              <AccountBar user={user} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
