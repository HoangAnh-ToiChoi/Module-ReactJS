import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import useLockBodyScroll from "~/hooks/useLockBodyScroll";
import { REPORT_REASONS } from "~/data/reportReasons";

function ReportModal({ onClose, onSubmitReport }) {
  useLockBodyScroll();
  const { t } = useTranslation();

  const handleSelectReason = (key, reason) => {
    if (onSubmitReport) {
      onSubmitReport(key, reason);
    } else {
      if (onClose) onClose();
    }
  };

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex max-h-[85vh] w-full max-w-[500px] flex-col overflow-hidden rounded-3xl border border-[#262626] bg-[#181818] text-white shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#262626] px-5 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-white transition-colors hover:bg-neutral-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h2 className="text-[16px] font-bold text-white">{t("common.report")}</h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-white transition-colors hover:bg-neutral-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {/* Title & Description */}
          <div className="mb-6 text-center">
            <h3 className="text-[19px] leading-tight font-bold text-white">
              {t("report.title")}
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-neutral-400">
              {t("report.desc")}
            </p>
          </div>

          {/* Reason List */}
          <div className="space-y-1">
            {REPORT_REASONS.map((reason) => (
              <button
                key={reason.key}
                type="button"
                onClick={() => handleSelectReason(reason.key, t(`report.reasons.${reason.key}`, reason.label))}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-3.5 text-left text-[14.5px] font-medium text-[#f3f5f7] transition-colors hover:bg-[#262626] active:scale-[0.99]"
              >
                <span className="pr-4 leading-snug">{t(`report.reasons.${reason.key}`, reason.label)}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportModal;
