// "use client";
// import { useActionState } from "react";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// // import { createUser } from "@/lib/actions";

// export default function SignupForm() {
//   const searchParams: any = useSearchParams();
//   // const [error, formAction] = useActionState(createUser, null);

//   return (
//     <div>
//       <form  className="space-y-4">
//         <input type="hidden" name="searchParams" value={searchParams} />

//         <div>
//           <label className="block text-sm font-medium leading-6 text-gray-900">
//             Full Name
//           </label>
//           <div className="mt-2">
//             <input
//               name="name"
//               type="text"
//               required
//               autoComplete="name"
//               className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium leading-6 text-gray-900">
//             Email address
//           </label>
//           <div className="mt-2">
//             <input
//               name="email"
//               type="email"
//               required
//               autoComplete="email"
//               className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>

//         <div>
//           <div className="flex ">
//             <label className="block text-sm font-medium leading-6 text-gray-900">
//               Password
//             </label>
//           </div>
//           <div className="mt-2 mb-7">
//             <input
//               name="password"
//               type="password"
//               required
//               className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//             />
//           </div>
//         </div>
//         {/* {error && (
//           <span className="text-red-500 flex justify-center">{error}</span>
//         )} */}
//         <div>
//           <button
//             type="submit"
//             className="mt-8 flex w-full justify-center rounded-md bg-[#F5556C] hover:bg-[#e63b4c] px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm"
//           >
//             Sign up
//           </button>
//         </div>
//       </form>
//       <p className="mt-10 text-center text-md text-gray-500">
//         Have an account?{" "}
//         <Link
//           href={
//             searchParams
//               ? `/signin?${new URLSearchParams(searchParams).toString()}`
//               : "/signin"
//           }
//           className="text-lg font-semibold leading-6 hover:text-[#e63b4c] text-[#F5556C]"
//         >
//           Sign in
//         </Link>
//       </p>
//     </div>
//   );
// }
