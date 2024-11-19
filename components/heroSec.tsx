import Image from "next/image";
import SearchBar from "./searchBar";

export default function HeroSec() {
  return (
    <div className="">
      <Image
        src={"/naz-israyelyan-hiaI5CiVCUE-unsplash.jpg"}
        alt="cover"
        fill
        className="object-cover -z-10"
      />
      <div className="flex flex-col items-center gap-14 justify-center my-32">
        <h1 className="text-white font-bold text-5xl tracking-wider leading-tight">
          <span className="text-[#F5556C]">Homely</span>, where you can book
          <br />
          perfect stay for your vacation
        </h1>

        <div className="flex justify-center w-full">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
