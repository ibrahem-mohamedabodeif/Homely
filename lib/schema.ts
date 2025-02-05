import { z } from "zod";

export const bookingSchema = z.object({
    client_name: z.string().min(1,{message:"invalid name input"}),
    client_email:z.string().email({message:"Invalid email address input"}),
    client_phone: z.string().min(10,{message:"Invalid phone number input"}).max(11,{message:"Invalid phone number input"}),
    client_idNum: z.string().min(14,{message:"Invalid ID number input"}).max(15,{message:"Invalid ID number input"}),
    client_notes: z.string().optional(),
    room_id: z.string(),
    check_in: z.string(),
    check_out: z.string(),
    nights: z.number(),
    guests_num: z.number(),
    total_price: z.number(),
    user_id: z.string(),
});

export type BookingDataType = z.infer<typeof bookingSchema>;