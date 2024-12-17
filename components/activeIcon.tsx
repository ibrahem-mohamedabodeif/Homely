"use client";

import { useSearchParams } from "next/navigation";

export default function ActiveFilterBtn({
  filterType,
  value,
  onClick,
  children,
}: {
  filterType: string;
  value: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const isActive = searchParams.get(filterType) === value;

  return (
    <button
      className={`flex flex-col items-center ${
        isActive ? "text-[#F5556C]" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
