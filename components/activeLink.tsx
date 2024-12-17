"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({href,children}:any) {
    const pathName = usePathname()   
    const isActive = pathName === href; 
  return (
    <Link href={href} className={`${isActive ? "text-[#F5556C]" : ""}`}>{children}</Link>
  )
}
