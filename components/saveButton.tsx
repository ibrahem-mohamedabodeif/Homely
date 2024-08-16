"use client";

import { useUser } from "@/lib/context/authProvider";
import { addWishRoom } from "@/lib/functions";
import toast from "react-hot-toast";

export default function SaveButton({ roomId, children }: any) {
  const user: any = useUser();

  const handleClick = async () => {
    if (!user) {
      toast.error("Should sign in first");
      return;
    }

    try {
      const result: any = await addWishRoom(roomId, user.id);
      if (result?.message) {
        toast.error(result.message);
      } else {
        toast.success("Added to Wishlist");
      }
    } catch (error: any) {
      toast.error(`Failed to add to wishlist`);
    }
  };

  return <button onClick={handleClick}>{children}</button>;
}
