import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name harus memiliki minimal 3 karakter"),
  password: z.string().min(6, "Password harus memiliki minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password dan Konfirmasi Password tidak cocok",
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;
