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
    // <div className="px-4 md:px-8 lg:px-16">
    //   <form action={room ? updateRoom : addRoom}>
    //     <input type="hidden" name="userId" value={user?.id} />
    //     {room ? <input type="hidden" name="roomId" value={room?.id} /> : null}

    //     {/* Owner Info */}
    //     <div className="border-b-2 pb-2">
    //       <span className="text-2xl font-medium">The Owner info.</span>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 mb-5">
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Your Name</label>
    //           <input
    //             name="hostedName"
    //             placeholder="name"
    //             defaultValue={user?.user_metadata.name}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Your Email</label>
    //           <input
    //             value={user?.email}
    //             disabled
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Your Phone number</label>
    //           <input
    //             disabled
    //             value={user?.user_metadata.phone}
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     {/* Room Location Info */}
    //     <div className="border-b-2 pb-2 pt-4">
    //       <span className="text-2xl font-medium">The Room location info.</span>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 mb-5">
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Country</label>
    //           <input
    //             name="country"
    //             placeholder="country"
    //             defaultValue={room?.country}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">City</label>
    //           <input
    //             name="city"
    //             placeholder="city"
    //             defaultValue={room?.city}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Address</label>
    //           <input
    //             name="place"
    //             placeholder="place"
    //             defaultValue={room?.place}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     {/* Room Info */}
    //     <div className="border-b-2 pb-2 pt-4">
    //       <span className="text-2xl font-medium">The Room info.</span>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 mb-5">
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Room Name</label>
    //           <input
    //             name="roomName"
    //             placeholder="roomName"
    //             defaultValue={room?.roomName}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Room Category</label>
    //           <select
    //             name="category"
    //             defaultValue={room?.category}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           >
    //             <option value="room" key="room">
    //               room
    //             </option>
    //             <option value="mansions" key="mansions">
    //               mansions
    //             </option>
    //             <option value="beachfront" key="beachfront">
    //               beachfront
    //             </option>
    //             <option value="island" key="island">
    //               island
    //             </option>
    //             <option value="cabin" key="cabin">
    //               cabin
    //             </option>
    //             <option value="treehouse" key="treehouse">
    //               treehouse
    //             </option>
    //             <option value="luxe" key="luxe">
    //               luxe
    //             </option>
    //           </select>
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Guestes Num.</label>
    //           <input
    //             name="guests"
    //             placeholder="guestes"
    //             defaultValue={room?.guests}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Beds Num.</label>
    //           <input
    //             name="noBed"
    //             placeholder="noBeds"
    //             defaultValue={room?.noBed}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Bathrooms Num.</label>
    //           <input
    //             name="noBath"
    //             placeholder="noBath"
    //             defaultValue={room?.noBath}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Bedrooms Num.</label>
    //           <input
    //             name="noBedroom"
    //             placeholder="noBedrooms"
    //             defaultValue={room?.noBedroom}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Room Description</label>
    //           <textarea
    //             name="description"
    //             placeholder="description"
    //             defaultValue={room?.description}
    //             required
    //             className="w-full h-auto pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Room price / night</label>
    //           <input
    //             name="price"
    //             placeholder="price"
    //             defaultValue={room?.price}
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     {/* Room Images */}
    //     <div className="pt-4">
    //       <span className="text-2xl font-medium">The Room Images</span>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 mb-5">
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Image 1</label>
    //           <input
    //             name="image1"
    //             type="file"
    //             placeholder="image 1"
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Image 2</label>
    //           <input
    //             name="image2"
    //             type="file"
    //             placeholder="image 2"
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Image 3</label>
    //           <input
    //             name="image3"
    //             type="file"
    //             placeholder="image 3"
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Image 4</label>
    //           <input
    //             name="image4"
    //             type="file"
    //             placeholder="image 4"
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-gray-700">Image 5</label>
    //           <input
    //             name="image5"
    //             type="file"
    //             placeholder="image 5"
    //             required
    //             className="w-full h-10 pl-2 outline-none border rounded mt-2"
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     <button
    //       type="submit"
    //       className="max-sm:mb-10 border p-2 w-full md:w-40 bg-gray-800 hover:bg-gray-900 text-white rounded text-lg tracking-wider mt-5 md:mt-0"
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </div>
    <div className="mx-10">
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-xl pb-5"> Tell us about your place</h1>
            <div className="border border-gray-400 p-4 rounded-2xl ">
              <div className="border-b border-gray-400 py-2 flex flex-col gap-5 pb-10">
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place title </label>
                  <input
                    type="text"
                    className="border outline-none rounded-2xl p-2 mt-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place subtitle </label>
                  <input className="border outline-none rounded-2xl p-2 mt-2" />
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Place location </label>
                  <input className="border outline-none rounded-2xl p-2 mt-2" />
                </div>
                <div className="flex flex-col">
                  <label className="font-light pl-2">
                    {" "}
                    Describe your place
                  </label>
                  <textarea className="border outline-none rounded-2xl p-2 mt-2" />
                </div>
              </div>
              <div className="flex flex-col gap-5 pt-5">
                <div className="flex flex-col">
                  <label className="font-light pl-2"> Category</label>
                  <input className="border outline-none rounded-2xl p-2 mt-2" />
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className="font-light pl-2"> Guests</label>
                    <input className="border outline-none rounded-2xl p-2 mt-2" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-light pl-2"> Bedrooms</label>
                    <input className="border outline-none rounded-2xl p-2 mt-2" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className="font-light pl-2"> Beds</label>
                    <input className="border outline-none rounded-2xl p-2 mt-2" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-light pl-2"> Baths</label>
                    <input className="border outline-none rounded-2xl p-2 mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-xl pb-5"> Your place photos</h1>
              <div className="border p-4 border-gray-400 rounded-2xl grid grid-cols-2 gap-5">
                <input type="file" className="col-span-2"/>
                <input type="file" />
                <input type="file" />
                <input type="file" />
                <input type="file" />
              </div>
            </div>
            <div className="mt-10">
              <h1 className="text-xl pb-5"> Pricing</h1>
              <div className="flex items-center justify-center gap-2 border p-4 border-gray-400 rounded-2xl">
                <input
                  type="text"
                  className="border outline-none rounded-2xl p-2 mt-2"
                />
                <span className="text-xl font-light capitalize">/ night</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
