"use client";

import { addWishRoom } from "@/lib/functions";
import toast from "react-hot-toast";

export default function SaveButton({ roomId, userId, children }) {
  const handleClick = () => {
    try {
      addWishRoom(roomId, userId);
      toast.success("Add to Wish list");
    } catch (error) {
      toast.error("Failed to add it ");
    }
  };

  return <button onClick={handleClick}>{children}</button>;
}
