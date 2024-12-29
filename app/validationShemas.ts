import { z } from "zod";

export const postCommentSchema = z.object({
    content: z.string().min(1, "Content is required").max(65535),
    postId: z.number().int().positive("Post ID must be a positive integer"),
    userId: z.string().nonempty("User ID is required")
})