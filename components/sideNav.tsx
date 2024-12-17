"use client";

import Image from "next/image";
import { IoCameraOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { addUserImage } from "@/lib/functions";
import ActiveLink from "./activeLink";

export default function SideNav({ userData }: any) {
  const [imagePreview, setImagePreview] = useState<string>(
    userData?.user_image || "/user.png"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
  
      try {
        console.log("Uploading file:", file);
        const updatedImageUrl = await addUserImage(userData.user_id, file);
        console.log("Updated Image URL:", updatedImageUrl);
        setImagePreview(updatedImageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <div className="relative w-32 h-32 overflow-hidden bg-white rounded-full mt-5">
            <Image src={imagePreview} alt="Profile image" fill />
          </div>
          <button
            onClick={handleButtonClick}
            className="absolute bottom-2 right-2 p-2 bg-gray-200 rounded-full"
            aria-label="Upload profile image"
          >
            <IoCameraOutline size={25} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <span className="text-xl font-light capitalize mt-10">
          {userData?.user_name?.split(" ").slice(0, 2).join(" ")}
        </span>
      </div>
      <ActiveLink href="/account">
        <span className="text-lg font-light">Personal Information</span>
      </ActiveLink>
      <ActiveLink href="/account/about-you">
        <span className="text-lg font-light">About You</span>
      </ActiveLink>
      <div className="flex flex-col gap-2">
      <ActiveLink href="/account/homely-rooms">

      <span className="text-lg font-light">Your Homely Rooms</span>
      </ActiveLink>
      <div className="flex flex-col gap-2 pl-3">
        <ActiveLink href="/account/homely-rooms">
          <span className="text-lg font-light">Rooms</span>
        </ActiveLink>
        <ActiveLink href="/account/homely-rooms/bookings">
          <span className="text-lg font-light">Bookings</span>
        </ActiveLink>
        </div>
      </div>
    </div>
  );
}
