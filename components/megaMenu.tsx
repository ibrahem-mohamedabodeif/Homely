import { signOut } from "@/lib/actions";
import Link from "next/link";
import ActiveLink from "./activeLink";

export default function MegaMenu({ userData }: any) {
  return (
    <div className="absolute right-0 flex flex-col items-start gap-4 border p-4 rounded-lg  bg-white shadow-xl z-10">
      <ActiveLink href={"/trips"}>
        <span>Trips</span>
      </ActiveLink>
      <ActiveLink href={"/wishlist"}>
        {" "}
        <span>Wish list</span>
      </ActiveLink>
      <ActiveLink href={"/account"}>
        <span className=" after:content-[''] after:block after:mt-4 after:w-24 after:h-px after:bg-black">
          Account
        </span>
      </ActiveLink>
      {userData ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <Link href={"/signin"}>Sign In</Link>
      )}
    </div>
  );
}
