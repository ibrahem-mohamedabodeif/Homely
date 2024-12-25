import AccountMegaMenu from "@/components/accountMegaMenu";
import EditeBtn from "@/components/editeBtn";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
 const user = await currentUser()
 
  return (
    <div>
      <div>
        <div className="flex justify-between items-center pb-5">
                  <div className="flex items-center gap-2">
                    <AccountMegaMenu/>
                  <h1 className="text-2xl md:text-2xl text-[#F5556C] font-medium">
                    About you
                  </h1>
                  </div>
          <EditeBtn/>
        </div>
        <p className="text-lg md:text-xl font-extralight">
          Help other guests and Hosts get to know you
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-10">
        <div className="col-span-1 md:col-span-2 flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5  text-lg font-medium"> About</span>
          <span className="text-lg font-extralight capitalize">
            {user?.publicMetadata.about ? String(user.publicMetadata.about) : "Tell guests and hosts about you"}
          </span>
        </div>
        <div className="flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5 text-lg font-medium"> My Work</span>
          <span className="text-lg font-extralight capitalize">
            {user?.publicMetadata.work ? String(user.publicMetadata.work) : "Add your work"}
          </span>
        </div>
        <div className="flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5 text-lg font-medium">Languages</span>
          <span className="text-lg font-extralight"> {user?.publicMetadata.languages ? String(user.publicMetadata.languages) : "Add Languages"}</span>
        </div>
        <div className="flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5 text-lg font-medium"> Hobbies</span>
          <span className="text-lg font-extralight">
            {user?.publicMetadata.hobbies ?String(user.publicMetadata.hobbies) : "I’m obsessed with : ........"}
          </span>
        </div>
        <div className="flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5 text-lg font-medium"> Where I live</span>
          <span className="text-lg font-extralight"> {user?.publicMetadata.address ? String(user.publicMetadata.address) : "Add your Address"}</span>
        </div>
      </div>
    </div>
  );
}
