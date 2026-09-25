import { AlertCircle, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import useLockBodyScroll from "~/hooks/useLockBodyScroll";

function ReportSuccessModal({
  title,
  description,
  isError = false,
  onClose,
}) {
  useLockBodyScroll();
  const { t } = useTranslation();

  const finalTitle = title || t("report.thank_you_title");
  const finalDesc = description || t("report.thank_you_desc");

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex w-full max-w-[420px] flex-col items-center rounded-3xl border border-[#2e2e2e] bg-[#242424] p-6 text-center text-white shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Circle Icon */}
        {isError ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-red-400">
            <AlertCircle className="h-7 w-7" />
          </div>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#242424]">
              <Check className="h-6 w-6 stroke-[3] text-pink-500" />
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="mt-5 text-[19px] font-bold tracking-tight text-white">
          {finalTitle}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[13.5px] leading-relaxed text-neutral-400">
          {finalDesc}
        </p>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 h-12 w-full cursor-pointer rounded-2xl bg-white text-[15px] font-bold text-black transition-transform hover:opacity-90 active:scale-[0.99]"
        >
          {t("common.done")}
        </button>
      </div>
    </div>
  );
}

export default ReportSuccessModal;
