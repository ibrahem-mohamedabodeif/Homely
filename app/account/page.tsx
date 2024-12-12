import EditeBtn from "@/components/editeBtn";
import { getUserData } from "@/lib/functions";
import { createServerComponentClient } from "@/lib/server";
import { CiCalendar, CiMail } from "react-icons/ci";
import { MdEdit, MdLocalPhone } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";

export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = await getUserData(user?.id);

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl text-[#F5556C] font-medium pb-5">
            Personal Information
          </h1>
          <EditeBtn userData={userData}/>
        </div>
        <p className="text-xl font-extralight">
          Manage your personal information ,including phone numbers and email
          address where you can be contacted
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-10">
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium">Name</span>
            <RiAccountCircleLine size={25} />
          </div>
          <span className="text-lg font-extralight capitalize">
            {userData.user_name}
          </span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Phone Number</span>
            <MdLocalPhone size={25} />
          </div>
          <span className="text-lg font-extralight">
            {userData.user_phone
              ? userData.user_phone
              : "Add your phone number"}
          </span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Contactable at</span>
            <CiMail size={25} />
          </div>
          <span className="text-lg font-extralight">{userData.user_email}</span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Date of Birth</span>
            <CiCalendar size={25} />
          </div>
          <span className="text-lg font-extralight">
            {userData.user_birthDate
              ? userData.user_birthDate
              : "Add your date of birth"}
          </span>
        </div>
      </div>
    </div>
  );
}
