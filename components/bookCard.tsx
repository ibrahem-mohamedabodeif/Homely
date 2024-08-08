import Image from "next/image";

type pageProp = {
  room: {
    image1: string;
    price: number;
    roomName: string;
  };
  searchParams: {
    nights: number;
    cleaningFee: number;
    serviceFee: number;
  };
};

export default function BookCard({ room, searchParams }: pageProp) {
  const nights = searchParams.nights;
  const price = Number(room.price);
  const cleaningFee = Number(searchParams.cleaningFee);
  const serviceFee = Number(searchParams.serviceFee);

  const total = Math.ceil(price * nights + cleaningFee + serviceFee);

  return (
    <div className="max-w-full md:max-w-lg border p-4 sm:p-6 md:p-10 rounded-lg shadow bg-white">
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-5">
        <Image
          src={room.image1}
          alt={room.roomName}
          width={120}
          height={120}
          className="rounded w-full sm:w-auto"
        />
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h1 className="font-medium">{room.roomName}</h1>
          <span>${price} / night</span>
        </div>
      </div>
      <div className="border-t-2 pt-5 mb-5">
        <h1 className="text-xl font-semibold">Price details</h1>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex justify-between items-center">
            <span>
              ${price} x {nights} nights
            </span>
            <span>${price * nights}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Cleaning fee</span>
            <span>${cleaningFee}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Pegasus service fee</span>
            <span>${serviceFee}</span>
          </div>
        </div>
      </div>
      <div className="border-t-2 pt-5 flex justify-between items-center">
        <span className="text-lg font-semibold">Total (USD)</span>
        <span>${total}</span>
      </div>
    </div>
  );
}
