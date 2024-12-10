import Image from "next/image";

export default function CommentsSec() {
  return (
    <div className="grid grid-cols-3 gap-10">
    <div>
    <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
                    alt="image"
                    width={200}
                    height={200}
                    className="h-full rounded-full object-cover"
                  />
                </div>
                <textarea placeholder="Write your comment" className="w-full resize-none outline-none border border-[#6e6e6e] rounded-2xl pl-5 p-3"/>   
              </div>
              </div>
    <div>
    <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
                    alt="image"
                    width={200}
                    height={200}
                    className="h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-base capitalize">ibrahem mohamed</h1>
                  <h2 className="font-light text-sm">2 days ago</h2>
                </div>
              </div>
              <p className="text-base font-light mt-5"> Great place and super friendly and helpful hosts, definitely
              recommended.</p>
              </div>
    <div>
    <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
                    alt="image"
                    width={200}
                    height={200}
                    className="h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-base capitalize">ibrahem mohamed</h1>
                  <h2 className="font-light text-sm">2 days ago</h2>
                </div>
              </div>
              <p className="text-base font-light mt-5"> Great place and super friendly and helpful hosts, definitely
              recommended.</p>
              </div>
    <div>
    <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
                    alt="image"
                    width={200}
                    height={200}
                    className="h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-base capitalize">ibrahem mohamed</h1>
                  <h2 className="font-light text-sm">2 days ago</h2>
                </div>
              </div>
              <p className="text-base font-light mt-5"> Great place and super friendly and helpful hosts, definitely
              recommended.</p>
              </div>
              </div>
  )
}
