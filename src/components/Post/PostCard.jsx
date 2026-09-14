import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar";
import { MoreHorizontal, Plus } from "lucide-react";
import InteractionBar from "./InteractionBar";
import { formatRelativeTime } from "~/utils/format";

function PostCard({ post }) {
  if (!post) return null;

  const user = post.user || {};
  const username = user.username || user.name || "nguoidung";
  const avatarUrl = user.avatar_url || "https://github.com/shadcn.png";
  const mediaUrls = Array.isArray(post.media_urls) ? post.media_urls : [];

  return (
    <article className="mx-auto w-full max-w-[620px] border-b border-[#222222] bg-[#101010] px-4 py-3 text-white transition-colors hover:bg-[#121212]">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-neutral-800 font-semibold text-white">
              {(username[0] || "U").toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <button
            type="button"
            title="Theo dõi"
            className="absolute -right-0.5 -bottom-0.5 z-10 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-white text-black ring-2 ring-[#101010] transition-transform hover:scale-110 active:scale-95"
          >
            <Plus className="h-3 w-3 stroke-[3]" />
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="cursor-pointer text-[15px] font-semibold text-white hover:underline">
                {username}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-[14px] text-neutral-500">
                {formatRelativeTime(post.created_at)}
              </span>
            </div>

            <button
              type="button"
              className="cursor-pointer rounded-full p-1 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          {post.content && (
            <div className="mt-1 text-[15px] leading-relaxed text-[#f3f5f7]">
              <p className="whitespace-pre-line">{post.content}</p>
            </div>
          )}

          {mediaUrls.length > 0 && (
            <div className="mt-2.5 overflow-hidden rounded-2xl border border-[#262626]">
              {mediaUrls.map((url, index) => (
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

          <InteractionBar
            likesCount={post.likes_count}
            repliesCount={post.replies_count}
            repostsCount={post.reposts_and_quotes_count}
          />
        </div>
      </div>
    </article>
  );
}

export default PostCard;
