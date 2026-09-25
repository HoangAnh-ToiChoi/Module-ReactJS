import {
  AlertCircle,
  Archive,
  Ban,
  BarChart2,
  Bookmark,
  ChevronRight,
  Code2,
  EyeOff,
  HeartOff,
  Link,
  Pin,
  ShieldAlert,
  Trash2,
  UserX,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "~/lib/utils";

function PostMenu({
  post,
  user,
  placement = "bottom",
  onClose,
  onCopyLink,
  onGetEmbed,
  onSave,
  onHide,
  onEdit,
  onDelete,
  onMute,
  onRestrict,
  onBlock,
  onReport,
}) {
  const { t } = useTranslation();
  const isSaved = post?.is_saved_by_auth;
  const isUser = user?.id === post?.user_id;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        className={cn(
          "animate-in fade-in-0 zoom-in-95 absolute right-0 z-50 w-64 overflow-hidden rounded-2xl border border-[#2e2e2e] bg-[#242424] p-1.5 shadow-2xl shadow-black/80 duration-150",
          placement === "top"
            ? "bottom-full mb-1 origin-bottom-right"
            : "top-full mt-1 origin-top-right",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {isUser ? (
          <>
            {/* Group 1 - Bài viết của tôi */}
            <div className="space-y-0.5">
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("sidebar.insights")}</span>
                <BarChart2 className="h-4 w-4 text-[#f3f5f7]" />
              </button>
            </div>

            <div className="my-1 border-t border-[#333333]" />

            {/* Group 2 - Bài viết của tôi */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={onEdit}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("common.edit")}</span>
              </button>

              <button
                type="button"
                onClick={onSave}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{isSaved ? t("post.unsave_post") : t("post.save_post")}</span>
                <Bookmark
                  className={`h-4 w-4 text-[#f3f5f7] ${isSaved ? "fill-[#f3f5f7]" : ""}`}
                />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("post.pin_to_profile")}</span>
                <Pin className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("sidebar.archive")}</span>
                <Archive className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("post.hide_like_count")}</span>
                <HeartOff className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("post.reply_options")}</span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </button>
            </div>

            <div className="my-1 border-t border-[#333333]" />

            {/* Group 3 - Bài viết của tôi */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={onDelete}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-red-500 transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("common.delete")}</span>
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Group 1 - Bài viết người khác */}
            <div className="space-y-0.5">
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("post.add_to_feed")}</span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </button>
            </div>

            <div className="my-1 border-t border-[#333333]" />

            {/* Group 2 - Bài viết người khác */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={onSave}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{isSaved ? t("post.unsave_post") : t("post.save_post")}</span>
                <Bookmark
                  className={`h-4 w-4 text-[#f3f5f7] ${isSaved ? "fill-[#f3f5f7]" : ""}`}
                />
              </button>

              <button
                type="button"
                onClick={onHide}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("post.not_interested")}</span>
                <EyeOff className="h-4 w-4 text-[#f3f5f7]" />
              </button>
            </div>

            <div className="my-1 border-t border-[#333333]" />

            {/* Group 3 - Bài viết người khác */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={onMute}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("post.mute")}</span>
                <UserX className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                onClick={onRestrict}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("post.restrict")}</span>
                <ShieldAlert className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                onClick={onBlock}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-red-500 transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("post.block")}</span>
                <Ban className="h-4 w-4 text-red-500" />
              </button>

              <button
                type="button"
                onClick={onReport}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-red-500 transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{t("common.report")}</span>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </>
        )}

        <div className="my-1 border-t border-[#333333]" />

        {/* Group 4 - Dùng chung */}
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={onCopyLink}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
          >
            <span>{t("common.copy_link")}</span>
            <Link className="h-4 w-4 text-[#f3f5f7]" />
          </button>

          <button
            type="button"
            onClick={onGetEmbed}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-[14px] whitespace-nowrap h-10 font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
          >
            <span>{t("common.embed")}</span>
            <Code2 className="h-4 w-4 text-[#f3f5f7]" />
          </button>
        </div>
      </div>
    </>
  );
}

export default PostMenu;
