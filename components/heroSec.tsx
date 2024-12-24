import Image from "next/image";
import SearchBar from "./searchBar";
import NavBar from "./navbar";

export default async function HeroSec() {
  return (
    <div>
      <NavBar />
      <Image
        src={"/naz-israyelyan-hiaI5CiVCUE-unsplash.jpg"}
        alt="cover"
        fill
        className="object-cover -z-10 fixed"
      />
      <div className="flex flex-col items-center gap-14 justify-center my-32 md:my-72 lg:my-32">
        <h1 className="text-white font-bold text-4xl lg:text-5xl lg:w-auto md:w-auto w-80 tracking-wider leading-tight">
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
