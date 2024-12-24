// "use client";
// import { addWishRoom } from "@/lib/functions";
// import toast from "react-hot-toast";

// export default function SaveButton({ roomId, children, userData }: any) {
//   const handleClick = async () => {
//     if (!userData) {
//       toast.error("Should sign in first");
//       return;
//     }

//     try {
//       const result: any = await addWishRoom(roomId, userData.user_id);
//       if (result?.message) {
//         toast.error(result.message);
//       } else {
//         toast.success("Added to Wishlist");
//       }
//     } catch (error: any) {
//       toast.error(`Failed to add to wishlist`);
//     }
//   };

//   return <button onClick={handleClick}>{children}</button>;
// }
