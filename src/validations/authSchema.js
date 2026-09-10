import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập Email!"),
  password: z.string().min(1, "Vui lòng nhập Mật khẩu!"),
});

export const registerSchema = z
  .object({
    username: z.string().min(1, "Vui lòng nhập tên đăng nhập"),
    email: z.string().min(1, "Vui lòng nhập Email!"),
    password: z.string().min(8, "Mật khẩu tối thiểu phải 8 ký tự"),
    password_confirmation: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu không khớp",
    path: ["password_confirmation"],
  });
