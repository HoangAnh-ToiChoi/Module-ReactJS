import {
  Heart,
  MessageCircle,
  MessageSquareQuote,
  Repeat2,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useToggleActive } from "~/hooks/useToggleActive";
import {
  likePost,
  repost as repostPost,
} from "~/service/PostService/PostService";
import { formatCount } from "~/utils/format";
import CommentModal from "./components/Modals/CommentModal";
import CopyImageModal from "./components/Modals/CopyImageModal";
import QuoteModal from "./components/Modals/QuoteModal";
import ShareModal from "./components/Modals/ShareModal";
import EmbedModal from "./components/Modals/EmbedModal";
import { cn } from "~/lib/utils";
import useAutoPosition from "~/hooks/useAutoPosition";

function InteractionBar({ repliesCount = 0, post }) {
  const like = useToggleActive(post.is_liked_by_auth, post.likes_count, () =>
    likePost(post.id),
  );
  const repost = useToggleActive(
    post.is_reposted_by_auth,
    post.replies_count,
    () => repostPost(post.id),
  );

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpenRepostModal, setIsOpenRepostModal] = useState(false);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isOpenCopyImageModal, setIsOpenCopyImageModal] = useState(false);
  const [isOpenEmbedModal, setisOpenEmbedModal] = useState(false);
  const menuRef = useRef(null);
  const placeMent = useAutoPosition(isOpenMenu, menuRef, 90);

  useEffect(() => {
    if (!isOpenMenu) return;
    const handleOutsideClick = (e) => {
      if (!menuRef.current.contains(e.target)) setOpenMenu(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpenMenu]);

  const handleRepost = async () => {
    setOpenMenu(false);
    try {
      await repost.toggle();
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuoteModal = () => {
    setOpenMenu(false);
    setIsOpenRepostModal(true);
  };

  const handleOpenCopyImageModal = () => {
    setIsOpenShareModal(false);
    setIsOpenCopyImageModal(true);
  };

  const handleOpenEmbedModal = () => {
    setIsOpenShareModal(false);
    setisOpenEmbedModal(true);
  };

  return (
    <div className="mt-3 flex items-center gap-5 text-neutral-400">
      <button
        className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-red-500"
        onClick={like.toggle}
      >
        <Heart
          className={`h-[19px] w-[19px] ${
            like.Active ? "fill-red-500 text-red-500" : ""
          }`}
        />
        {like.count > 0 && (
          <span className="text-[13px]">{formatCount(like.count)}</span>
        )}
      </button>

      <button
        className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-sky-400"
        onClick={() => setIsOpenCommentModal(true)}
      >
        <MessageCircle className="h-[19px] w-[19px]" />
        {repliesCount > 0 && (
          <span className="text-[13px]">{formatCount(repliesCount)}</span>
        )}
      </button>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-emerald-400"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu((prev) => !prev);
          }}
        >
          <Repeat2
            className={`h-[20px] w-[20px] ${
              repost.Active ? "stroke-[2.5] text-emerald-400" : ""
            }`}
          />
          {repost.count > 0 && (
            <span className="text-[13px]">{formatCount(repost.count)}</span>
          )}
        </button>

        {isOpenMenu && (
          <div
            className={cn(
              "animate-in fade-in-0 zoom-in-95 absolute left-0 z-50 w-44 overflow-hidden rounded-2xl border border-[#333333] bg-[#242424] p-1.5 shadow-2xl shadow-black/80 duration-150",
              placeMent === "top"
                ? "bottom-full mb-2 origin-bottom-left"
                : "top-full mt-2 origin-top-left",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232]"
              onClick={handleRepost}
            >
              <span>{repost.Active ? "Xoá đăng lại" : "Đăng lại"}</span>
              <Repeat2 className="h-4 w-4 text-[#f3f5f7]" />
            </button>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-[#f3f5f7] transition-colors hover:bg-[#323232]"
              onClick={handleQuoteModal}
            >
              <span>Trích dẫn</span>
              <MessageSquareQuote className="h-4 w-4 text-[#f3f5f7]" />
            </button>
          </div>
        )}
      </div>

      {isOpenRepostModal && (
        <QuoteModal post={post} onClose={() => setIsOpenRepostModal(false)} />
      )}

      {isOpenCommentModal && (
        <CommentModal
          post={post}
          onClose={() => setIsOpenCommentModal(false)}
        />
      )}

      <button
        onClick={() => setIsOpenShareModal(true)}
        className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-white"
      >
        <Send className="h-[18px] w-[18px]" />
      </button>

      {isOpenShareModal && (
        <ShareModal
          post={post}
          onClose={() => setIsOpenShareModal(false)}
          onOpenCopyImageModal={handleOpenCopyImageModal}
          onOpenEmbedModal={handleOpenEmbedModal}
        />
      )}

      {isOpenCopyImageModal && (
        <CopyImageModal
          post={post}
          onClose={() => setIsOpenCopyImageModal(false)}
        />
      )}

      {isOpenEmbedModal && (
        <EmbedModal post={post} onClose={() => setisOpenEmbedModal(false)} />
      )}
    </div>
  );
}

export default InteractionBar;
