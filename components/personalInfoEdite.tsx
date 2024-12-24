"use client";
import { useUser } from "@clerk/nextjs";
import { useActionState } from "react";
import { updateUserInfo } from "@/lib/actions";
import { CiCalendar, CiMail } from "react-icons/ci";
import { MdLocalPhone } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";

export default function PersonalInfoEdite({onClose}:{onClose:()=>void}) {
  const {user} = useUser(); 
  const handleClose = () => {
    onClose();
  } 
  const [error, formAction] = useActionState(async (previousState: any, formData: FormData) => {
    try{
    await updateUserInfo(previousState, formData);
    handleClose()}catch(e){
      return {message:"An error occured, please try again"}
    }
  }, null);

  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
      <div className="w-[600px] h-fit overflow-y-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 fixed p-5 bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl text-center text-[#F5556C] font-medium border-b border-[#6e6e6e] pb-4">
            Personal Information
          </h1>
        <h4 className="text-lg font-extralight pt-5">
          Manage and edite your personal information
        </h4>
        </div>
        <form action={formAction}>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5 mt-8">
            {/* Name input */}
            <div className="border border-[#6e6e6e] p-3 rounded-lg">
              <div className="pb-2 flex justify-between items-center">
                <span className="text-base font-normal">Name</span>
                <RiAccountCircleLine size={25} />
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                defaultValue={user?.firstName || ""}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
            <div className="border border-[#6e6e6e] p-3 rounded-lg">
              <div className="pb-2 flex justify-between items-center">
                <span className="text-base font-normal">Name</span>
                <RiAccountCircleLine size={25} />
              </div>
              <input
                type="text"
                name="lastName"
                placeholder="last Name"
                defaultValue={user?.lastName || ""}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
            {/* Phone Number input */}
            <div className="border border-[#6e6e6e] p-3 rounded-lg">
              <div className="pb-2 flex justify-between items-center">
                <span className="text-base font-normal"> Phone Number</span>
                <MdLocalPhone size={25} />
              </div>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Add your phone number"
                defaultValue={user?.publicMetadata?.phoneNumber as string || ""}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
            {/* Date of Birth input */}
            <div className="border border-[#6e6e6e] p-3 rounded-lg">
              <div className="pb-2 flex justify-between items-center">
                <span className="text-base font-normal"> Date of Birth</span>
                <CiCalendar size={25} />
              </div>
              <input
                type="date"
                name="birthDate"
                defaultValue={ user?.publicMetadata?.dateOfBirth as string}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
            {/* Email input */}
            <div className="col-span-2 border border-[#6e6e6e] p-3 rounded-lg">
              <div className="pb-2 flex justify-between items-center">
                <span className="text-base font-normal"> E-mail</span>
                <CiMail size={25} />
              </div>
              <span className="text-base font-extralight">{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>}
          {/* Buttons */}
          <div className="flex justify-between mt-10 mx-2">
            <button onClick={handleClose} className="text-base">Cancel</button>
            <button type="submit" className="text-base border rounded-full pt-2 pb-2 pl-5 pr-5 bg-[#1D201F] text-white">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
