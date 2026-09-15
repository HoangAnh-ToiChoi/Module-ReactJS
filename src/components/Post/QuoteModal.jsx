import {
  ArrowDownUp,
  BarChart2,
  ChevronRight,
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
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useSelectorUser } from "~/features/Auth/Hook";
import { addPost } from "~/features/Post/PostSilce";
import { quotePost } from "~/service/PostService/PostService";
import { formatRelativeTime } from "~/utils/format";

function QuoteModal({ post, onClose }) {
  const authUser = useSelectorUser();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleQuote = async () => {
    try {
      const newPosts = await quotePost(post.id, {
        content: content,
      });
      dispatch(addPost(newPosts));
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-[620px] flex-col overflow-hidden rounded-3xl border border-[#2c2c2c] bg-[#141414] text-white shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-[#222222] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[15px] font-medium text-white transition-colors hover:text-neutral-400"
          >
            Hủy
          </button>

          <h2 className="text-[16px] font-bold tracking-tight text-white">
            Thread mới
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

        {/* Thân Modal (Vùng cuộn nội dung) */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex items-start gap-3">
            {/* Avatar người đăng */}
            <Avatar className="h-10 w-10 shrink-0 cursor-pointer">
              <AvatarImage
                src={authUser?.avatar_url || "https://github.com/shadcn.png"}
                alt={authUser?.username}
              />
              <AvatarFallback className="bg-neutral-800 font-semibold text-white">
                {((authUser?.username || authUser?.name || "U")[0]).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              {/* Tên & Chủ đề */}
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-semibold text-white">
                  {authUser?.username || authUser?.name || "nguoidung"}
                </span>
                <ChevronRight className="h-4 w-4 text-neutral-500" />
                <span className="cursor-pointer text-[14px] text-neutral-400 hover:underline">
                  Cộng đồng hoặc chủ đề
                </span>
              </div>

              {/* Ô soạn thảo suy nghĩ */}
              <textarea
                rows={2}
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Hãy chia sẻ suy nghĩ của bạn..."
                className="mt-1 w-full resize-none bg-transparent text-[15px] leading-relaxed text-white placeholder-neutral-500 outline-none"
              />

              {/* Thanh icon đính kèm */}
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

              {/* Khung xem trước bài viết gốc (Nested Card) */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-[#2e2e2e] bg-[#171717] p-4 text-white">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-6 w-6 shrink-0">
                    <AvatarImage
                      src={post?.user?.avatar_url || "https://github.com/shadcn.png"}
                      alt={post?.user?.username}
                    />
                    <AvatarFallback className="bg-neutral-800 text-[11px] font-semibold text-white">
                      {((post?.user?.username || post?.user?.name || "U")[0]).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="cursor-pointer text-[14px] font-semibold text-white hover:underline">
                    {post?.user?.username || post?.user?.name || "nguoidung"}
                  </span>
                  {post?.created_at && (
                    <span className="text-[13px] text-neutral-500">
                      · {formatRelativeTime(post.created_at)}
                    </span>
                  )}
                </div>

                {post?.content && (
                  <p className="mt-2 text-[14px] leading-relaxed whitespace-pre-line text-[#f3f5f7]">
                    {post.content}
                  </p>
                )}

                {post?.media_urls?.length > 0 && (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-[#262626]">
                    {post.media_urls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`media-${index}`}
                        loading="lazy"
                        className="max-h-[360px] w-full object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="flex items-center justify-between border-t border-[#222222] bg-[#141414] px-6 py-4">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 text-[14px] text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowDownUp className="h-4 w-4" />
            <span>Lựa chọn về bài viết</span>
          </button>

          <button
            type="button"
            className="cursor-pointer rounded-full bg-white px-6 py-2 text-[14px] font-bold text-black transition-transform hover:bg-neutral-200 active:scale-95"
            onClick={handleQuote}
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteModal;
