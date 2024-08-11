"use client";
import ReservationCard from "@/components/reservationCard";
import { useUser } from "@/lib/context/authProvider";
import { getReservations } from "@/lib/functions";
import { useEffect, useState } from "react";

type RoomDetails = {
  city: string;
  image1: string;
  country: string;
  roomName: string;
  hostedName: string;
}[];

interface Room {
  id: string;
  totalPrice: number;
  nights: number;
  startDay: string;
  endDay: string;
  roomId: string;
  rooms: RoomDetails;
}

export default function Page() {
  const user: any = useUser();
  const [reservationRooms, setReservationRooms] = useState<Room[] | null>(null);

  useEffect(() => {
    async function fetchReservations() {
      if (user?.id) {
        const reservations = await getReservations(user.id);
        setReservationRooms(reservations);
      }
    }
    fetchReservations();
  }, [user]);

  if (!user) {
    return (
      <div className="text-4xl flex justify-center mt-40">Please sign in</div>
    );
  }

  return (
    <>
      {!reservationRooms?.length ? (
        <div className="text-4xl flex justify-center mt-40">
          No reservations yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-y-10 gap-16 mb-24">
          {reservationRooms.map((room) => (
            <ReservationCard room={room} key={room.id} />
          ))}
        </div>
      )}
    </>
  );
}
