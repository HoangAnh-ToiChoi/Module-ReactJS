import {
  Check,
  Globe,
  Image as ImageIcon,
  Link,
  MoreHorizontal,
  PlusCircle,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import copy from "copy-to-clipboard";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { MOCK_FRIENDS } from "~/data/mockFriends";
import useLockBodyScroll from "~/hooks/useLockBodyScroll";

function ShareModal({ post, onClose, onOpenCopyImageModal, onOpenEmbedModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotice, setShowNotice] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useLockBodyScroll();

  const handleCopyLink = async () => {
    const username = post?.user?.username || "user";
    const postUrl = `${window.location.origin}/${username}/post/${post?.id}`;
    setCopyError(null);
    try {
      const isSuccess = await copy(postUrl);
      if (isSuccess) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        setCopyError("Không thể sao chép liên kết");
      }
    } catch (e) {
      setCopyError("Lỗi hệ thống khi sao chép liên kết");
    }
  };

  const toggleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filteredFriends = MOCK_FRIENDS.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-[540px] flex-col overflow-hidden rounded-3xl border border-[#262626] bg-[#101010] text-white shadow-2xl duration-150"
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
            Gửi đến
          </h2>

          <button
            type="button"
            className="cursor-pointer rounded-full p-1 text-neutral-400 transition-colors hover:text-white"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          {copyError && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[13.5px] text-red-400">
              {copyError}
            </div>
          )}

          <div className="flex items-center gap-3 rounded-full border border-[#262626] bg-[#121212] px-4 py-2.5 text-neutral-400 focus-within:border-neutral-500 focus-within:text-white">
            <Search className="h-4 w-4 shrink-0 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm trang cá nhân Threads"
              className="w-full bg-transparent text-[14px] text-white placeholder-neutral-500 outline-none"
            />
          </div>

          {showNotice && (
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#242424] bg-[#1c1c1c] px-4 py-3">
              <span className="text-[13px] leading-snug text-neutral-300">
                Giờ đây, bạn có thể nhắn tin cho mọi người ngay trên Threads.
              </span>
              <button
                type="button"
                onClick={() => setShowNotice(false)}
                className="ml-2 cursor-pointer text-neutral-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-6 pb-2">
            {filteredFriends.map((friend) => {
              const isSelected = selectedUsers.includes(friend.id);
              return (
                <div
                  key={friend.id}
                  onClick={() => toggleSelectUser(friend.id)}
                  className="group flex cursor-pointer flex-col items-center text-center"
                >
                  <div className="relative">
                    <Avatar className="h-20 w-20 shrink-0 ring-2 ring-transparent transition-all group-hover:opacity-90 active:scale-95">
                      <AvatarImage
                        src={friend.avatar}
                        alt={friend.username}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-neutral-800 text-lg font-semibold text-white">
                        {friend.username[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-xs">
                        <Check className="h-7 w-7 stroke-[3] text-white" />
                      </div>
                    )}
                  </div>

                  <span className="mt-2.5 max-w-[140px] truncate text-[13.5px] font-bold text-white group-hover:underline">
                    {friend.username}
                  </span>
                  <span className="max-w-[140px] truncate text-[12px] text-neutral-400">
                    {friend.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#222222] bg-[#101010] px-6 py-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            <button
              type="button"
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2e2e2e] bg-[#1e1e1e] text-white transition-transform group-hover:bg-[#282828] active:scale-95">
                <PlusCircle className="h-6 w-6" />
              </div>
              <span className="text-[11.5px] leading-tight font-medium text-neutral-300">
                Tin trên Instagram
              </span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2e2e2e] bg-[#1e1e1e] text-white transition-transform group-hover:bg-[#282828] active:scale-95">
                {copied ? (
                  <Check className="h-6 w-6 text-emerald-400" />
                ) : (
                  <Link className="h-6 w-6" />
                )}
              </div>
              <span className="text-[11.5px] leading-tight font-medium text-neutral-300">
                {copied ? "Đã chép" : "Sao chép liên kết"}
              </span>
            </button>

            <button
              type="button"
              className="group flex cursor-pointer flex-col items-center gap-2"
              onClick={onOpenCopyImageModal}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2e2e2e] bg-[#1e1e1e] text-white transition-transform group-hover:bg-[#282828] active:scale-95">
                <ImageIcon className="h-6 w-6" />
              </div>
              <span className="text-[11.5px] leading-tight font-medium text-neutral-300">
                Sao chép dưới dạng hình ảnh
              </span>
            </button>

            <button
              type="button"
              className="group flex cursor-pointer flex-col items-center gap-2"
              onClick={onOpenEmbedModal}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2e2e2e] bg-[#1e1e1e] text-white transition-transform group-hover:bg-[#282828] active:scale-95">
                <Globe className="h-6 w-6" />
              </div>
              <span className="text-[11.5px] leading-tight font-medium text-neutral-300">
                Mã nhúng
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
