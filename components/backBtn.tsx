"use client"

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io"

export default function BackBtn() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}><IoIosArrowBack /></button>
  )
}
