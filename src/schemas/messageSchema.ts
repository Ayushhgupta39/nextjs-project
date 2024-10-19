import { z } from "zod";

export const MessageSchema = z.object({
  content: z
    .string()
    .min(5, "Message must be atleast of 5 characters.")
    .max(300, "Message cannot be more than 300 characters"),
});
