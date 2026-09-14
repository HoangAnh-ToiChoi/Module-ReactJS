import { useRef, useCallback } from "react";

export function useInfiniteScroll(callback, hasMore, isFetching) {
  const observer = useRef();

  // useCallback giúp theo dõi DOM element mà không bị re-render liên tục
  const lastElementRef = useCallback(
    (node) => {
      // Nếu API đang tải thì không làm gì cả để tránh gọi API trùng lặp
      if (isFetching) return;

      // Xóa bộ theo dõi cũ nếu có
      if (observer.current) observer.current.disconnect();

      // Tạo bộ theo dõi mới
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            callback();
          }
        },
        {
          rootMargin: "1600px",
        },
      );

      // Bắt đầu theo dõi phần tử mới truyền vào
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore, callback],
  );

  return lastElementRef;
}
