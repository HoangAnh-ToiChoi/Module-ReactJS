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
  quotePost,
  repost as repostPost,
} from "~/service/PostService/PostService";
import { formatCount } from "~/utils/format";
import QuoteModal from "./QuoteModal";

function InteractionBar({
  likesCount = 0,
  repliesCount = 0,
  repostsCount = 0,
  postId,
  isLiked = false,
  isReposted = false,
  post,
}) {
  const like = useToggleActive(isLiked, likesCount, () => likePost(postId));
  const repost = useToggleActive(isReposted, repostsCount, () =>
    repostPost(postId),
  );

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isOpneModal, setOpneModal] = useState(false);
  const menuRef = useRef(null);

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
    setOpneModal(true);
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

      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-sky-400">
        <MessageCircle className="h-[19px] w-[19px]" />
        {repliesCount > 0 && (
          <span className="text-[13px]">{formatCount(repliesCount)}</span>
        )}
      </button>

      {/* Nút Đăng lại & Menu bám dính */}
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

        {/* Menu mọc ra bám ngay trên đầu nút bấm */}
        {isOpenMenu && (
          <div
            className="absolute bottom-full left-0 z-50 mb-2 w-44 overflow-hidden rounded-2xl border border-[#333333] bg-[#242424] p-1.5 shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lựa chọn 1: Đăng lại */}
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-white transition-colors hover:bg-[#323232]"
              onClick={handleRepost}
            >
              <span>{repost.Active ? "Xoá đăng lại" : "Đăng lại"}</span>
              <Repeat2 className="h-4 w-4 text-white" />
            </button>

            {/* Lựa chọn 2: Trích dẫn */}
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold text-white transition-colors hover:bg-[#323232]"
              onClick={handleQuoteModal}
            >
              <span>Trích dẫn</span>
              <MessageSquareQuote className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </div>
      {isOpneModal && (
        <QuoteModal post={post} onClose={() => setOpneModal(false)} />
      )}

      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-white">
        <Send className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

export default InteractionBar;
