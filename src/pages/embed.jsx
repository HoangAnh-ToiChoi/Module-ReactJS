import {
  ExternalLink,
  Heart,
  MessageCircle,
  Repeat2,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "~/components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getFeedSingle } from "~/service/PostService/PostService";
import { formatCount } from "~/utils/format";

function Embed() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getFeedSigle();
  }, []);

  const getFeedSigle = async () => {
    try {
      const postData = await getFeedSingle(postId);
      setPost(postData);
    } catch (e) {
      console.error(e);
    }
  };

  if (!post) {
    return <Loading>Đang tải...</Loading>;
  }

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-[#2c2c2c] bg-[#141414] p-6 text-white shadow-2xl transition-all">
      {/* Header: Avatar, Username, View on Threads Link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 cursor-pointer border border-[#262626]">
            <AvatarImage
              src={post?.user?.avatar_url || "https://github.com/shadcn.png"}
              alt={post?.user?.name || post?.user?.username}
            />
            <AvatarFallback className="bg-neutral-800 font-semibold text-white">
              {(post?.user?.name ||
                post?.user?.username ||
                "U")[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-white leading-tight">
              {post?.user?.name || post?.user?.username}
            </span>
            <span className="text-[13px] text-neutral-400 mt-0.5">
              @{post?.user?.username}
            </span>
          </div>
        </div>

        {/* View on Threads Button */}
        <a
          href={`https://threads.net/@${post?.user?.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full border border-[#333333] bg-[#222222] px-4 py-1.5 text-[13px] font-semibold text-white transition-all hover:bg-[#333333] hover:border-[#444444]"
        >
          <span>View on Threads</span>
          <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
        </a>
      </div>

      {/* Post Content */}
      {post?.content && (
        <p className="text-[15px] leading-relaxed whitespace-pre-line text-[#f3f5f7]">
          {post.content}
        </p>
      )}

      {/* Media Images */}
      {post?.media_urls?.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-[#262626]">
          {post.media_urls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`media-${idx}`}
              className="max-h-[350px] w-full object-cover"
            />
          ))}
        </div>
      )}

      {/* Quote / Original Post Preview */}
      {post?.original_post && (
        <div className="flex flex-col gap-2.5 rounded-2xl border border-[#262626] bg-[#1a1a1a] p-4.5 shadow-inner">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-7 w-7 border border-[#333333]">
              <AvatarImage
                src={
                  post.original_post.user?.avatar_url ||
                  "https://github.com/shadcn.png"
                }
                alt={
                  post.original_post.user?.name ||
                  post.original_post.user?.username
                }
              />
              <AvatarFallback className="bg-neutral-800 text-[11px] text-white">
                {(post.original_post.user?.name ||
                  post.original_post.user?.username ||
                  "U")[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-semibold text-white">
                {post.original_post.user?.name ||
                  post.original_post.user?.username}
              </span>
              <span className="text-[12.5px] text-neutral-400">
                @{post.original_post.user?.username}
              </span>
            </div>
          </div>

          {post.original_post.content && (
            <p className="text-[14px] leading-relaxed whitespace-pre-line text-neutral-300">
              {post.original_post.content}
            </p>
          )}

          {post.original_post.media_urls?.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-[#333333]">
              {post.original_post.media_urls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`orig-media-${idx}`}
                  className="max-h-[220px] w-full object-cover"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Timestamp & Interaction Bar */}
      <div className="flex flex-col gap-3 pt-1">
        {post?.created_at && (
          <div className="text-[13px] text-neutral-500">
            {new Date(post.created_at).toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-[#262626] pt-3.5 pb-1 text-neutral-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-[13.5px] text-neutral-400 hover:text-white transition-colors cursor-pointer">
              <Heart className="h-4 w-4" />
              {post?.likes_count > 0 && (
                <span>{formatCount(post.likes_count)}</span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[13.5px] text-neutral-400 hover:text-white transition-colors cursor-pointer">
              <MessageCircle className="h-4 w-4" />
              {post?.replies_count > 0 && (
                <span>{formatCount(post.replies_count)}</span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[13.5px] text-neutral-400 hover:text-white transition-colors cursor-pointer">
              <Repeat2 className="h-4 w-4" />
              {post?.reposts_and_quotes_count > 0 && (
                <span>{formatCount(post.reposts_and_quotes_count)}</span>
              )}
            </div>

            <div className="flex items-center text-neutral-400 hover:text-white transition-colors cursor-pointer">
              <Send className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Embed;
