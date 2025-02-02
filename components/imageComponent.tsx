import Image from "next/image";
import Link from "next/link";
import { CgMenuGridR } from "react-icons/cg";

export default function ImageComponent({ ...props }) {
  
  return (
    <div className="relative grid grid-cols-4 gap-3">
      <div className="col-span-4 lg:col-span-2 row-span-2 h-[370px] max-w-3xl ">
        <Image
          src={props.images[0]}
          alt="room image 1"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden lg:block lg:h-44 lg:max-w-sm">
        <Image
          src={props.images[1]}
          alt="room image 2"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden lg:block lg:h-44 lg:max-w-sm">
        <Image
          src={props.images[2]}
          alt="room image 3"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden lg:block lg:h-44 lg:max-w-sm">
        <Image
          src={props.images[3]}
          alt="room image 4"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden lg:block lg:h-44 lg:max-w-sm">
        <Image
          src={props.images[4]}
          alt="room image 5"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>

      {/* show all photos */}
      <Link href={`/${props.roomId}/photos`}>
      <div className="absolute bottom-5 right-5 bg-white p-2 rounded-lg flex items-center gap-2">
      <CgMenuGridR size={20} />
      <span>Show all photos</span>
      </div>
      </Link>
    </div>
  );
}
