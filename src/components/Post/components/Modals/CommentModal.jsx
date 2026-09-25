import {
  ArrowDownUp,
  BarChart2,
  FileText,
  Film,
  Hash,
  Image as ImageIcon,
  MapPin,
  MoreHorizontal,
  Plus,
  Smile,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useSelectorUser } from "~/features/Auth/Hook";
import useLockBodyScroll from "~/hooks/useLockBodyScroll";
import PostPreviewContent from "./PostPreviewContent";
import { getComment } from "~/service/PostService/PostService";
import { formatRelativeTime } from "~/utils/format";
import { useTranslation } from "react-i18next";

function CommentModal({ post, onClose, onSubmit }) {
  const { t } = useTranslation();
  const authUser = useSelectorUser();
  const [threadItems, setThreadItems] = useState([
    { id: 1, content: "", topic: "", showTopicInput: false },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState([]);
  const [error, setError] = useState(null);

  useLockBodyScroll();

  useEffect(() => {
    handleComment();
  }, [post?.id]);

  const handleComment = async () => {
    if (!post?.id) return;
    try {
      const data = await getComment(post.id);
      console.log(data);

      setComment(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleContentChange = (index, value) => {
    setThreadItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], content: value };
      return next;
    });
  };

  const handleTopicChange = (index, value) => {
    setThreadItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], topic: value };
      return next;
    });
  };

  const toggleTopicInput = (index) => {
    setThreadItems((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        showTopicInput: !next[index].showTopicInput,
      };
      return next;
    });
  };

  const handleAddThread = () => {
    setThreadItems((prev) => [
      ...prev,
      { id: Date.now(), content: "", topic: "", showTopicInput: false },
    ]);
  };

  const handleRemoveThread = (index) => {
    if (threadItems.length <= 1) return;
    setThreadItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMediaChange = (index, files) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);
    const previews = fileList.map((file) => URL.createObjectURL(file));

    setThreadItems((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        mediaFiles: [...(next[index].mediaFiles || []), ...fileList],
        mediaPreviews: [...(next[index].mediaPreviews || []), ...previews],
      };
      return next;
    });
  };

  const handleRemoveMedia = (itemIndex, mediaIndex) => {
    setThreadItems((prev) => {
      const next = [...prev];
      const targetItem = next[itemIndex];
      const updatedFiles = (targetItem.mediaFiles || []).filter(
        (_, i) => i !== mediaIndex,
      );
      const updatedPreviews = (targetItem.mediaPreviews || []).filter(
        (_, i) => i !== mediaIndex,
      );
      next[itemIndex] = {
        ...targetItem,
        mediaFiles: updatedFiles,
        mediaPreviews: updatedPreviews,
      };
      return next;
    });
  };

  const handleSubmit = async () => {
    const firstContent = threadItems[0]?.content?.trim();
    if (!firstContent) return;

    setIsSubmitting(true);
    setError(null);
    try {
      for (const item of threadItems) {
        if (!item.content.trim()) continue;

        const formData = new FormData();
        formData.append("content", item.content.trim());

        if (item.mediaFiles?.length > 0) {
          item.mediaFiles.forEach((file) => {
            formData.append("media[]", file);
          });
        }

        if (onSubmit) {
          await onSubmit(formData);
        }
      }
      await handleComment();
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

  const isPostDisabled = !threadItems.some((item) => item.content.trim());

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-[600px] flex-col overflow-hidden rounded-3xl border border-[#262626] bg-[#121212] text-white shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#222222] bg-[#121212] px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[14.5px] font-medium text-neutral-400 transition-colors hover:text-white"
          >
            {t("common.cancel")}
          </button>

          <h2 className="text-[16px] font-bold tracking-tight text-white">
            {t("common.reply")}
          </h2>

          <div className="flex items-center gap-2.5 text-neutral-400">
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

          <PostPreviewContent post={post} showLine={true} showReplyTo={true} />

          {comment.length > 0 && (
            <div className="my-3 flex flex-col gap-3 rounded-2xl border border-[#242424] bg-[#181818] p-3.5">
              <h4 className="text-[13px] font-semibold text-neutral-400">
                {t("post.previous_comments")} ({comment.length})
              </h4>
              <div className="flex max-h-[200px] flex-col gap-2.5 overflow-y-auto pr-1">
                {comment.map((c) => (
                  <div
                    key={c.id || Math.random()}
                    className="flex items-start gap-3 rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] p-3"
                  >
                    <Avatar className="h-8 w-8 shrink-0 border border-[#333333]">
                      <AvatarImage
                        src={
                          c.user?.avatar_url || "https://github.com/shadcn.png"
                        }
                        alt={c.user?.username || "user"}
                      />
                      <AvatarFallback className="bg-neutral-800 text-[11px] font-semibold text-white">
                        {(c.user?.username ||
                          c.user?.name ||
                          "U")[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[13.5px] font-semibold text-white">
                          {c.user?.name || c.user?.username || "nguoidung"}
                        </span>
                        {c.created_at && (
                          <span className="text-[12px] text-neutral-500">
                            {formatRelativeTime(c.created_at)}
                          </span>
                        )}
                      </div>
                      {c.content && (
                        <p className="mt-1 text-[13.5px] leading-relaxed text-neutral-300">
                          {c.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {threadItems.map((item, index) => (
            <div key={item.id} className="relative flex items-start gap-3 pt-1">
              <div className="flex flex-col items-center">
                <Avatar className="h-10 w-10 shrink-0 cursor-pointer border border-[#282828]">
                  <AvatarImage
                    src={
                      authUser?.avatar_url || "https://github.com/shadcn.png"
                    }
                    alt={authUser?.username || authUser?.name || "nguoidung"}
                  />
                  <AvatarFallback className="bg-neutral-800 font-semibold text-white">
                    {(authUser?.username ||
                      authUser?.name ||
                      "U")[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="my-1.5 min-h-[36px] w-[2px] flex-1 rounded-full bg-[#2a2a2a]" />
              </div>

              <div className="min-w-0 flex-1 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-white">
                    {authUser?.username || authUser?.name || "nguoidung"}
                  </span>
                  {threadItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveThread(index)}
                      className="cursor-pointer rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-red-400"
                      title="Xóa bài viết khỏi chuỗi"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <textarea
                  rows={2}
                  autoFocus={index === 0}
                  value={item.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder={
                    index === 0
                      ? t("post.reply_to", { name: post?.user?.username || post?.user?.name || "nguoidung" })
                      : t("post.add_to_thread")
                  }
                  className="mt-1 w-full resize-none bg-transparent text-[15px] leading-relaxed text-[#f3f5f7] placeholder-neutral-500 outline-none"
                />

                <div className="mt-1 mb-2.5">
                  {item.showTopicInput || item.topic ? (
                    <div className="flex w-fit items-center gap-1.5 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1">
                      <Hash className="h-3.5 w-3.5 text-sky-400" />
                      <input
                        type="text"
                        value={item.topic}
                        onChange={(e) =>
                          handleTopicChange(index, e.target.value)
                        }
                        placeholder={t("post.add_topic")}
                        className="w-32 bg-transparent text-[13px] font-medium text-sky-400 placeholder-sky-400/60 outline-none"
                        autoFocus
                      />
                      {item.topic && (
                        <button
                          type="button"
                          onClick={() => handleTopicChange(index, "")}
                          className="cursor-pointer text-sky-400/70 hover:text-sky-300"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleTopicInput(index)}
                      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[13px] font-semibold text-sky-400 transition-all hover:bg-sky-500/20 hover:text-sky-300"
                      title="Add a topic (Thêm chủ đề/tag)"
                    >
                      <Tag className="h-3.5 w-3.5" />
                      <span># Add a topic</span>
                    </button>
                  )}
                </div>

                {item.mediaPreviews?.length > 0 && (
                  <div className="mt-2 mb-3 flex flex-wrap gap-2">
                    {item.mediaPreviews.map((src, mIdx) => (
                      <div
                        key={mIdx}
                        className="relative h-20 w-20 overflow-hidden rounded-xl border border-[#333333]"
                      >
                        <img
                          src={src}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(index, mIdx)}
                          className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white hover:bg-black"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-neutral-500">
                  <label
                    title="Upload ảnh/video"
                    className="cursor-pointer transition-colors hover:text-white"
                  >
                    <ImageIcon className="h-5 w-5" />
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleMediaChange(index, e.target.files)}
                    />
                  </label>
                  <button
                    type="button"
                    title="Upload GIF"
                    className="cursor-pointer transition-colors hover:text-white"
                  >
                    <Film className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    title="Chọn emoji"
                    className="cursor-pointer transition-colors hover:text-white"
                  >
                    <Smile className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    title="Poll/Survey"
                    className="cursor-pointer transition-colors hover:text-white"
                  >
                    <BarChart2 className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    title="Add location"
                    className="cursor-pointer transition-colors hover:text-white"
                  >
                    <MapPin className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-1">
            <div className="flex flex-col items-center">
              <Avatar className="h-8 w-8 shrink-0 border border-[#282828] opacity-50">
                <AvatarImage
                  src={authUser?.avatar_url || "https://github.com/shadcn.png"}
                  alt={authUser?.username || authUser?.name || "nguoidung"}
                />
                <AvatarFallback className="bg-neutral-800 text-[12px] text-white">
                  {(authUser?.username ||
                    authUser?.name ||
                    "U")[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <button
              type="button"
              onClick={handleAddThread}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-[13.5px] font-semibold text-sky-400 transition-all hover:bg-sky-500/20 hover:text-sky-300"
              title={t("post.add_to_thread")}
            >
              <Plus className="h-4 w-4" />
              <span>{t("post.add_to_thread")}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#222222] bg-[#121212] px-6 py-3.5">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 text-[13.5px] text-neutral-400 transition-colors hover:text-white"
            title={t("post.reply_options")}
          >
            <ArrowDownUp className="h-4 w-4" />
            <span>{t("post.anyone_can_reply")}</span>
          </button>

          <button
            type="button"
            disabled={isPostDisabled || isSubmitting}
            className="cursor-pointer rounded-full bg-white px-5 py-1.5 text-[14px] font-semibold text-black transition-all hover:bg-neutral-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleSubmit}
          >
            {isSubmitting ? t("common.posting") : t("common.post")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
