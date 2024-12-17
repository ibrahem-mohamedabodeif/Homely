import Image from "next/image";

export default function HostInfo({ userData }: any) {
  return (
    <div>
      <h1 className="text-2xl font-medium mb-10"> Meet your Host</h1>
      <div className="grid grid-cols-4 gap-20 justify-between items-start">
        <div className="col-span-1 flex flex-col items-center border border-transparent p-10 rounded-3xl shadow-2xl">
          <div className="relative w-36 h-36 rounded-full overflow-hidden">
            <Image
              src={userData.user_image}
              alt="image"
              fill={true}
              className="h-full rounded-full object-cover"
            />
          </div>
          <span className="text-xl font-medium pt-5 capitalize">
            {userData.user_name.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
        <div className="col-span-3 flex flex-col">
          <h1 className="capitalize text-2xl font-medium pb-10">
            {userData.user_name}
          </h1>
          <p className="text-lg font-light leading-relaxed">
            {userData.user_about}
          </p>
          <div>
            <h4 className="text-base font-light capitalize pb-2 pt-10">
              My work : {userData.user_work}
            </h4>
            <h4 className="text-base font-light capitalize pb-2">
              Hobbies : {userData.user_hobbies}
            </h4>
            <h4 className="text-base font-light capitalize">
              Languages : {userData.user_languages}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
