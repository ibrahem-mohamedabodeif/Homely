"use client"
import { GoShare } from "react-icons/go";

export default function ShareBtn({...props}:any) {
    const handleShare = async () => {
            if (navigator.share) {
              try {
                await navigator.share({
                  title: `${props.room_name} in ${props.city}, ${props.country}`,
                  text: `Check out this ${props.room_category} in ${props.city}, ${props.country}.`,
                  url: window.location.href,
                });
                console.log("Share successful");
              } catch (error) {
                console.error("Error sharing:", error);
              }
            } else {
              console.error("Web Share API is not supported in this browser.");
            }
          };
  return (
    <button onClick={handleShare} className="flex items-center gap-2 ">
              <GoShare size={22} />
              <span className="capitalize text-lg">share</span>
            </button>
  )
}
