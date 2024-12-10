import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";
import { CiCalendar, CiMail } from "react-icons/ci";
import { MdEdit, MdLocalPhone } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";

export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl text-[#F5556C] font-medium pb-5"> Personal Information</h1>
          <MdEdit size={25} />
        </div>
        <p className="text-xl font-extralight">
          {" "}
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
            {user?.user_metadata.name}
          </span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Phone Number</span>
            <MdLocalPhone size={25} />
          </div>
          <span className="text-lg font-extralight">
            {" "}
            {user?.user_metadata.phone}
          </span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Contactable at</span>
            <CiMail size={25} />
          </div>
          <span className="text-lg font-extralight">
            {user?.user_metadata.email}
          </span>
        </div>
        <div className="border border-[#6e6e6e] p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <span className="text-lg font-medium"> Date of Birth</span>
            <CiCalendar size={25} />
          </div>
          <span className="text-lg font-extralight"> 01 sept 1999</span>
        </div>
      </div>
    </div>
  );
}
