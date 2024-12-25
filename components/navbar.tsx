"use client";
import Image from "next/image";
import logo from "@/app/icon.ico";
import AccountBar from "./accountBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();

  const isAuthPage = pathName === "/sign-in" || pathName === "/sign-up";
  const isHomePage = pathName === "/";
  const isOtherPage = !isAuthPage && !isHomePage;

  return (
    <div
      className={`${
        isAuthPage ? "hidden" : "flex justify-between items-center pt-0 pb-4 mx-4 lg:mx-20"
      } ${isHomePage ? "flex justify-center" : ""}`}
    >
      {!isAuthPage && (
        <>
          <Link href={"/"}>
            <div className="flex items-center">
              <Image src={logo} alt="logo" width={70} className="" priority={true} />
              <h1 className="text-2xl font-bold tracking-wide text-[#F5556C] hidden md:block">
                Homely
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-4 lg:gap-10">
            {!isAuthPage && (
              <Link href={"/hosting"}>
                <h3 className="hidden sm:block bg-white border hover:shadow rounded-[50px] p-3">
                  Be a part of{" "}
                  <span className="text-[#F5556C] font-medium">Homely</span>
                </h3>
              </Link>
            )}
            <div className="">
              <AccountBar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}