"use client";
import Image from "next/image";
import logo from "@/app/icon.ico";
import SearchBar from "./searchBar";
import AccountBar from "./accountBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar({ userData }: any) {
  const pathName = usePathname();

  const isAuthPage = pathName === "/signin" || pathName === "/signup";
  const isHomePage = pathName === "/";
  const isOtherPage = !isAuthPage && !isHomePage;

  return (
    <div
      className={`${
        isAuthPage
          ? "hidden"
          : "flex justify-between items-center pt-3 pb-4 mx-20"
      } ${isHomePage ? "max-sm:flex max-sm:justify-center" : "max-sm:hidden "}`}
    >
      {!isAuthPage && (
        <>
          <Link href={"/"}>
            <div className="flex items-center max-sm:hidden">
              <Image src={logo} alt="logo" width={70} className="" />
              <h1 className="text-2xl font-bold tracking-wide text-[#F5556C]">
                Homely
              </h1>
            </div>
          </Link>

          {/* {isHomePage && (
            <div className="flex justify-center w-auto min-w-80 max-w-96">
              <SearchBar />
            </div>
          )} */}

          <div className="flex items-center gap-10">
            {!isAuthPage && (
              <Link href={"/hosting"}>
                <h3 className="max-sm:hidden bg-white border hover:shadow rounded-[50px] p-3  ">
                  Be a part of{" "}
                  <span className="text-[#F5556C] font-medium">Homely</span>
                </h3>
              </Link>
            )}
            <div className="max-sm:hidden">
              <AccountBar userData={userData || null} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
