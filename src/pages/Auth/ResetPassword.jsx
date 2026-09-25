import { useNavigate, useSearchParams, Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { resetPasswordSchema } from "~/validations/authSchema";
import {
  resetPassword,
  validateToken,
} from "~/service/AuthService/AuthService";
import Loading from "~/components/Loading";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";

function ResetPassword() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");

  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("root", {
        message: "Liên kết đã hết hạn hoặc không hợp lệ",
      });
      setOpen(true);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const response = await validateToken(token);

        if (!response?.valid) {
          setError("root", {
            message: "Liên kết đã hết hạn hoặc không hợp lệ",
          });
          setOpen(true);
        }
      } catch (e) {
        setError("root", {
          message: "Liên kết đã hết hạn hoặc không hợp lệ",
        });
        setOpen(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, setError]);

  const email = localStorage.getItem("email");

  const onSubmit = async (user) => {
    const payload = {
      token,
      email,
      password: user.password,
      password_confirmation: user.password_confirmation,
    };
    try {
      await resetPassword(payload);
      localStorage.removeItem("email");
      navigate("/login", {
        state: {
          message: "Đặt lại mật khẩu thành công",
        },
      });
    } catch (e) {
      const errorData = e?.response?.data;

      if (errorData?.errors) {
        Object.entries(errorData.errors).forEach(([field, messages]) => {
          setError(field, {
            type: "server",
            message: Array.isArray(messages) ? messages[0] : messages,
          });
        });
      } else {
        setError("root", {
          type: "server",
          message:
            errorData?.message ||
            "Đã có lỗi xảy ra trong quá trình đặt lại mật khẩu. Vui lòng thử lại sau!",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-[400px] max-w-[calc(100vw-32px)] flex-col gap-4 overflow-hidden rounded-3xl border border-[#333333] bg-[#181818] p-8 text-white shadow-2xl"
    >
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#181818]/80 backdrop-blur-xs">
          <Loading>{t("auth.updating_password")}</Loading>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#181818]/80 backdrop-blur-xs">
          <Loading>{t("auth.authenticating_link")}</Loading>
        </div>
      )}

      <Link
        to="/"
        className="absolute top-5 right-5 text-neutral-400 transition-colors hover:text-white"
      >
        <X className="h-5 w-5" />
      </Link>

      <div className="mb-2 flex min-h-[58px] flex-col justify-center text-center">
        <h1 className="text-xl font-bold tracking-tight text-white">
          {t("auth.reset_password_title")}
        </h1>
        <p className="mt-1 text-[13px] text-neutral-400">
          {t("auth.reset_password_subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          {...register("password")}
          aria-invalid={!!errors.password}
          type="password"
          placeholder={t("auth.new_password_placeholder")}
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
          placeholder={t("auth.confirm_new_password_placeholder")}
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
        {t("auth.reset_password_title")}
      </Button>

      <Link
        to="/login"
        className="my-3.5 text-center text-[14px] text-neutral-300 transition-colors hover:text-white"
      >
        {t("auth.remember_password")}{" "}
        <span className="font-semibold text-white underline-offset-4 hover:underline">
          {t("auth.login_now")}
        </span>
      </Link>

      {isOpen && (
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
          <AlertDialogContent className="w-[400px] max-w-[calc(100vw-32px)] rounded-3xl border border-[#333333] bg-[#181818] p-8 text-white shadow-2xl">
            <AlertDialogHeader className="flex flex-col items-center gap-3 text-center sm:text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-inner">
                <CircleAlert className="h-7 w-7" />
              </div>
              <AlertDialogTitle className="text-lg font-bold tracking-tight text-white sm:text-xl">
                {t("auth.invalid_or_expired_link")}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[13px] leading-relaxed text-neutral-400">
                {t("auth.invalid_or_expired_link_desc")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="-mx-0 mt-3 -mb-0 border-none bg-transparent p-0 sm:justify-center">
              <AlertDialogAction
                onClick={() => {
                  setOpen(false);
                  navigate("/forgotpassword");
                }}
                className="h-11 w-full cursor-pointer rounded-xl bg-white text-[14px] font-semibold text-black transition-colors hover:bg-neutral-200 active:scale-[0.98]"
              >
                {t("auth.request_new_link")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </form>
  );
}

export default ResetPassword;
