"use client";
import Image from "next/image";
import { addComment } from "@/lib/actions";
import { useActionState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { useUser } from "@clerk/nextjs";

type AddCommentProps = {
  roomId: string;
};

export default function AddComment({ roomId }: AddCommentProps) {
  const {user} = useUser()
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [error, formAction] = useActionState(async (previousState: any, formData: FormData) => {
    await addComment(previousState, formData);
    if (textareaRef.current) textareaRef.current.value = '';
  }, null);

  return (
    <div className="flex items-start gap-3">
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={user ? user.imageUrl : "/user.png"}
          alt="image"
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
      </div>
      <form action={formAction} className="relative w-full">
        <input type="hidden" name="roomId" value={roomId} />
        <input type="hidden" name="userId" value={user?.id || ""} />
        <textarea
          placeholder="Write your comment"
          name="comment"
          ref={textareaRef}
          required
          className="w-full resize-none outline-none border border-[#6e6e6e] rounded-2xl pl-5 p-3"
        />
        <button type="submit">
          <IoMdSend size={23} className="absolute right-3 bottom-4 " />
        </button>
      </form>
    </div>
  );
}