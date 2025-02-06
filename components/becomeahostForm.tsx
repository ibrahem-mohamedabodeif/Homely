"use client";
import { addRoom, updateRoom } from "@/lib/actions";
import { addedRoomSchema, updatedRoomSchema } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useActionState } from "react";
import { useState } from "react";
import { CiCamera } from "react-icons/ci";

export default function BecomeahostForm({ room }: { room?: any }) {
  const { user } = useUser();
  const initialState = {
    success : false,
    errors :{},
    message:"",
    inputs:{}
  }
  const [state, formAction] = useActionState(
    async (previousState: any, formData: FormData): Promise<any> => {
      const formValues = {
        user_id: formData.get("userId") as string,
        room_name: formData.get("room_name") as string,
        country: formData.get("country") as string,
        city: formData.get("city") as string,
        address: formData.get("address") as string,
        room_description: formData.get("room_description") as string,
        room_category: formData.get("room_category") as string,
        guests_num: Number(formData.get("guests_num")) as number,
        bedrooms_num: Number(formData.get("bedrooms_num")) as number,
        beds_num: Number(formData.get("beds_num")) as number,
        bathrooms_num: Number(formData.get("bathrooms_num")) as number,
        room_price: Number(formData.get("room_price")) as number,
         room_images: (formData.getAll("room_images") as File[]) ,
      }

      const result = room
      ? updatedRoomSchema.safeParse({ ...formValues, id: room.id })
      : addedRoomSchema.safeParse(formValues);

    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        errorMap[error.path[0]] = error.message;
      });
      return {
        success: false,
        errors: errorMap,
        inputs: formValues,
        message: "Please enter valid place data.",
      };
    }

    try {
      const response = room
        ? await updateRoom({ ...result.data, id: room.id })
        : await addRoom({ ...result.data, room_images: result.data.room_images || [] });

      if (response && !response.success) {
        return {
          success: false,
          errors: response.errors,
          inputs: formValues,
          message: response.message,
        };
      }
      return response;
    } catch (error) {
      return {
        success: false,
        message: room ? "Failed to update room." : "Failed to add room.",
        errors: {},
        inputs: formValues,
      };
    }
  },
  initialState
  );

  const [imagePreviews, setImagePreviews] = useState<string[]>(
    room?.room_images || []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImagePreviews = fileArray.map((file) => URL.createObjectURL(file)); 
      setImagePreviews((prev) => [...prev, ...newImagePreviews]); 
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);
    setImagePreviews(newImagePreviews);
  };

  return (
    <div className="mx-4 md:mx-10">
        {state?.message && (
        <div className={`my-10 -mt-5 text-xl ${state.success ? "text-green-500" : "text-red-500"}`}>
          {state.message}
        </div>
      )}
      <form action={formAction}>
      {room && <input type="hidden" name="roomId" value={room.id} />}
      <input type="hidden" name="userId" value={user?.id ||""} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Room Details */}
          <div className="">
            <h1 className="text-xl pb-5"> Tell us about your place</h1>
            <div className="border border-gray-400 p-4 rounded-2xl ">
              <div className="border-b border-gray-400 py-2 flex flex-col gap-5 pb-10">
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place title </label>
                  <input
                    name="room_name"
                    type="text"
                    defaultValue={room ? room.room_name : state.inputs.room_name}
                    placeholder="Place title"
                    className="border outline-none rounded-2xl p-2 mt-2"
                  />
                  {state?.errors?.room_name && <p className="text-red-500 mb-2 capitalize">{state.errors.room_name}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place location </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="col-span-1 md:col-span-2 border rounded-2xl p-2 mt-2 flex flex-col md:flex-row">
                      <input
                        name="country"
                        placeholder="Country"
                        defaultValue={room ? room.country : state.inputs.country}
                        className="outline-none md:border-r md:mr-3 md:pr-20 mb-2 md:w-1/2"
                      />
                    {state?.errors?.country && <p className="text-red-500 mb-2 capitalize">{state.errors.country}</p>}

                      <input
                        name="city"
                        defaultValue={room ? room.city : state.inputs.city}
                        placeholder="City"
                        className="outline-none md:w-1/2 mb-2"
                      />
                  {state?.errors?.city && <p className="text-red-500 mb-2 capitalize">{state.errors.city}</p>}
                    </div>
                    <input
                      name="address"
                      defaultValue={room ? room.address : state.inputs.address}
                      placeholder="Address"
                      className="border outline-none rounded-2xl p-2 mt-2 col-span-1 md:col-span-2"
                    />
                    {state?.errors?.address && <p className="text-red-500 mb-2 capitalize">{state.errors.address}</p>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2">Describe your place</label>
                  <textarea
                    name="room_description"
                    defaultValue={room ? room.room_description : state.inputs.room_description}
                    placeholder="Describe your place to help clients know where they will be"
                    className="border outline-none rounded-2xl p-2 mt-2 resize-none h-40"
                  />
                  {state?.errors?.room_description && <p className="text-red-500 mb-2 capitalize">{state.errors.room_description}</p>}
                </div>
              </div>
              {/* category , Numbers*/}
              <div className="flex flex-col gap-5 pt-5">
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Category</label>
                  <select
                    name="room_category"
                    defaultValue={room ? room.room_category : state.inputs.room_category}
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
                  {state?.errors?.room_category && <p className="text-red-500 mb-2 capitalize">{state.errors.room_category}</p>}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <div className="flex flex-col md:w-1/2">
                    <label className="font-light pl-2"> Guests Num.</label>
                    <input
                      name="guests_num"
                      type="number"
                      placeholder="Number of Guests"
                      defaultValue={room ? room.guests_num : state.inputs.guests_num}
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                    {state?.errors?.guests_num && <p className="text-red-500 mb-2 capitalize">{state.errors.guests_num}</p>}
                  </div>
                  <div className="flex flex-col md:w-1/2">
                    <label className="font-light pl-2"> Bedrooms Num.</label>
                    <input
                      name="bedrooms_num"
                      type="number"
                      placeholder="Number of Bedrooms"
                      defaultValue={room ? room.bedrooms_num : state.inputs.bedrooms_num}
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                    {state?.errors?.bedrooms_num && <p className="text-red-500 mb-2 capitalize">{state.errors.bedrooms_num}</p>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <div className="flex flex-col md:w-1/2">
                    <label className="font-light pl-2"> Beds Num.</label>
                    <input
                      name="beds_num"
                      type="number"
                      defaultValue={room ? room.beds_num : state.inputs.beds_num}
                      placeholder="Number of Bed"
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                    {state?.errors?.beds_num && <p className="text-red-500 mb-2 capitalize">{state.errors.beds_num}</p>}
                  </div>
                  <div className="flex flex-col md:w-1/2">
                    <label className="font-light pl-2"> Bathrooms Num.</label>
                    <input
                      name="bathrooms_num"
                      type="number"
                      placeholder="Number of Bath"
                      defaultValue={room ? room.bathrooms_num : state.inputs.bathrooms_num}
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                    {state?.errors?.bathrooms_num && <p className="text-red-500 mb-2 capitalize">{state.errors.bathrooms_num}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Room Photos & Pricing */}
          <div>
            {/* Room Photos */}
            <div>
              <h1 className="text-xl pb-5">Your place photos</h1>
              <div className="max-h-[500px] overflow-y-auto border p-4 border-gray-400 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Image Previews */}
                  {imagePreviews.map((image, index) => (
                    <div
                      key={index}
                      className={`relative ${
                        index === 0
                          ? "col-span-1 md:col-span-2 h-60"
                          : "col-span-1 h-36"
                      }`}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-lg">
                        <Image
                          src={image}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-3 font-extrabold bg-white w-7 h-7 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Upload Button */}
                  <label
                    className={`relative h-40 w-full flex items-center flex-col gap-3 justify-center border border-gray-400 rounded-lg cursor-pointer ${
                      imagePreviews.length === 0 ? "col-span-2" : "col-span-1"
                    }`}
                  >
                    <input
                      name="room_images"
                      type="file"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer "
                      onChange={handleImageChange}
                      multiple
                    />
                    <CiCamera size={40} color="#9ca3af" />
                    <span className="text-gray-400 text-lg">
                      Add at least 5 photos
                    </span>
                  </label>
                </div>
              </div>
                  {state?.errors?.room_images && <p className="text-red-500 mb-2 capitalize">{state.errors.room_images}</p>}
            </div>
            {/* Room Pricing */}
            <div className="mt-10">
              <h1 className="text-xl pb-5"> Pricing</h1>
              <div className="flex items-center justify-center gap-2 border p-4 border-gray-400 rounded-2xl">
                <input
                  name="room_price"
                  type="number"
                  defaultValue={room ? room.room_price : state.inputs.room_price}
                  placeholder="Room price"
                  className="border outline-none rounded-2xl p-2 mt-2"
                />
                <span className="text-xl font-light capitalize">/night</span>
              </div>
              {state?.errors?.room_price && <p className="text-red-500 mb-2 capitalize">{state.errors.room_price}</p>}
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