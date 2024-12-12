import { updateUserInfo } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function AboutInfoEdite({ onClose, userData }: { onClose: () => void; userData: any }) {
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
            About You
          </h1>
          <h4 className="text-lg font-extralight pt-5">Help other guests and Hosts get to know you</h4>
        </div>
        <form action={formAction}>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5 mt-10">
            {/* about input*/}
            <div className="col-span-2 flex flex-col border border-[#6e6e6e] p-3 rounded-lg">
              <span className="pb-2 text-lg font-medium">About</span>
              <textarea
                name="about"
                placeholder="Tell guests and hosts about you"
                defaultValue={userData.user_about}
                className="w-full outline-none mt-2 font-light resize-none"
              />
            </div>
            {/* My Work input*/}
            <div className="flex flex-col border border-[#6e6e6e] p-3 rounded-lg">
              <span className="pb-2 text-lg font-medium">My Work</span>
              <input
                type="text"
                name="work"
                placeholder="Add your work"
                defaultValue={userData.user_work}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
            {/* Languages input*/}
            <div className="flex flex-col border border-[#6e6e6e] p-3 rounded-lg">
              <span className="pb-2 text-lg font-medium">Languages</span>
              <input
                type="text"
                name="languages"
                placeholder="Add Languages"
                defaultValue={userData.user_languages}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
            {/* Hobbies input*/}
            <div className="flex flex-col border border-[#6e6e6e] p-3 rounded-lg">
              <span className="pb-2 text-lg font-medium">Hobbies</span>
              <input
                type="text"
                name="hobbies"
                placeholder="I’m obsessed with : ........"
                defaultValue={userData.user_hobbies}
                className="w-full outline-none mt-2 font-light"
              />
            </div>
            {/* Where I live input*/}
            <div className="flex flex-col border border-[#6e6e6e] p-3 rounded-lg">
              <span className="pb-2 text-lg font-medium">Where I live</span>
              <input
                type="text"
                name="city"
                placeholder="Add City"
                defaultValue={userData.user_location}
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
