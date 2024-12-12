"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import PersonalInfoEdite from "./personalInfoEdite";
import AboutInfoEdite from "./aboutInfoEdite";

export default function EditeBtn({userData}:any) {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        <MdEdit size={25} />
      </button>
      {open && (
        <>
          {pathName === "/account" ? (
            <PersonalInfoEdite onClose={handleClose} userData={userData}/>
          ) : pathName === "/account/about-you" ? (
            <AboutInfoEdite onClose={handleClose} userData={userData}/>
          ) : null}
        </>
      )}
    </>
  );
}
