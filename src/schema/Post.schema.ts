import { z } from "zod";

const postSchema = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

export type Post = z.infer<typeof postSchema>;

export default postSchema;
