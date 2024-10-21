import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "请填写邮箱",
    })
    .max(320, {
      message: "邮箱长度不能超过320个字符",
    }),
  password: z
    .string()
    .min(1, {
      message: "请填写密码",
    })
    .max(255, {
      message: "密码长度不能超过255个字符",
    }),
});

export const RegisterFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "请填写邮箱",
    })
    .max(320, {
      message: "邮箱长度不能超过320个字符",
    }),
  password: z
    .string()
    .min(1, {
      message: "请填写密码",
    })
    .max(255, {
      message: "密码长度不能超过255个字符",
    }),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
export type RegisterForm = z.infer<typeof RegisterFormSchema>;
