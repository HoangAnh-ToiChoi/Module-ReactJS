import { ChevronRight, X } from "lucide-react";
import { Link } from "react-router";
import { BsThreads } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import useLockBodyScroll from "~/hooks/useLockBodyScroll";

function NotificationModal({ onClose, icon, type = "", children }) {
  useLockBodyScroll();
  const { t } = useTranslation();

  const title = t(`notifications.${type}_title`, { defaultValue: "" });
  const description = t(`notifications.${type}_desc`, { defaultValue: "" });

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex w-[440px] max-w-[calc(100vw-32px)] flex-col items-center overflow-hidden rounded-[32px] border border-[#2a2a2a] bg-[#141414] p-8 text-center text-white shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 cursor-pointer text-neutral-400 transition-colors hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mt-2 mb-6 flex items-center justify-center">
          {icon || (
            <svg
              className="h-14 w-14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#ig-heart-gradient)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient
                  id="ig-heart-gradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="25%" stopColor="#fa7e1e" />
                  <stop offset="50%" stopColor="#d62976" />
                  <stop offset="75%" stopColor="#962fbf" />
                  <stop offset="100%" stopColor="#4f5bd5" />
                </linearGradient>
              </defs>
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          )}
        </div>

        <div className="flex min-h-[120px] w-full flex-col justify-center">
          {children || (
            <>
              <h2 className="whitespace-pre-line px-2 text-[24px] leading-snug font-extrabold tracking-tight text-white sm:text-[26px]">
                {title}
              </h2>
              {description && (
                <p className="mt-2 px-4 text-[14px] leading-relaxed text-neutral-400">
                  {description}
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-7 flex w-full flex-col gap-3.5">
          <Link
            to="/login"
            className="group flex w-full items-center justify-between rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] px-5 py-4 transition-colors hover:bg-[#222222]"
            onClick={onClose}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-black shadow-md">
                <BsThreads className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1 text-left">
                <div className="text-[15px] leading-tight font-semibold text-white">
                  {t("auth.login_threads")}
                </div>
                <div className="text-[13px] leading-normal text-neutral-400">
                  {t("auth.use_account")}
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="text-center text-[13px] text-neutral-400">
            {t("auth.no_account")}{" "}
            <Link
              to="/register"
              onClick={onClose}
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              {t("auth.register_now")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
