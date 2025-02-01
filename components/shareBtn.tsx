"use client"
import { IoMdShare } from "react-icons/io";

export default function ShareBtn({type,...props}:any) {
  const handleShare = async () => {
    let shareData;

    // Share room details
    if (type === "room") {
      shareData = {
        title: `${props.room_name} in ${props.city}, ${props.country}`,
        text: `Check out this ${props.room_category} in ${props.city}, ${props.country}.`,
        url: window.location.href,
      };
      // Share host profile details
    } else if (type === "host") {
      shareData = {
        title: `Meet ${props.host_name}, a host on Homely`,
        text: `Check out ${props.host_name}'s profile and their rooms on Homely.`,
        url: window.location.href,
      };
    } else {
      throw new Error("Invalid share type.");
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };
  return (
    <button onClick={handleShare} className="flex items-center gap-2 ">
              <IoMdShare size={20} />
              <span className="capitalize">share</span>
            </button>
  )
}
