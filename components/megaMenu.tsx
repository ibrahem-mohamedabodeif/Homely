import ActiveLink from "./activeLink";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";

export default function MegaMenu({
  onClose,
}: {
  onClose: () => void;
}) {

  return (
    <div className="absolute right-0 flex flex-col items-start gap-4 border p-4 rounded-lg  bg-white shadow-xl z-10">
      <ActiveLink href={"/trips"}>
        <button onClick={onClose}>Trips</button>
      </ActiveLink>
      <ActiveLink href={"/wishlist"}>
        <button onClick={onClose}>Wish list</button>
      </ActiveLink>
      <ActiveLink href={"/account"}>
        <button
          onClick={onClose}
          className=" after:content-[''] after:block after:mt-4 after:w-24 after:h-px after:bg-black text-left"
        >
          Account
        </button>
      </ActiveLink>
      <SignedIn>
        <SignOutButton>Log out</SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton>Sign in</SignInButton>
      </SignedOut>
   
    </div>
  );
}
