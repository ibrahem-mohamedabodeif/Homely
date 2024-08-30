"use client";
import { usePathname } from "next/navigation";
import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  const pathName = usePathname();
  return (
    <div
      className={
        pathName === "/signin" || pathName === "/signup"
          ? "max-sm:fixed max-sm:bottom-0 w-full"
          : "max-sm:fixed bottom-0 max-sm:bottom-14 max-sm:mt-10 w-full"
      }
    >
      <div className="flex items-center justify-center p-2 gap-2 bg-gray-800 text-white">
        <FaRegCopyright />
        <span className="text-lg max-sm:text-base">
          2024 Copyrights, PEGASUS Company
        </span>
      </div>
    </div>
  );
}
