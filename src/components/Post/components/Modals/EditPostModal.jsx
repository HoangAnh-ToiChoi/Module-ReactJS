import {
  BarChart2,
  FileText,
  Film,
  Image as ImageIcon,
  MapPin,
  Music,
  Smile,
  Sticker,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import useLockBodyScroll from "~/hooks/useLockBodyScroll";
import { formatRelativeTime } from "~/utils/format";

function EditPostModal({ post, onClose, onSubmit }) {
  const [content, setContent] = useState(post?.content || "");
  const [mediaItems, setMediaItems] = useState(() => {
    return (post?.media_urls || []).map((url) => ({
      file: null,
      preview: url,
    }));
  });
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  useLockBodyScroll();

  useEffect(() => {
    if (!textAreaRef) return;
    const valueLength = textAreaRef.current.value.length;
    textAreaRef.current.setSelectionRange(valueLength, valueLength);
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems = files.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setMediaItems((prev) => [...prev, ...newItems]);
  };

  const handleRemoveMedia = (indexToRemove) => {
    setMediaItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleUpdateContent = () => {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("content", content);
    formData.append("reply_permission", post?.reply_permission || "");
    formData.append("topic_name", post?.topic_id || "");

    mediaItems.forEach((item) => {
      if (item.file) {
        formData.append("media[]", item.file);
      }
    });

    if (onSubmit) {
      onSubmit(post.id, formData);
      onClose();
    }
  };

  const authorName = post?.user?.username || "nguoidung";
  return (
    <div className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs duration-200">
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
            Chỉnh sửa bài viết
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-neutral-400 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 shrink-0 cursor-pointer">
              <AvatarImage
                src={post?.user?.avatar_url || "https://github.com/shadcn.png"}
                alt={authorName}
              />
              <AvatarFallback className="bg-neutral-800 font-semibold text-white">
                {authorName[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
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

              <textarea
                ref={textAreaRef}
                rows={4}
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Chỉnh sửa bài viết..."
                className="mt-1 w-full resize-none bg-transparent text-[15px] leading-relaxed text-white placeholder-neutral-500 outline-none"
              />

              {mediaItems?.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-[#262626] p-2">
                  {mediaItems.map((url, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl"
                    >
                      <img
                        src={url}
                        alt={`media-${index}`}
                        className="h-40 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(index)}
                        className="absolute top-2 right-2 cursor-pointer rounded-full bg-black/70 p-1.5 text-white transition-transform hover:scale-110 hover:bg-black active:scale-95"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />

              <div className="mt-3 flex items-center gap-4 text-neutral-500">
                <button
                  type="button"
                  title="Ảnh"
                  onClick={() => fileInputRef.current?.click()}
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

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[#222222] bg-[#141414] px-6 py-4">
          <button
            type="button"
            onClick={handleUpdateContent}
            className="cursor-pointer rounded-full bg-white px-6 py-2 text-[14px] font-bold text-black transition-transform hover:bg-neutral-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
