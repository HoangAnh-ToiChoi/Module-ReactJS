import { useTranslation } from "react-i18next";
import useLockBodyScroll from "~/hooks/useLockBodyScroll";

function DeleteModal({ post, onClose, onSubmit }) {
  useLockBodyScroll();
  const { t } = useTranslation();

  const handleDeleting = async () => {
    try {
      const method = {
        _method: "DELETE",
      };
      await onSubmit(post.id, method);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative w-[340px] max-w-[calc(100vw-32px)] overflow-hidden rounded-3xl border border-[#2e2e2e] bg-[#181818] text-white shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-[116px] flex-col justify-center p-6 pb-5 text-center">
          <h2 className="mb-2 text-[17px] font-bold text-white">
            {t("post.delete_title")}
          </h2>
          <p className="px-1 text-[14px] leading-relaxed text-neutral-400">
            {t("post.delete_desc")}
          </p>
        </div>

        <div className="grid grid-cols-2 border-t border-[#2e2e2e]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 cursor-pointer items-center justify-center border-r border-[#2e2e2e] text-[15px] font-bold text-white transition-colors hover:bg-neutral-800/50 active:scale-95"
          >
            {t("common.cancel")}
          </button>
          <button
            type="button"
            onClick={handleDeleting}
            className="flex h-12 cursor-pointer items-center justify-center text-[15px] font-bold text-red-500 transition-colors hover:bg-neutral-800/50 active:scale-95 disabled:opacity-50"
          >
            {t("common.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
