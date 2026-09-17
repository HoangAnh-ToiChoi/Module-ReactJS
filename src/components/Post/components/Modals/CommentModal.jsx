import {
  ArrowDownUp,
  BarChart2,
  FileText,
  Film,
  Image as ImageIcon,
  MapPin,
  MoreHorizontal,
  Music,
  Smile,
  Sticker,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useSelectorUser } from "~/features/Auth/Hook";
import useLockBodyScroll from "~/hooks/useLockBodyScroll";
import { formatRelativeTime } from "~/utils/format";

function CommentModal({ post, onClose, onSubmit }) {
  const authUser = useSelectorUser();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useLockBodyScroll();

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      if (onSubmit) {
        await onSubmit(content);
      }
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Đã xảy ra lỗi khi đăng trả lời. Vui lòng thử lại!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const authorName = post?.user?.username || post?.user?.name || "nguoidung";
  const authUserName = authUser?.username || authUser?.name || "nguoidung";

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-[620px] flex-col overflow-hidden rounded-3xl border border-[#2c2c2c] bg-[#141414] text-white shadow-2xl duration-150"
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
            Trả lời
          </h2>

          <div className="flex items-center gap-2 text-neutral-400">
            <button
              type="button"
              className="cursor-pointer rounded-full p-1 transition-colors hover:text-white"
            >
              <FileText className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full p-1 transition-colors hover:text-white"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[13.5px] text-red-400">
              {error}
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <Avatar className="h-10 w-10 shrink-0 cursor-pointer">
                <AvatarImage
                  src={
                    post?.user?.avatar_url || "https://github.com/shadcn.png"
                  }
                  alt={authorName}
                />
                <AvatarFallback className="bg-neutral-800 font-semibold text-white">
                  {authorName[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="my-1.5 min-h-[32px] w-[2px] flex-1 rounded-full bg-[#333333]" />
            </div>

            <div className="min-w-0 flex-1 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-white">
                    {authorName}
                  </span>
                  {post?.created_at && (
                    <span className="text-[13px] text-neutral-500">
                      {formatRelativeTime(post.created_at)}
                    </span>
                  )}
                </div>
              </div>

              {post?.content && (
                <p className="mt-1 text-[15px] leading-relaxed text-[#f3f5f7]">
                  {post.content}
                </p>
              )}

              {post?.media_urls?.length > 0 && (
                <div className="mt-2 overflow-hidden rounded-2xl border border-[#262626]">
                  {post.media_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`media-${index}`}
                      loading="lazy"
                      className="max-h-[200px] w-full object-cover"
                    />
                  ))}
                </div>
              )}

              <p className="mt-2.5 text-[13px] text-neutral-500">
                Đang trả lời{" "}
                <span className="text-sky-500 hover:underline">
                  @{authorName}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <Avatar className="h-10 w-10 shrink-0 cursor-pointer">
              <AvatarImage
                src={authUser?.avatar_url || "https://github.com/shadcn.png"}
                alt={authUserName}
              />
              <AvatarFallback className="bg-neutral-800 font-semibold text-white">
                {authUserName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <span className="text-[15px] font-semibold text-white">
                {authUserName}
              </span>

              <textarea
                rows={3}
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Trả lời ${authorName}...`}
                className="mt-1 w-full resize-none bg-transparent text-[15px] leading-relaxed text-white placeholder-neutral-500 outline-none"
              />

              <div className="mt-2 flex items-center gap-4 text-neutral-500">
                <button
                  type="button"
                  title="Ảnh"
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  title="GIF"
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <Film className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  title="Emoji"
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <Smile className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  title="Nhãn dán"
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <Sticker className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  title="Bình chọn"
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <BarChart2 className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  title="Tài liệu"
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <FileText className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  title="Vị trí"
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <MapPin className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  title="Âm nhạc"
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  <Music className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#222222] bg-[#141414] px-6 py-4">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 text-[14px] text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowDownUp className="h-4 w-4" />
            <span>Bất kỳ ai cũng có thể trả lời</span>
          </button>

          <button
            type="button"
            disabled={!content.trim() || isSubmitting}
            className="cursor-pointer rounded-full bg-white px-6 py-2 text-[14px] font-bold text-black transition-transform hover:bg-neutral-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Đang đăng..." : "Đăng"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
