import logo from "@/app/icon.ico";
import SignupForm from "@/components/signupForm";
import Image from "next/image";
import { Suspense } from "react";
import Loader from "../loading";

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src={logo} alt="LOGO" width={150} className="mx-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Be a member of our community
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <Suspense fallback={<Loader />}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
