import AccountMegaMenu from "@/components/accountMegaMenu";
import EditeBtn from "@/components/editeBtn";
import { currentUser } from "@clerk/nextjs/server";
import { CiCalendar, CiMail } from "react-icons/ci";
import {  MdLocalPhone } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";

export default async function Page() {
const user = await currentUser()


  return (
    <div>
      <div>
        <div className="flex justify-between items-center pb-5">
          <div className="flex items-center gap-2">
            <AccountMegaMenu/>
          <h1 className="text-xl md:text-2xl text-[#F5556C] font-medium">
            Personal Information
          </h1>
          </div>
          <EditeBtn/>
        </div>
        <p className="text-lg md:text-xl font-extralight">
          Manage your personal information ,including phone numbers and email
          address where you can be contacted
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-10">
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium">Name</span>
            <RiAccountCircleLine size={25} />
          </div>
          <span className="text-lg font-extralight capitalize">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Phone Number</span>
            <MdLocalPhone size={25} />
          </div>
          <span className="text-lg font-extralight">
            {user?.publicMetadata?.phoneNumber
              ? user.publicMetadata.phoneNumber as string
              : "Add your phone number"}
          </span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg overflow-clip">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Contactable at</span>
            <CiMail size={25} />
          </div>
          <span className="text-base font-extralight">{user?.primaryEmailAddress?.emailAddress}</span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Date of Birth</span>
            <CiCalendar size={25} />
          </div>
          <span className="text-lg font-extralight">
            {user?.publicMetadata?.dateOfBirth
              ? String(user.publicMetadata.dateOfBirth)
              : "Add your date of birth"}
          </span>
        </div>
      </div>
    </div>
  );
}
