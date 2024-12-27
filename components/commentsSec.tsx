import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import AddComment from "./addComment";
import { getComments } from "@/lib/functions";
import { clerkClient, User } from "@clerk/nextjs/server";

type CommentsSecProps = {
  roomId: string;
};

export default async function CommentsSec({ roomId }: CommentsSecProps) {
  const Id = await roomId;
  const comments = await getComments(Id);
  const commentsWithUserData = await Promise.all(
    comments.map(async (comment) => {
      if(comment.user_id){
      const user = await (await clerkClient()).users.getUser(comment.user_id);
      return {
        ...comment,
        user_name: user?.username,
        user_image: user?.imageUrl ,
      };}else{
        return{
          ...comment,
          user_name: "guest",
          user_image: "/user.png",
        }
      }
    })
  );  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* Add Comment */}
      <AddComment roomId={roomId}/>

      {/* Comments */}
      {commentsWithUserData?.map((comment) => (
        <div key={comment.id}>
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={comment.user_image}
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