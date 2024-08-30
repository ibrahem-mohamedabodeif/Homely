import Image from "next/image";
import logo from "./icon.ico";
export default function Loader() {
  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-28 h-28 flex items-center justify-center rounded-full">
        <Image
          src={logo}
          alt="logo"
          width={200}
          priority={true}
          className="animate-pulse opacity-5"
        />
      </div>
    </div>
  );
}
