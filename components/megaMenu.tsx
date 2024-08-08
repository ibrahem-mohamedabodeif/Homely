import { signOut } from "@/lib/actions";
import { useUser } from "@/lib/context/authProvider";
import Link from "next/link";

export default function MegaMenu() {
  const user = useUser();
  return (
    <div className="absolute top-14 right-0 flex flex-col items-start gap-4 border p-4 rounded-lg  bg-white z-10">
      <Link href={"/account/reservations"}>Reservations</Link>
      <Link
        href={"/account/wishlist"}
        className=" after:content-[''] after:block after:mt-4 after:w-24 after:h-px after:bg-black"
      >
        Wish list
      </Link>
      <Link href={"/account"}>Account</Link>
      {user ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <Link href={"/signin"}>Sign In</Link>
      )}
    </div>
  );
}
