"use client";
import { addRoom, updateRoom } from "@/lib/actions";

export default function BecomeahostForm({
  user,
  room,
}: {
  user: any;
  room?: any;
}) {
  return (
    <div className="mx-10">
      <form action={room ? updateRoom : addRoom}>
        <input type="hidden" name="userId" value={user?.id} />
        {room ? <input type="hidden" name="roomId" value={room?.id} /> : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Room Details */}
          <div>
            <h1 className="text-xl pb-5"> Tell us about your place</h1>
            <div className="border border-gray-400 p-4 rounded-2xl ">
              <div className="border-b border-gray-400 py-2 flex flex-col gap-5 pb-10">
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place title </label>
                  <input
                    type="text"
                    name="roomName"
                    defaultValue={room?.roomName}
                    required
                    className="border outline-none rounded-2xl p-2 mt-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place location </label>
                  <div className="grid grid-cols-2">
                    <div className="col-span-2 border rounded-2xl p-2 mt-2">
                      <input
                        name="country"
                        placeholder="country"
                        defaultValue={room?.country}
                        required
                        className=" outline-none border-r mr-3 pr-20"
                      />
                      <input
                        name="city"
                        defaultValue={room?.city}
                        placeholder="city"
                        required
                        className="outline-none"
                      />
                    </div>
                    <input
                      name="address"
                      defaultValue={room?.address}
                      placeholder="address"
                      required
                      className="border outline-none rounded-2xl p-2 mt-2 col-span-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2">Describe your place</label>
                  <textarea
                    name="description"
                    defaultValue={room?.description}
                    required
                    className="border outline-none rounded-2xl p-2 mt-2 resize-none h-40"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 pt-5">
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Category</label>
                  <select
                    name="category"
                    defaultValue={room?.category}
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
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className="font-light pl-2"> Guests</label>
                    <input
                      name="guests"
                      placeholder="Number of Guests"
                      defaultValue={room?.guests}
                      required
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-light pl-2"> Bedrooms</label>
                    <input
                      name="noBedroom"
                      placeholder="Number of Bedrooms"
                      defaultValue={room?.noBedroom}
                      required
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className="font-light pl-2"> Beds</label>
                    <input
                      name="noBed"
                      defaultValue={room?.noBed}
                      placeholder="Number of Bed"
                      required
                      className="border outline-none rounded-2xl p-2 mt-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-light pl-2"> Baths</label>
                    <input
                      name="noBath"
                      placeholder="Number of Bath"
                      defaultValue={room?.noBath}
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
              <div className="border p-4 border-gray-400 rounded-2xl grid grid-cols-2 gap-5">
                <input
                  name="image1"
                  type="file"
                  placeholder="image 1"
                  required
                  className="col-span-2"
                />
                <input
                  name="image2"
                  type="file"
                  placeholder="image 2"
                  required
                />
                <input
                  name="image3"
                  type="file"
                  placeholder="image 3"
                  required
                />
                <input
                  name="image4"
                  type="file"
                  placeholder="image 4"
                  required
                />
                <input
                  name="image5"
                  type="file"
                  placeholder="image 5"
                  required
                />
              </div>
            </div>
            {/* Room Pricing */}
            <div className="mt-10">
              <h1 className="text-xl pb-5"> Pricing</h1>
              <div className="flex items-center justify-center gap-2 border p-4 border-gray-400 rounded-2xl">
                <input
                  type="text"
                  name="price"
                  defaultValue={room?.price}
                  required
                  className="border outline-none rounded-2xl p-2 mt-2"
                />
                <span className="text-xl font-light capitalize">/ night</span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="absolute right-20 top-44 text-center border pt-2 pb-2 pl-5 pr-5 rounded-xl bg-[#F5556C] text-white capitalize"
        >
          {room ? "save changes" : "add place"}
        </button>
      </form>
    </div>
  );
}
