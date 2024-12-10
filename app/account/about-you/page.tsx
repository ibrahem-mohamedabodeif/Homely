import { MdEdit } from "react-icons/md";

export default function Page() {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl text-[#F5556C] font-medium pb-5"> About You</h1>
          <MdEdit size={25} />
        </div>
        <p className="text-xl font-extralight">
          Help other guests and Hosts get to know you
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-10">
        <div className="col-span-2 flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5  text-lg font-medium"> About</span>
          <span className="text-lg font-extralight capitalize">
            Tell guests and hosts about you
          </span>
        </div>
        <div className="flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5 text-lg font-medium"> My Work</span>
          <span className="text-lg font-extralight capitalize">
            Add your work
          </span>
        </div>
        <div className="flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5 text-lg font-medium">Languages</span>
          <span className="text-lg font-extralight"> Add Languages</span>
        </div>
        <div className="flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5 text-lg font-medium"> Hobbies</span>
          <span className="text-lg font-extralight">
            I’m obsessed with : ........
          </span>
        </div>
        <div className="flex flex-col border border-[#6e6e6e] p-5 rounded-lg">
          <span className="pb-5 text-lg font-medium"> Where I live</span>
          <span className="text-lg font-extralight"> Add City</span>
        </div>
      </div>
    </div>
  );
}
