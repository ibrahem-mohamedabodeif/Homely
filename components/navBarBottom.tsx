// "use client";
// import Image from "next/image";
// import { BsFillDoorClosedFill, BsFillDoorOpenFill } from "react-icons/bs";
// import { MdManageAccounts, MdOutlineAirplaneTicket } from "react-icons/md";
// import logo from "@/app/icon.ico";
// import Link from "next/link";
// import { signOut } from "@/lib/actions";
// import { FaHouseChimneyMedical } from "react-icons/fa6";
// import { usePathname } from "next/navigation";

// export default function NavBarBottom({ user }: any) {
//   const pathName = usePathname();
//   return (
//     <div
//       className={
//         pathName === "/signin" || pathName === "/signup"
//           ? "hidden"
//           : "flex justify-around items-center gap-4 pb-2 pt-1 border-t-2 bg-white"
//       }
//     >
//       <Link href={"/hosting"} className="flex items-center  gap-5">
//         <FaHouseChimneyMedical size={24} />
//       </Link>
//       <Link href={"/account/reservations"} className="flex items-center  gap-5">
//         <MdOutlineAirplaneTicket size={27} />
//       </Link>
//       <Link href={"/"}>
//         <Image src={logo} alt="logo" width={50} />
//       </Link>
//       {user ? (
//         <button onClick={() => signOut()}>
//           <BsFillDoorClosedFill size={27} />
//         </button>
//       ) : (
//         <Link href={"/signin"}>
//           <BsFillDoorOpenFill size={27} />
//         </Link>
//       )}

//       <Link href={"/account"} className="flex items-center gap-5">
//         <MdManageAccounts size={27} />
//       </Link>
//     </div>
//   );
// }
