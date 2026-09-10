import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { registerSchema } from "~/validations/authSchema";
import {
  register as AuthRegister,
  infoUser,
} from "~/service/AuthService/AuthService";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const dispacth = useDispatch();

  const onSubmit = async (data) => {
    try {
      const { access_token, refresh_token } = await AuthRegister(data);
      if (access_token) {
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        dispacth(infoUser());
        navigate("/");
      }
    } catch (e) {
      if (e?.errors) {
        Object.entries(e.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : messages,
          });
        });
      } else {
        setError("root", {
          message: e?.message || "Đăng ký thất bại, vui lòng thử lại sau!",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full max-w-[400px] flex-col gap-4 rounded-3xl border border-[#333333] bg-[#181818] p-8 text-white shadow-2xl"
    >
      <Link
        to="/"
        className="absolute top-5 right-5 text-neutral-400 transition-colors hover:text-white"
      >
        <X className="h-5 w-5" />
      </Link>

      <div className="mb-2 text-center">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Đăng Ký Tài Khoản Threads
        </h1>
        <p className="mt-1 text-[13px] text-neutral-400">
          Nhập đầy đủ thông tin của bạn để tiếp tục
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          {...register("username")}
          type="text"
          aria-invalid={!!errors.username}
          placeholder="Tên người dùng"
          className="h-11 rounded-lg border-[#333333] bg-[#101010] px-3.5 py-3 text-[14px] text-white placeholder-neutral-500 focus-visible:border-neutral-400 focus-visible:ring-0"
        />
        {errors.username && (
          <span className="text-[12px] text-red-500">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          {...register("email")}
          type="email"
          aria-invalid={!!errors.email}
          placeholder="email"
          className="h-11 rounded-lg border-[#333333] bg-[#101010] px-3.5 py-3 text-[14px] text-white placeholder-neutral-500 focus-visible:border-neutral-400 focus-visible:ring-0"
        />
        {errors.email && (
          <span className="text-[12px] text-red-500">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          {...register("password")}
          aria-invalid={!!errors.password}
          type="password"
          placeholder="Mật khẩu"
          className="h-11 rounded-lg border-[#333333] bg-[#101010] px-3.5 py-3 text-[14px] text-white placeholder-neutral-500 focus-visible:border-neutral-400 focus-visible:ring-0"
        />
        {errors.password && (
          <span className="text-[12px] text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Input
          {...register("password_confirmation")}
          aria-invalid={!!errors.password_confirmation}
          type="password"
          placeholder="Xác Nhận Mật khẩu"
          className="h-11 rounded-lg border-[#333333] bg-[#101010] px-3.5 py-3 text-[14px] text-white placeholder-neutral-500 focus-visible:border-neutral-400 focus-visible:ring-0"
        />
        {errors.password_confirmation && (
          <span className="text-[12px] text-red-500">
            {errors.password_confirmation.message}
          </span>
        )}
      </div>

      {errors.root && (
        <p className="text-center text-[13px] text-red-500">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        className="mt-2 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 active:scale-[0.98]"
      >
        Đăng ký
      </Button>

      <Link
        to="/forgotpassword"
        className="mt-1 text-center text-[13px] text-neutral-400 transition-colors hover:text-white"
      >
        Quên mật khẩu?
      </Link>

      <div className="my-1 flex items-center">
        <div className="flex-1 border-t border-[#2a2a2a]"></div>
        <span className="px-3 text-[12px] text-neutral-500">hoặc</span>
        <div className="flex-1 border-t border-[#2a2a2a]"></div>
      </div>

      <Link
        to="/register"
        className="text-center text-[14px] text-neutral-300 transition-colors hover:text-white"
      >
        Chưa có tài khoản?{" "}
        <span className="font-semibold text-white underline-offset-4 hover:underline">
          Đăng ký
        </span>
      </Link>
    </form>
  );
}

export default Register;
