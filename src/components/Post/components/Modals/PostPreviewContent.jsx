import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { formatRelativeTime } from "~/utils/format";

function PostPreviewContent({
  post,
  showLine = false,
  showReplyTo = false,
  showUsernameSubtitle = false,
  avatarSize = "h-10 w-10",
  mediaMaxHeight = "max-h-[200px]",
  contentClassName = "mt-1 text-[15px] leading-relaxed text-[#f3f5f7]",
  authorClassName = "text-white",
  className = "",
}) {
  const authorName = post?.user?.username || post?.user?.name || "nguoidung";
  const username = post?.user?.username || "nguoidung";

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="flex flex-col items-center">
        <Avatar className={`${avatarSize} shrink-0 cursor-pointer`}>
          <AvatarImage
            src={post?.user?.avatar_url || "https://github.com/shadcn.png"}
            alt={authorName}
            className="object-cover"
          />
          <AvatarFallback className="bg-neutral-800 font-semibold text-white">
            {authorName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {showLine && (
          <div className="my-1.5 min-h-[32px] w-[2px] flex-1 rounded-full bg-[#333333]" />
        )}
      </div>

      <div className="min-w-0 flex-1 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-[15px] font-semibold ${authorClassName}`}>
              {authorName}
            </span>
            {post?.created_at && (
              <span className="text-[13px] text-neutral-500">
                {showUsernameSubtitle ? "· " : ""}
                {formatRelativeTime(post.created_at)}
              </span>
            )}
          </div>
        </div>

        {showUsernameSubtitle && (
          <div className="text-[13px] text-neutral-400">@{username}</div>
        )}

        {post?.content && (
          <p className={`${contentClassName} whitespace-pre-line`}>
            {post.content}
          </p>
        )}

        {post?.media_urls?.length > 0 && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-[#262626]">
            {post.media_urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`media-${index}`}
                loading="lazy"
                className={`${mediaMaxHeight} w-full object-cover`}
              />
            ))}
          </div>
        )}

        {showReplyTo && (
          <p className="mt-2.5 text-[13px] text-neutral-500">
            Đang trả lời{" "}
            <span className="text-sky-500 hover:underline">@{authorName}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default PostPreviewContent;
