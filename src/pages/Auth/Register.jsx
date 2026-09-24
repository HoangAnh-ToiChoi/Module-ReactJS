import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { registerSchema } from "~/validations/authSchema";
import {
  register as AuthRegister,
  infoUser,
} from "~/service/AuthService/AuthService";
import Loading from "~/components/Loading";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
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
  const [successMessage, setSuccessMessage] = useState(false);

  const onSubmit = async (data) => {
    setSuccessMessage(false);
    try {
      await AuthRegister(data);
      setSuccessMessage(true);
      reset();
    } catch (e) {
      const serverErrors = e?.errors || e?.response?.data?.errors;
      const message = e?.message || e?.response?.data?.message;

      if (serverErrors) {
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : messages,
          });
        });
      } else {
        setError("root", {
          message: message || "Đăng ký thất bại, vui lòng thử lại sau!",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full max-w-[400px] flex-col gap-4 overflow-hidden rounded-3xl border border-[#333333] bg-[#181818] p-8 text-white shadow-2xl"
    >
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#181818]/80 backdrop-blur-xs">
          <Loading>Đang đăng ký...</Loading>
        </div>
      )}

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

      {successMessage && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2.5 text-center text-[13px] text-emerald-400">
          Đăng ký thành công. Hãy kiểm tra email để xác thực
        </div>
      )}

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
        disabled={isSubmitting}
        className="mt-2 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Đăng ký
      </Button>

      <Link
        to="/login"
        className="my-3.5 text-center text-[14px] text-neutral-300 transition-colors hover:text-white"
      >
        Bạn đã có tài khoản?{" "}
        <span className="font-semibold text-white underline-offset-4 hover:underline">
          Đăng nhập ngay
        </span>
      </Link>
    </form>
  );
}

export default Register;
