import copy from "copy-to-clipboard";
import { Check, Heart, MessageCircle, Repeat2, Send, X } from "lucide-react";
import { useState } from "react";
import useLockBodyScroll from "~/hooks/useLockBodyScroll";
import { formatCount } from "~/utils/format";
import PostPreviewContent from "./PostPreviewContent";

function EmbedModal({ post, onClose }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(null);

  useLockBodyScroll();

  const username = post?.user?.username || "nguoidung";
  const embedUrl = `${window.location.origin}/${username}/post/${post?.id || "1"}/embed`;
  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="500" frameborder="0" scrolling="no"></iframe>`;

  const handleCopyEmbed = async () => {
    setCopyError(null);
    try {
      const isSuccess = await copy(iframeCode);
      if (isSuccess) {
        setCopied(true);
      } else {
        setCopyError("Không thể sao chép mã nhúng");
      }
    } catch (e) {
      setCopyError("Lỗi hệ thống khi sao chép mã nhúng");
    }
  };

  const formattedDate = post?.created_at
    ? new Date(post.created_at).toLocaleString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "06:12 · 16-09-2026";

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-3xl border border-[#2c2c2c] bg-[#141414] text-white shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#222222] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[15px] font-medium text-white transition-colors hover:text-neutral-400"
          >
            Hủy
          </button>

          <h2 className="text-[16px] font-bold tracking-tight text-white">
            Mã nhúng
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-neutral-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-6">
          {copyError && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[13.5px] text-red-400">
              {copyError}
            </div>
          )}

          <div className="overflow-hidden rounded-2xl bg-white p-5 text-black shadow-md">
            <PostPreviewContent
              post={post}
              authorClassName="text-neutral-900 font-bold"
              contentClassName="mt-1 text-[15px] leading-relaxed text-neutral-900"
              mediaMaxHeight="max-h-[380px]"
            />

            <div className="mt-4 text-[13px] text-neutral-500">
              {formattedDate}
            </div>

            <div className="mt-3 flex items-center gap-5 border-t border-neutral-100 pt-3 text-neutral-600">
              <div className="flex items-center gap-1 text-[13px]">
                <Heart className="h-4 w-4" />
                <span>{formatCount(post?.likes_count || 0)}</span>
              </div>
              <div className="flex items-center gap-1 text-[13px]">
                <MessageCircle className="h-4 w-4" />
                <span>{formatCount(post?.replies_count || 0)}</span>
              </div>
              <div className="flex items-center gap-1 text-[13px]">
                <Repeat2 className="h-4 w-4" />
                <span>{formatCount(post?.reposts_and_quotes_count || 0)}</span>
              </div>
              <div className="flex items-center gap-1 text-[13px]">
                <Send className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#282828] bg-[#1a1a1a] p-3.5">
            <div className="min-w-0 flex-1 truncate font-mono text-[13px] text-neutral-300">
              {iframeCode}
            </div>

            <button
              type="button"
              onClick={handleCopyEmbed}
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[13.5px] font-bold text-black transition-transform hover:bg-neutral-200 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Đã chép</span>
                </>
              ) : (
                <span>Sao chép</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmbedModal;
