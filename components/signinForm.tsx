// "use client";
// import { useActionState } from "react";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// // import { signInAction } from "@/lib/actions";

// export default function SigninForm() {
//   const searchParams: any = useSearchParams();

//   // const [error, formAction] = useActionState(signInAction, null);
//   return (
//     <div>
//       <form  className="space-y-4">
//         <input type="hidden" name="searchParams" value={searchParams} />
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium leading-6 text-gray-900"
//           >
//             Email address
//           </label>
//           <div className="mt-2">
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               autoComplete="email"
//               className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center justify-between">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Password
//             </label>
//           </div>
//           <div className="mt-2">
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               autoComplete="current-password"
//               className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         {/* {error && (
//           <span className="text-red-500 flex justify-center">{error.message}</span>
//         )} */}
//         <div>
//           <button
//             type="submit"
//             className="mt-8 flex w-full justify-center rounded-md bg-[#F5556C] hover:bg-[#e63b4c] px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm"
//           >
//             Sign in
//           </button>
//         </div>
//       </form>

//       <p className="mt-10 text-center text-md text-gray-500">
//         Not a member?{" "}
//         <Link
//           href={
//             searchParams
//               ? `/signup?${new URLSearchParams(searchParams).toString()}`
//               : "/signup"
//           }
//           className="text-lg font-semibold leading-6 hover:text-[#e63b4c] text-[#F5556C]"
//         >
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// }
