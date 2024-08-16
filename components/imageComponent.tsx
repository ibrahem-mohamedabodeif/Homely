import Image from "next/image";

export default function ImageComponent({ ...props }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="col-span-4 lg:col-span-2 row-span-2 h-[370px] max-w-3xl ">
        <Image
          src={props.image1}
          alt="room image 1"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden lg:block lg:h-44 lg:max-w-sm">
        <Image
          src={props.image2}
          alt="room image 2"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden lg:block lg:h-44 lg:max-w-sm">
        <Image
          src={props.image3}
          alt="room image 3"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden lg:block lg:h-44 lg:max-w-sm">
        <Image
          src={props.image4}
          alt="room image 4"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="hidden lg:block lg:h-44 lg:max-w-sm">
        <Image
          src={props.image5}
          alt="room image 5"
          className="rounded-lg h-full w-full object-cover"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
