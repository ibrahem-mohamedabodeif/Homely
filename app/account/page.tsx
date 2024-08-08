import { createServerComponentClient } from "@/lib/server";
import { FaPen } from "react-icons/fa";

export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mb-10">
      <div className="relative flex items-center max-sm:flex-col  gap-10 border p-5 mr-7">
        {/* <button className=" absolute right-5 top-5">
          <FaPen size={20} />
        </button> */}

        <span className="border rounded-full text-4xl w-32 text-center p-10 bg-black text-white capitalize">
          {user?.user_metadata.name[0]}
        </span>
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold capitalize">
            {user?.user_metadata.name}
          </span>
          <span className="text-lg">{user?.user_metadata.email}</span>
          <span className="text-lg">{user?.user_metadata.phone}</span>
        </div>
      </div>
      {/* <div className="relative mt-5 border p-5 mr-7">
        <button className=" absolute right-5 top-5">
          <FaPen size={20} />
        </button>
        <h1 className="text-2xl font-semibold">About : </h1>
        <p className="p-7 mt-5 border rounded-xl text-lg leading-loose">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae neque
          amet doloribus voluptatibus eveniet quas quidem, ab, odit non, quos
          enim odio. Atque doloremque nisi totam vero harum minima ipsa!
        </p>
      </div>
      <div className="relative mt-5 border p-5 mr-7">
        <button className=" absolute right-5 top-5">
          <FaPen size={20} />
        </button>
        <h1 className="text-2xl font-semibold mb-10">Interests : </h1>
        <div className="grid grid-cols-5 gap-x-4 gap-y-2">
          <span className="p-3 text-center  rounded-xl  leading-loose text-lg font-medium border">
            watching tV
          </span>
        </div>
      </div> */}
    </div>
  );
}
