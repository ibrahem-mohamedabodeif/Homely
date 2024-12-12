"use client";
import { updateUserInfo } from "@/lib/actions";
import { useFormState } from "react-dom";
import { CiCalendar, CiMail } from "react-icons/ci";
import { MdLocalPhone } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";

export default function PersonalInfoEdite({onClose, userData}:{onClose:()=>void, userData:any}) {
  const [error, formAction] = useFormState(async (previousState: any, formData: FormData) => {
    await updateUserInfo(previousState, formData);
    onClose()
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
                name="user_name"
                placeholder="name"
                defaultValue={userData.user_name}
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
                name="phone_number"
                placeholder="Add your phone number"
                defaultValue={userData.user_phone}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
            {/* Email input */}
            <div className="border border-[#6e6e6e] p-3 rounded-lg">
              <div className="pb-2 flex justify-between items-center">
                <span className="text-base font-normal"> E-mail</span>
                <CiMail size={25} />
              </div>
              <span className="text-base font-extralight">{userData.user_email}</span>
            </div>
            {/* Date of Birth input */}
            <div className="border border-[#6e6e6e] p-3 rounded-lg">
              <div className="pb-2 flex justify-between items-center">
                <span className="text-base font-normal"> Date of Birth</span>
                <CiCalendar size={25} />
              </div>
              <input
                type="date"
                name="date_of_birth"
                defaultValue={userData.user_birthDate}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-10 mx-2">
            <button onClick={onClose} className="text-base">Cancel</button>
            <button type="submit" className="text-base border rounded-full pt-2 pb-2 pl-5 pr-5 bg-[#1D201F] text-white">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
