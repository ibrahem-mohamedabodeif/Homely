"use client";
import { addRoom, updateRoom } from "@/lib/actions";
import Image from "next/image";
import { useActionState } from "react";
import { useState } from "react";

export default function BecomeahostForm({ room }: { room?: any }) {
  const [error, formAction] = useActionState(
    async (previousState: any, formData: FormData) => {
      try {
        if (room) {
          await updateRoom(previousState, formData);
        } else {
          await addRoom(previousState, formData);
        }
      } catch {
        return {
          message: room ? "Failed to update room" : "Failed to add room",
        };
      }
    },
    null
  );

  const [imagePreviews, setImagePreviews] = useState<string[]>(() => {
    if (room) {
      return [
        room.image1 || "",
        room.image2 || "",
        room.image3 || "",
        room.image4 || "",
        room.image5 || "",
      ];
    }
    return [];
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = event.target?.result as string;
        setImagePreviews(newImagePreviews);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="mx-4 md:mx-10">
      <form action={formAction}>
        {room ? <input type="hidden" name="roomId" value={room?.id} /> : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Room Details */}
          <div className="">
            <h1 className="text-xl pb-5"> Tell us about your place</h1>
            <div className="border border-gray-400 p-4 rounded-2xl ">
              <div className="border-b border-gray-400 py-2 flex flex-col gap-5 pb-10">
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place title </label>
                  <input
                    type="text"
                    name="roomName"
                    defaultValue={room?.room_name}
                    placeholder="Title"
                    required
                    className="border outline-none rounded-2xl p-2 mt-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place location </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="col-span-1 md:col-span-2 border rounded-2xl p-2 mt-2 flex flex-col md:flex-row">
                      <input
                        name="country"
                        placeholder="Country"
                        defaultValue={room?.country}
                        required
                        className="outline-none md:border-r md:mr-3 md:pr-20 mb-2 md:w-1/2"
                      />
                      <input
                        name="city"
                        defaultValue={room?.city}
                        placeholder="City"
                        required
                        className="outline-none md:w-1/2 mb-2"
                      />
                    </div>
                    <input
                      name="address"
                      defaultValue={room?.address}
                      placeholder="Address"
                      required
                      className="border outline-none rounded-2xl p-2 mt-2 col-span-1 md:col-span-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2">Describe your place</label>
                  <textarea
                    name="description"
                    defaultValue={room?.room_description}
                    required
                    placeholder="Describe your place to help clients know where they will be"
                    className="border outline-none rounded-2xl p-2 mt-2 resize-none h-40"
                  />
                </div>
              </div>
              {/* category , Numbers*/}
              <div className="flex flex-col gap-5 pt-5">
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Category</label>
                  <select
                    name="category"
                    defaultValue={room?.room_category}
                    required
                    className="border outline-none rounded-2xl p-2 mt-2 font-light capitalize"
                  >
                    <option value="room" key="room">
                      room
                    </option>
                    <option value="mansions" key="mansions">
                      mansions
                    </option>
                    <option value="beachfront" key="beachfront">
                      beachfront
                    </option>
                    <option value="island" key="island">
                      island
                    </option>
                    <option value="cabin" key="cabin">
                      cabin
                    </option>
                    <option value="treehouse" key="treehouse">
                      treehouse
                    </option>
                    <option value="luxe" key="luxe">
                      luxe
                    </option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <div className="flex flex-col md:w-1/2">
                    <label className="font-light pl-2"> Guests Num.</label>
                    <input
                      name="guests"
                      placeholder="Number of Guests"
                      defaultValue={room?.guests_num}
                      required
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                  </div>
                  <div className="flex flex-col md:w-1/2">
                    <label className="font-light pl-2"> Bedrooms Num.</label>
                    <input
                      name="noBedroom"
                      placeholder="Number of Bedrooms"
                      defaultValue={room?.bedrooms_num}
                      required
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <div className="flex flex-col md:w-1/2">
                    <label className="font-light pl-2"> Beds Num.</label>
                    <input
                      name="noBed"
                      defaultValue={room?.beds_num}
                      placeholder="Number of Bed"
                      required
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                  </div>
                  <div className="flex flex-col md:w-1/2">
                    <label className="font-light pl-2"> Bathrooms Num.</label>
                    <input
                      name="noBath"
                      placeholder="Number of Bath"
                      defaultValue={room?.bathrooms_num}
                      required
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Room Photos & Pricing */}
          <div>
            {/* Room Photos */}
            <div>
              <h1 className="text-xl pb-5"> Your place photos</h1>
              <div className="border p-4 border-gray-400 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={`relative ${index === 0 ? "col-span-1 md:col-span-2 h-60" : "col-span-1"}`}
                  >
                    <input
                      name={`image${index + 1}`}
                      type="file"
                      placeholder={`image ${index + 1}`}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    {imagePreviews[index] ? (
                      <div className={ `relative ${index===0 ? "h-60 w-full overflow-hidden" : "w-full h-36 overflow-hidden"} `} >
                        <Image
                          src={imagePreviews[index]}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="h-full object-cover rounded-2xl"
                        />
                      </div>
                    ) : (
                    
                      <div className={`${index===0 ? "h-60 w-full flex items-center justify-center border border-gray-400 rounded-2xl" : "w-full h-36 flex items-center justify-center border border-gray-400 rounded-2xl"} `} >
                        <span className="text-gray-400">Upload Image {index + 1}</span>
                      </div>
                     
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Room Pricing */}
            <div className="mt-10">
              <h1 className="text-xl pb-5"> Pricing</h1>
              <div className="flex items-center justify-center gap-2 border p-4 border-gray-400 rounded-2xl">
                <input
                  type="text"
                  name="price"
                  defaultValue={room?.room_price}
                  required
                  placeholder="Room price"
                  className="border outline-none rounded-2xl p-2 mt-2"
                />
                <span className="text-xl font-light capitalize">/night</span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-10 md:mt-0 md:absolute md:right-20 md:top-44 text-center border pt-2 pb-2 pl-5 pr-5 rounded-xl bg-[#F5556C] text-white capitalize"
        >
          {room ? "save changes" : "add place"}
        </button>
      </form>
    </div>
  );
}