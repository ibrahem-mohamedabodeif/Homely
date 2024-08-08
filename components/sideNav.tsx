import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { MdManageAccounts, MdOutlineAirplaneTicket } from "react-icons/md";

export default function SideNav() {
  return (
    <div className="fixed h-screen mx-10 pt-10 max-sm:mx-4 md:mx-4 flex flex-col items-start gap-20 ">
      <Link href={"/account"} className="flex items-center gap-5">
        <MdManageAccounts size={27} />
        <span className="hidden lg:block lg:text-xl lg:font-semibold ">
          Account
        </span>
      </Link>
      <Link href={"/account/reservations"} className="flex items-center  gap-5">
        <MdOutlineAirplaneTicket size={27} />
        <span className="hidden lg:block lg:text-xl lg:font-semibold">
          Reservations
        </span>
      </Link>
      <Link href={"/account/wishlist"} className="flex items-center  gap-5">
        <BsStars size={27} />
        <span className="hidden lg:block lg:text-xl lg:font-semibold">
          Wish List
        </span>
      </Link>
    </div>
  );
}
