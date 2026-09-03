import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

function InteractionBar() {
  return (
    <div className="mt-3 flex items-center gap-5 text-neutral-400">
      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-red-500">
        <Heart className="h-[19px] w-[19px]" />
        <span className="text-[13px]">773</span>
      </button>
      {/* Bình luận */}
      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-sky-400">
        <MessageCircle className="h-[19px] w-[19px]" />
        <span className="text-[13px]">7</span>
      </button>
      {/* Repost */}
      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-emerald-400">
        <Repeat2 className="h-[20px] w-[20px]" />
        <span className="text-[13px]">320</span>
      </button>
      {/* Chia sẻ */}
      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-white">
        <Send className="h-[18px] w-[18px]" />
        <span className="text-[13px]">541</span>
      </button>
    </div>
  );
}

export default InteractionBar;
