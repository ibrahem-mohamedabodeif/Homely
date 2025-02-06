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

const fileSchema = z.custom<File>((f) => f instanceof File,{
    message: "expected an image"
  });
export const addedRoomSchema = z.object({
  user_id: z.string(),
  room_name: z.string().min(1, {message : "please enter place name"}),
  country: z.string().min(1, {message : "please enter valid country name"}),
  city: z.string().min(1, {message : "please enter valid city name"}),
  address: z.string().min(1, {message : "please enter valid address"}),
  room_description: z.string().min(50, {message : "please describe you place"}),
  room_category: z.string().min(1, {message : "please choose your place category"}),
  guests_num: z.number( {message : "please enter capacity place number"}).min(1,{message : "please enter valid number"}),
  bedrooms_num: z.number( {message : "please enter number of bedrooms"}).min(1,{message : "please enter valid number"}),
  beds_num: z.number( {message : "please enter number of beds"}).min(1,{message : "please enter valid number"}),
  bathrooms_num: z.number( {message : "please enter number of bathrooms"}).min(1,{message : "please enter valid number"}),
  room_price: z.number({message : "please enter price for your place"}).min(10,{message : "please enter valid price"}),
  room_images: z.array(fileSchema).min(5, {message : "please enter at least 5 images for your place"}),
});

export type addedRoomType = z.infer<typeof addedRoomSchema>;

export const updatedRoomSchema = z.object({
  user_id: z.string(),
  id: z.number(),
  room_name: z.string().min(1, {message : "please enter place name"}),
  country: z.string().min(1, {message : "please enter valid country name"}),
  city: z.string().min(1, {message : "please enter valid city name"}),
  address: z.string().min(1, {message : "please enter valid address"}),
  room_description: z.string().min(50, {message : "please describe you place"}),
  room_category: z.string().min(1, {message : "please choose your place category"}),
  guests_num: z.number( {message : "please enter capacity place number"}).min(1,{message : "please enter valid number"}),
  bedrooms_num: z.number( {message : "please enter number of bedrooms"}).min(1,{message : "please enter valid number"}),
  beds_num: z.number( {message : "please enter number of beds"}).min(1,{message : "please enter valid number"}),
  bathrooms_num: z.number( {message : "please enter number of bathrooms"}).min(1,{message : "please enter valid number"}),
  room_price: z.number({message : "please enter price for your place"}).min(10,{message : "please enter valid price"}),
  room_images: z.array(fileSchema).optional(),
});

export type updatedRoomType = z.infer<typeof updatedRoomSchema>;