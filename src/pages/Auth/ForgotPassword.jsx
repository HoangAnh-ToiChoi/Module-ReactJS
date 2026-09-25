import { zodResolver } from "@hookform/resolvers/zod";
import { X, MailCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Loading from "~/components/Loading";
import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { forgotPasswordSchema } from "~/validations/authSchema";
import { forgotPassword } from "~/service/AuthService/AuthService";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";

function ForgotPassword() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [isOpen, setOpen] = useState(false);

  const onSubmit = async (email) => {
    try {
      await forgotPassword(email);
      localStorage.setItem("email", JSON.stringify(email));
      setOpen(true);
    } catch (e) {
      setError("email", { message: "Email không đúng" });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full max-w-[400px] flex-col gap-4 overflow-hidden rounded-3xl border border-[#333333] bg-[#181818] p-8 text-white shadow-2xl"
      >
        {isSubmitting && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#181818]/80 backdrop-blur-xs">
            <Loading>{t("auth.sending_request")}</Loading>
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
            {t("auth.forgot_password_title")}
          </h1>
          <p className="mt-1 text-[13px] text-neutral-400">
            {t("auth.forgot_password_subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            {...register("email")}
            type="email"
            aria-invalid={!!errors.email}
            placeholder={t("auth.email_placeholder")}
            className="h-11 rounded-lg border-[#333333] bg-[#101010] px-3.5 py-3 text-[14px] text-white placeholder-neutral-500 focus-visible:border-neutral-400 focus-visible:ring-0"
          />
          {errors.email && (
            <span className="text-[12px] text-red-500">
              {errors.email.message}
            </span>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("common.continue")}
          </Button>

          <Link
            to="/login"
            className="my-3.5 text-center text-[14px] text-neutral-300 transition-colors hover:text-white"
          >
            <span className="font-semibold text-white underline-offset-4 hover:underline">
              {t("auth.back_to_login")}
            </span>
          </Link>
        </div>
      </form>

      {isOpen && (
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
          <AlertDialogContent className="w-full max-w-[400px] rounded-3xl border border-[#333333] bg-[#181818] p-8 text-white shadow-2xl">
            <AlertDialogHeader className="flex flex-col items-center gap-3 text-center sm:text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#333333] bg-[#222222] text-white shadow-inner">
                <MailCheck className="h-7 w-7 text-white" />
              </div>
              <AlertDialogTitle className="text-xl font-bold tracking-tight text-white">
                {t("auth.send_email_success_title")}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[13px] leading-relaxed text-neutral-400">
                {t("auth.send_email_success_desc")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="-mx-0 mt-3 -mb-0 border-none bg-transparent p-0 sm:justify-center">
              <AlertDialogAction
                onClick={() => {
                  setOpen(false);
                }}
                className="h-11 w-full cursor-pointer rounded-xl bg-white font-semibold text-black transition-colors hover:bg-neutral-200 active:scale-[0.98]"
              >
                {t("common.understood")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default ForgotPassword;
