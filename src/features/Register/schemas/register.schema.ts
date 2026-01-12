import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirm_password: z
      .string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
