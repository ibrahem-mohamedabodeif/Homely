import Image from "next/image";
import world from "@/public/original-148a6d8f5f246b3fbc04adc33afb01d1.jpg";
import setup from "@/public/65214d06-ffb4-4b70-93c0-01d368e76649.webp";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import Link from "next/link";
import { Suspense } from "react";
import Loader from "../loading";
import NavBar from "@/components/navbar";

export default async function Page() {
  return (
    <>
        <NavBar />
    <div>

      {/* Host Invitation Section */}
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col sm:flex-row justify-end items-center gap-5 sm:gap-10 mx-5 sm:mx-16 mt-3">
          <h3 className="text-lg font-medium text-center sm:text-left">
            Ready to become a host?
          </h3>
          <Link href={"/hosting/become-a-host"}>
          

            <button className="tracking-wide flex items-center gap-2 text-white bg-[#F5556C] border hover:shadow rounded-[50px] p-3 ">
              <FaHouseChimneyMedical size={20} />
         Homely
              Setup
            </button>
          </Link>
        </div>
      </Suspense>

      {/* Earnings and Image Section */}
      <Suspense fallback={<Loader />}>
        <div className="max-sm:border-b-2 flex flex-col sm:flex-row justify-between items-center mx-5 sm:mx-16 mb-10 sm:mb-28 mt-8 sm:mt-14">
          <div className="flex flex-col items-center text-3xl sm:text-4xl mb-10 sm:mb-0">
            <span className="font-bold text-[#F5556C] text-center">
              Become a host !
            </span>
            <span className="mt-5 text-gray-800 text-center">
              You could earn
            </span>
            <span className="mt-5 font-bold text-gray-900">$250</span>
            <span className="mt-5 text-gray-800 text-center">
              <span className="font-semibold border-b-2 border-gray-900 text-gray-900">
                7 nights
              </span>{" "}
              at an estimated{" "}
              <span className="font-semibold text-gray-900">$36</span> a night
            </span>
          </div>
          <div className="hidden sm:block">
            <Image src={world} alt="pegasus your home" width={650} />
          </div>
        </div>
      </Suspense>

      {/* Homely Setup Section */}
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col items-center mx-5 sm:mx-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-bold pb-8 sm:pb-12">
              Hosting is easy with <span className="text-[#F5556C]">Homely</span> Setup
            </h1>
            <Image
              src={setup}
              alt="pegasus setup"
              className="max-w-full sm:max-w-7xl"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-28 my-8 sm:my-10">
            <div>
              <h2 className="text-lg font-semibold pb-2 text-center sm:text-left">
                One-to-one guidance from a Superhost
              </h2>
              <p className="text-gray-700 text-center sm:text-left">
                We’ll match you with a Superhost in your area, who’ll guide you
                from your first question to your first guest—by phone, video
                call, or chat.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold pb-2 text-center sm:text-left">
                An experienced guest for your first booking
              </h2>
              <p className="text-gray-700 text-center sm:text-left">
                For your first booking, you can choose to welcome an experienced
                guest who has at least three stays and a good track record on
                Airbnb.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold pb-2 text-center sm:text-left">
                Specialized support from Airbnb
              </h2>
              <p className="text-gray-700 text-center sm:text-left">
                New Hosts get one-tap access to specially trained Community
                Support agents who can help with everything from account issues
                to billing support.
              </p>
            </div>
          </div>
        </div>
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<Loader />}>
        <div className="border rounded-3xl mx-5 sm:mx-16 p-5 sm:p-10 my-10 max-sm:mb-28 sm:my-20 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold pb-3 sm:pb-5">
              Have questions?
            </h1>
            <h2 className="text-2xl sm:text-4xl font-semibold text-gray-700 pb-3 sm:pb-5">
              Get answers from our support team.
            </h2>
          </div>
          <button className="border px-6 py-3 rounded-2xl text-lg font-semibold bg-gray-800 hover:bg-gray-900 text-gray-100 tracking-wide mt-5 sm:mt-0">
            Contact Us
          </button>
        </div>
      </Suspense>
    </div>
    </>
  );
}
