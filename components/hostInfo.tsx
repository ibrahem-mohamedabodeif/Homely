import Image from "next/image";

export default function HostInfo() {
  return (
    <div>
      <h1 className="text-2xl font-medium mb-10"> Meet your Host</h1>
      <div className="grid grid-cols-4 gap-20 justify-between items-start">
        <div className="col-span-1 flex flex-col items-center border border-transparent p-10 rounded-3xl shadow-2xl">
          <div className="relative w-36 h-36 rounded-full overflow-hidden">
            <Image
              src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
              alt="image"
              fill={true}
              className="h-full rounded-full object-cover"
            />
          </div>
          <span className="text-xl font-medium pt-5">Ibrahem Mohamed</span>
        </div>
        <div className="col-span-3 flex flex-col">
          <h1 className="capitalize text-2xl font-medium pb-10">
            ibrahem mohamed
          </h1>
          <p className="text-lg font-light leading-relaxed">
            {" "}
            Superhosts are experienced, highly rated hosts who are committed to
            providing great stays for guests. Superhosts are experienced, highly
            rated hosts who are committed to providing great stays for guests.
          </p>
          <div>
            <h4 className="text-base capitalize pb-2 pt-10">
              {" "}
              My work : Front-end developer
            </h4>
            <h4 className="text-base capitalize">
              {" "}
              Hobbies : Gym, PlayStation
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
