import Loading from "@/app/loading";
import BackBtn from "@/components/backBtn";
import { getRoomById } from "@/lib/functions";
import Image from "next/image";
import { Suspense } from "react";

export default async function Photos({params}:{params:Promise<{roomId:string}>}) {
const { roomId } = await params;  

const room = await getRoomById(roomId);
  return (
    <div>
        <div className="flex items-center gap-2">
            <BackBtn/>
        <h1 className="text-2xl font-medium">{room.room_name} {"'"}s <span className="text-[#f5556c]">photos</span></h1>
        </div>
        <Suspense fallback={<Loading />}>
          <div className="columns-1 sm:columns-2 lg:columns-2 gap-5 space-y-5 my-10">
            {room.room_images.map((image: string, index: number) => (
              <div key={index}  className="break-inside-avoid">
                <Image
                  src={image}
                  alt={`project image ${index + 1}`}
                  width={1500}
                  height={1500}
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
             ))}
          </div>
        </Suspense>
    </div>
  )
}
