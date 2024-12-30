"use client";

import { useActionState, useEffect, useState } from "react";
import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { postCommentSchema } from "@/app/validationShemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Post as PrismaPost,
  Comment as PrismaComment,
  User,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import AlertComponent from "@/app/components/NotificationBox";
import NotificationBox from "@/app/components/NotificationBox";

// Extend the Comment model to include the related User
interface CommentWithUser extends PrismaComment {
  user: User; // Add the User relationship to Comment
}

// Extend the Post model to include the related Comment array
interface PostWithComments extends PrismaPost {
  Comment: CommentWithUser[]; // Use the extended Comment type
}

// Props interface for your component
interface Prop {
  post: PostWithComments; // Use the extended Post type
}
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});
type CommentFormData = z.infer<typeof postCommentSchema>;
const PostComment = ({ post }: Prop) => {
  // get Comments api
  // const {
  //   data: commentsList,
  //   error,
  //   isLoading,
  // } = useQuery<Comment[]>({
  //   queryKey: ["comments", post.id],
  //   queryFn: () =>
  //     axios
  //       .get(`/api/comments/${post.id}`)
  //       .then((res: { data: any }) => res.data),
  //   staleTime: 60 * 1000, // 60s
  //   retry: 3,
  // });
  // Comment form data
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset, // Reset function from useForm
  } = useForm<CommentFormData>({
    defaultValues: {
      content: "",
      postId: undefined, // Set a default postId
      userId: "",
    },
  });
  // Session
  const { status, data: session } = useSession();

  useEffect(() => {
    // Only reset the form when session.user.id is available and different
    if (session?.user?.id && getValues("userId") !== session.user.id) {
      reset({
        content: getValues("content"), // Preserve existing content
        postId: post.id,
        userId: session.user.id,
      });
    }
  }, [session, post.id]);

  // emoji Table Status
  const [emoji, setEmoji] = useState(false);

  const [comments, setComment] = useState("");

  const router = useRouter();

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setValue("content", getValues().content + emojiData.emoji);
  };
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/comments", data);
      setSubmitting(false);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setValue("content", "");
      setEmoji(false);
      // router.push('/issues/list')
      router.refresh();
    } catch (error: any) {
      setSubmitting(false);
      setError("please login first before leave comments");
      setShowNotification(true);
      setEmoji(false);
      // setSubmitting(false)
      // setError('An unexpected error occurred.')
    }
  });

  return (
    <div className="w-full">
      {showAlert && (
        <div
          role="alert"
          className="alert alert-success fixed left-1/2 -translate-x-1/2 top-14 w-96"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your comment has been posted!</span>
        </div>
      )}

      {showNotification && (
        <NotificationBox message={error} onClose={handleCloseNotification} />
      )}

      <p className="font-bold text-xl">Add Comments</p>
      <form onSubmit={onSubmit}>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full"
          placeholder="Leave your comments here"
          {...register("content", { required: "Content is required" })}
          //   value={comments}
          //   onChange={handleTextareaChange}
        ></textarea>
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
        <button
          className="btn text-xl"
          onClick={(event) => {
            event.preventDefault();
            setEmoji(!emoji);
          }}
        >
          emoji
        </button>
        {emoji && (
          <div>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <button
          className="w-full btn btn-neutral text-xl mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <>
              <span className="loading loading-spinner"></span>loading
            </>
          )}
          {!isSubmitting && <span>send</span>}
        </button>
      </form>
      <div>
        <p className="font-bold text-xl">All comments</p>
        <div className="border shadow">
          <div className="">
            {post.Comment.map((comment) => (
              <div key={comment.id}>
                <div className="flex justify-between items-center px-8">
                  <div className="flex items-center gap-2 ">
                    <div className="avatar">
                      <div className="w-8 rounded">
                        <img src={comment.user.image!} className="mx-0 my-0" />
                      </div>
                    </div>
                    <p className="font-semibold">{comment.user.name}</p>
                  </div>

                  <div>
                    {format(new Date(comment.createAt), "MMMM dd, yyyy")}
                  </div>
                </div>
                <div className="border-t"></div>
                <div className="px-8 font-bold">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
