import Image from "next/image";
export default function Loading() {
  return (
    <div className="flex-col gap-4 w-full h-screen  flex items-center justify-center">
      <div className="w-28 h-28 flex items-center justify-center rounded-full">
        <Image
          src={"/favicon.ico"}
          alt="logo"
          width={200}
          height={200}
          priority={true}
          className="animate-pulse opacity-5"
        />
      </div>
    </div>
  );
}
