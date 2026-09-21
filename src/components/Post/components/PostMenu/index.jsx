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
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Thông tin chi tiết</span>
                <BarChart2 className="h-4 w-4 text-[#f3f5f7]" />
              </button>
            </div>

            <div className="my-1 border-t border-[#333333]" />

            {/* Group 2 - Bài viết của tôi */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={onEdit}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Chỉnh sửa</span>
              </button>

              <button
                type="button"
                onClick={onSave}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{isSaved ? "Bỏ Lưu" : "Lưu"}</span>
                <Bookmark
                  className={`h-4 w-4 text-[#f3f5f7] ${isSaved ? "fill-[#f3f5f7]" : ""}`}
                />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Ghim lên trang cá nhân</span>
                <Pin className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Lưu trữ</span>
                <Archive className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Ẩn số lượt thích và lượt xem</span>
                <HeartOff className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Lựa chọn trả lời</span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </button>
            </div>

            <div className="my-1 border-t border-[#333333]" />

            {/* Group 3 - Bài viết của tôi */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={onDelete}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-red-500 transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Xóa</span>
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
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Thêm vào bảng feed</span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </button>
            </div>

            <div className="my-1 border-t border-[#333333]" />

            {/* Group 2 - Bài viết người khác */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={onSave}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>{isSaved ? "Bỏ Lưu" : "Lưu"}</span>
                <Bookmark
                  className={`h-4 w-4 text-[#f3f5f7] ${isSaved ? "fill-[#f3f5f7]" : ""}`}
                />
              </button>

              <button
                type="button"
                onClick={onHide}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Không quan tâm</span>
                <EyeOff className="h-4 w-4 text-[#f3f5f7]" />
              </button>
            </div>

            <div className="my-1 border-t border-[#333333]" />

            {/* Group 3 - Bài viết người khác */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={onMute}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Tắt thông báo</span>
                <UserX className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                onClick={onRestrict}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Hạn chế</span>
                <ShieldAlert className="h-4 w-4 text-[#f3f5f7]" />
              </button>

              <button
                type="button"
                onClick={onBlock}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-red-500 transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Chặn</span>
                <Ban className="h-4 w-4 text-red-500" />
              </button>

              <button
                type="button"
                onClick={onReport}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-red-500 transition-colors hover:bg-[#323232] active:scale-[0.99]"
              >
                <span>Báo cáo</span>
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
            className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
          >
            <span>Sao chép liên kết</span>
            <Link className="h-4 w-4 text-[#f3f5f7]" />
          </button>

          <button
            type="button"
            onClick={onGetEmbed}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232] active:scale-[0.99]"
          >
            <span>Lấy mã nhúng</span>
            <Code2 className="h-4 w-4 text-[#f3f5f7]" />
          </button>
        </div>
      </div>
    </>
  );
}

export default PostMenu;
