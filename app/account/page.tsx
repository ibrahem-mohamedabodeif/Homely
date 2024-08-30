import { createServerComponentClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  return (
    <div className="mb-10">
      <div className="relative flex items-center max-sm:flex-col  gap-10 border p-5 mr-7 overflow-x-auto">
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
    </div>
  );
}
