import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { loginSchema } from "~/validations/authSchema";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";

import {
  Login as AuthLogin,
  infoUser,
} from "~/service/AuthService/AuthService";
import { useSelectorUser } from "~/features/Auth/Hook";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispacth = useDispatch();
  const currentUser = useSelectorUser();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (location?.state?.verified) setSuccessMessage(true);
  }, [location?.state?.verified]);

  const onSubmit = async (data) => {
    try {
      const { access_token, refresh_token } = await AuthLogin({
        login: data.email,
        password: data.password,
      });
      if (access_token) {
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);
        dispacth(infoUser());
        navigate("/");
      }
    } catch (e) {
      setError("email", { message: "Email hoặc mật khẩu không đúng" });
      setError("password", { message: "Email hoặc mật khẩu không đúng" });
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
          Đăng nhập vào Threads
        </h1>
        <p className="mt-1 text-[13px] text-neutral-400">
          Sử dụng email và mật khẩu của bạn để tiếp tục
        </p>
      </div>

      {successMessage && (
        <div className="rounded-xl border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2.5 text-center text-[13px] text-emerald-400">
          Xác thực email thành công. Bây giờ bạn có thể đăng nhập
        </div>
      )}

      <div className="flex flex-col gap-1">
        <Input
          {...register("email")}
          type="email"
          aria-invalid={!!errors.email}
          placeholder="Tên người dùng hoặc email"
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

      <Button
        type="submit"
        className="mt-2 h-11 w-full cursor-pointer rounded-xl bg-white font-semibold text-black transition-colors hover:bg-neutral-200"
      >
        Đăng nhập
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

export default Login;
