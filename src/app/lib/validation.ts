import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username harus memiliki minimal 3 karakter"),
  password: z.string().min(6, "Password harus memiliki minimal 6 karakter"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
