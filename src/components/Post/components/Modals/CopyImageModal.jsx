import { toPng } from "html-to-image";
import { Download, Share2, X } from "lucide-react";
import { useRef, useState } from "react";

import useLockBodyScroll from "~/hooks/useLockBodyScroll";
import PostPreviewContent from "./PostPreviewContent";

function CopyImageModal({ post, onClose }) {
  const postPreviewRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  useLockBodyScroll();

  const username = post?.user?.username || "nguoidung";

  const handleDownloadImg = async () => {
    if (!postPreviewRef.current || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    try {
      const dataUrl = await toPng(postPreviewRef.current, {
        cacheBust: true,
        useCORS: true,
        skipFonts: true,
        backgroundColor: "#101010",
        style: { margin: "0" },
        imagePlaceholder:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      });

      const link = document.createElement("a");
      link.download = `threads-${username}-${post?.id || "card"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      setError("Không thể tải ảnh bài viết. Vui lòng thử lại!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-[540px] flex-col overflow-hidden rounded-3xl border border-[#2c2c2c] bg-[#141414] text-white shadow-2xl duration-150"
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
            Tải ảnh bài viết
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
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[13.5px] text-red-400">
              {error}
            </div>
          )}
          <div
            id="post-export-card"
            ref={postPreviewRef}
            className="relative overflow-hidden rounded-3xl border border-[#2a2a2a] bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#101010] p-6 text-white shadow-2xl"
          >
            <PostPreviewContent
              post={post}
              showUsernameSubtitle={true}
              avatarSize="h-11 w-11"
              mediaMaxHeight="max-h-[360px]"
              contentClassName="mt-4 text-[15px] leading-relaxed text-[#f3f5f7]"
            />

            <div className="mt-6 flex items-center justify-between border-t border-[#262626] pt-4 text-[12px] text-neutral-500">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Share2 className="h-4 w-4" />
                <span>Threads</span>
              </div>
              <span>@{username}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-[#222222] bg-[#141414] px-6 py-4">
          <button
            type="button"
            disabled={isGenerating}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[14px] font-bold text-black transition-transform hover:bg-neutral-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleDownloadImg}
          >
            <Download className="h-4 w-4" />
            <span>{isGenerating ? "Đang tạo ảnh..." : "Tải xuống"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CopyImageModal;
