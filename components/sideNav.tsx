"use client";

import Image from "next/image";
import { IoCameraOutline } from "react-icons/io5";
import { useRef, useState, useEffect } from "react";
import ActiveLink from "./activeLink";
import { useUser } from "@clerk/nextjs";

export default function SideNav() {
  const [imagePreview, setImagePreview] = useState<string>("/user.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.imageUrl) {
      setImagePreview(user.imageUrl);
    }
  }, [user, isLoaded]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        await user?.setProfileImage({ file });
        // The user object should automatically refresh after updating the profile image
        if (user?.imageUrl) {
          setImagePreview(user.imageUrl); // This line is for extra safety
        }
      } catch (error) {
        alert("Failed to update profile image. Please try again.");
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  if (!isLoaded || !user) return null;

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <div className="relative w-32 h-32 overflow-hidden bg-white rounded-full md:mt-5">
            <Image src={imagePreview} alt="Profile image" fill sizes="100" />
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
        <span className="md:text-xl md:font-light md:capitalize md:mt-10 hidden md:block">
          {user?.username || user?.firstName || "User"}
        </span>
      </div>
      <div className="hidden md:flex md:flex-col md:gap-4">
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
    </div>
  );
}
