import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import { formatCount } from "~/utils/format";

function InteractionBar({
  likesCount = 0,
  repliesCount = 0,
  repostsCount = 0,
}) {
  return (
    <div className="mt-3 flex items-center gap-5 text-neutral-400">
      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-red-500">
        <Heart className="h-[19px] w-[19px]" />
        {likesCount > 0 && (
          <span className="text-[13px]">{formatCount(likesCount)}</span>
        )}
      </button>

      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-sky-400">
        <MessageCircle className="h-[19px] w-[19px]" />
        {repliesCount > 0 && (
          <span className="text-[13px]">{formatCount(repliesCount)}</span>
        )}
      </button>

      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-emerald-400">
        <Repeat2 className="h-[20px] w-[20px]" />
        {repostsCount > 0 && (
          <span className="text-[13px]">{formatCount(repostsCount)}</span>
        )}
      </button>

      <button className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-white">
        <Send className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

export default InteractionBar;
