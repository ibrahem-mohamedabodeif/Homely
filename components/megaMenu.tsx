import { signOut } from "@/lib/actions";
import Link from "next/link";

export default function MegaMenu({ user }: any) {
  return (
    <div className="absolute right-0 flex flex-col items-start gap-4 border p-4 rounded-lg  bg-white shadow-xl z-10">
      <Link href={"/trips"}>Trips</Link>
      <Link
        href={"/wishlist"}
        className=" after:content-[''] after:block after:mt-4 after:w-24 after:h-px after:bg-black"
      >
        Wish list
      </Link>
      {/* <Link
        href={"/homely-rooms"}
        className=" after:content-[''] after:block after:mt-4 after:w-24 after:h-px after:bg-black"
      >
        Rooms
      </Link> */}
      <Link href={"/account"}>Account</Link>
      {user ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <Link href={"/signin"}>Sign In</Link>
      )}
    </div>
  );
}
