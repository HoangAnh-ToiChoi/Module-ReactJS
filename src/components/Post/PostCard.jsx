import { useRef, useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import InteractionBar from "./InteractionBar";
import { formatRelativeTime } from "~/utils/format";
import PostMenu from "./components/PostMenu";
import useAutoPosition from "~/hooks/useAutoPosition";
import ReportModal from "./components/Modals/ReportModal";
import EditPostModal from "./components/Modals/EditPostModal";
import DeleteModal from "./components/Modals/DeleteModal";

function PostCard({
  post,
  user,
  onSavePost,
  onHidePost,
  onReportPost,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const [openReportMenu, setOpenReportMenu] = useState(false);
  const [openEditModal, setOpenEidtModal] = useState(false);
  const [openDeltModal, setOpeDeltModal] = useState(false);
  const buttonRef = useRef(null);
  const placeMent = useAutoPosition(openMenu, buttonRef);

  const handleSave = async () => {
    setOpenMenu(false);
    await onSavePost(post.id);
  };
  const handlhide = async () => {
    setOpenMenu(false);
    await onHidePost(post.id);
  };

  const handleOpenReportMenu = () => {
    setOpenMenu(false);
    setOpenReportMenu(true);
  };

  const handleReportPost = (key, reason) => {
    onReportPost(post.id, key, reason);
    setOpenReportMenu(false);
  };

  const handleEditPost = () => {
    setOpenMenu(false);
    setOpenEidtModal(true);
  };

  const handleDelPost = () => {
    setOpenMenu(false);
    setOpeDeltModal(true);
  };

  return (
    <article className="mx-auto w-full max-w-[620px] border-b border-[#222222] bg-[#101010] px-4 py-3 text-white transition-colors hover:bg-[#121212]">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage
              src={post.user?.avatar_url || "https://github.com/shadcn.png"}
              alt={post.user?.username || post.user?.name || "nguoidung"}
            />
            <AvatarFallback className="bg-neutral-800 font-semibold text-white">
              {(
                (post.user?.username || post.user?.name || "U")[0] || "U"
              ).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <button
            type="button"
            title={t("post.follow")}
            className="absolute -right-0.5 -bottom-0.5 z-10 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-white text-black ring-2 ring-[#101010] transition-transform hover:scale-110 active:scale-95"
          >
            <Plus className="h-3 w-3 stroke-[3]" />
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="cursor-pointer text-[15px] font-semibold text-white hover:underline">
                {post.user?.username || post.user?.name || "nguoidung"}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-[14px] text-neutral-500">
                {formatRelativeTime(post.created_at)}
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                className="cursor-pointer rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white"
                onClick={() => setOpenMenu((prev) => !prev)}
                ref={buttonRef}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
              {openMenu && (
                <PostMenu
                  post={post}
                  user={user}
                  onClose={() => setOpenMenu(false)}
                  placement={placeMent}
                  onSave={handleSave}
                  onHide={handlhide}
                  onReport={handleOpenReportMenu}
                  onEdit={handleEditPost}
                  onDelete={handleDelPost}
                />
              )}
            </div>
            {openReportMenu && (
              <ReportModal
                onClose={() => setOpenReportMenu(false)}
                onSubmitReport={handleReportPost}
              />
            )}
            {openEditModal && (
              <EditPostModal
                post={post}
                onClose={() => setOpenEidtModal(false)}
                onSubmit={onEdit}
              />
            )}
          </div>

          {openDeltModal && (
            <DeleteModal
              post={post}
              onClose={() => setOpeDeltModal(false)}
              onSubmit={onDelete}
            />
          )}

          {post.content && (
            <div className="mt-1 text-[15px] leading-relaxed text-[#f3f5f7]">
              <p className="whitespace-pre-line">{post.content}</p>
            </div>
          )}

          {Array.isArray(post.media_urls) && post.media_urls.length > 0 && (
            <div className="mt-2.5 overflow-hidden rounded-2xl border border-[#262626]">
              {post.media_urls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`media-${index}`}
                  loading="lazy"
                  className="max-h-[500px] w-full object-cover"
                />
              ))}
            </div>
          )}

          <InteractionBar post={post} repliesCount={post.replies_count} />
        </div>
      </div>
    </article>
  );
}

export default PostCard;
