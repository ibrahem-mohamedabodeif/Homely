// import Loader from "@/app/loading";
// import BackBtn from "@/components/backBtn";
// import BecomeahostForm from "@/components/becomeahostForm";
// import NavBar from "@/components/navbar";
// import { getUserData } from "@/lib/actions";
// import { getRoomById } from "@/lib/functions";
// import { createServerComponentClient } from "@/lib/server";
// import { redirect } from "next/navigation";
// import { Suspense } from "react";

// export default async function Page({ searchParams }: any) {
 
//   const userData = await getUserData();

//   if (!userData) redirect("/signin");

//   const roomId: string | undefined = searchParams.edite;
//   const roomEdite = roomId ? await getRoomById(roomId) : null;

//   return (
//     <>
//       <NavBar userData={userData} />
//       <div className="mt-5 mx-20 max-sm:mx-4 mb-20">
//         <div className="pb-10">
//           <div className="flex items-center gap-4 pb-4">
//             <BackBtn />
//             <h1 className="text-2xl tracking-wide font-semibold capitalize">
//               Welcom, {userData.user_name.split(" ")[0]}
//             </h1>
//           </div>
//           <div className=" mx-10 flex justify-between">
//             <h3 className="text-lg font-light ">
//               Are you ready to become a host ?
//             </h3>
//           </div>
//         </div>
//         <Suspense fallback={<Loader />}>
//           <BecomeahostForm userData={userData} room={roomEdite} />
//         </Suspense>
//       </div>
//     </>
//   );
// }
