"use client";

import { addComment } from "@/lib/actions";
import { getComments } from "@/lib/functions";
import {  formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoMdSend } from "react-icons/io";

type Comment = {
  id: string;
  user_name: string;
  comment: string;
  created_at: string;
};

type CommentsSecProps = {
  roomId: string;
};

export default function CommentsSec({ roomId }: CommentsSecProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, formAction] = useFormState(async (previousState: any, formData: FormData) => {
    await addComment(previousState, formData);
    if(textareaRef.current) textareaRef.current.value = '';
  }, null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(roomId);
      setComments(data);
    };

    fetchComments();
  }, [roomId, comments]);

  return (
    <div className="grid grid-cols-3 gap-10">
      {/* Add Comment */}
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
            alt="image"
            width={200}
            height={200}
            className="h-full rounded-full object-cover"
          />
        </div>
        <form action={formAction} className="relative w-full">
          <input type="hidden" name="roomId" value={roomId} />
          <textarea
            placeholder="Write your comment"
            name="comment"
            ref={textareaRef}
            className="w-full resize-none outline-none border border-[#6e6e6e] rounded-2xl pl-5 p-3"
          />
          <button type="submit">
            <IoMdSend size={23} className="absolute right-3 bottom-4 " />
          </button>
        </form>
      </div>

      {/* Comments */}
      {comments?.map((comment) => (
        <div key={comment.id}>
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={"/65214d06-ffb4-4b70-93c0-01d368e76649.webp"}
                alt="Profile image"
                width={200}
                height={200}
                className="h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-base capitalize">{comment.user_name}</h1>
              <h2 className="font-light text-sm text-[#6e6e6e]">
                {formatDistanceToNow(new Date(comment.created_at), {
                  addSuffix: true,
                })}
              </h2>
            </div>
          </div>
          <p className="text-base font-light pt-2 pl-14">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}
