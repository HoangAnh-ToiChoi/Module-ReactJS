import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { PlusIcon } from "lucide-react";

import InteractionBar from "./InteractionBar";

function PostCard(post) {
  return (
    // Bài viết Threads: nền đen #101010, viền phân cách dưới border-b #222222, padding 16px
    <article className="mx-auto w-full max-w-[620px] border-b border-[#222222] bg-[#101010] px-4 py-3 text-white transition-colors hover:bg-[#141414]">
      {/* Bố cục 2 cột chuẩn Threads: Cột trái (Avatar) - Cột phải (Toàn bộ nội dung) */}
      <div className="flex items-start gap-3">
        {/* CỘT TRÁI: Avatar kèm huy hiệu nút + follow */}
        <div className="relative shrink-0">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="https://github.com/pranathip.png"
              alt="@solarwr03"
            />
            <AvatarFallback>USER</AvatarFallback>
            <PlusIcon className="absolute -right-0.5 -bottom-0.5 z-10 h-4 w-4 cursor-pointer rounded-full bg-white stroke-[3] p-[2px] text-black ring-2 ring-[#101010] transition-transform hover:scale-110" />
          </Avatar>
        </div>

        {/* CỘT PHẢI: Thông tin tác giả, bài viết, hành động */}
        <div className="min-w-0 flex-1">
          {/* Dòng Header: Tên người dùng + Thời gian + Nút menu 3 chấm */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="cursor-pointer text-[15px] font-semibold text-white hover:underline">
                solarwr03
              </span>
              <span className="text-[14px] text-neutral-500">22 giờ</span>
            </div>

            {/* Nút 3 chấm */}
            <button className="cursor-pointer p-1 text-neutral-500 transition-colors hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Nội dung bài viết */}
          <div className="mt-1 text-[15px] leading-relaxed text-[#f3f5f7]">
            <p></p>
          </div>

          {/* Hàng nút tương tác: Tim, Bình luận, Repost, Chia sẻ */}
          <InteractionBar />
        </div>
      </div>
    </article>
  );
}

export default PostCard;
