import { getRoomById } from "/lib/functions";
export async function GET(request, { params }) {
  const { roomId } = params;

  try {
    const room = await getRoomById(roomId);

    return Response.json({ room });
  } catch {
    return Response.json({ message: "Room not found" });
  }
}
