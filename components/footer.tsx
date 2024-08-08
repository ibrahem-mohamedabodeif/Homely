import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex items-center justify-center p-2 gap-2 bg-gray-500">
      <FaRegCopyright />
      <span className="text-lg">2024 Copyrights, PEGASUS Company</span>
    </div>
  );
}
