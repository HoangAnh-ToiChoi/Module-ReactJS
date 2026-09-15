import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "~/components/Loading";

import PostCard from "~/components/Post/PostCard";
import { useSelectorPost } from "~/features/Post/Hook";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import { getFeed } from "~/service/PostService/PostService";

function Home() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasmore] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const posts = useSelectorPost();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (currentPage) => {
    setFetching(true);
    try {
      const newPosts = await dispatch(getFeed({ page: currentPage })).unwrap();
      if (!newPosts || newPosts.length === 0) {
        setHasmore(false);
      } else {
        if (newPosts.length < 20) setHasmore(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const lastElementRef = useInfiniteScroll(handleLoadMore, hasMore, isFetching);

  return (
    <div className="mx-auto max-w-[620px] pb-10">
      {posts?.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div ref={lastElementRef} key={post.id}>
              <PostCard post={post} />
            </div>
          );
        }
        return <PostCard key={post.id} post={post} />;
      })}

      {isFetching && (
        <div className="flex justify-center py-6">
          <Loading>Đang tải thêm bài viết...</Loading>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="py-6 text-center text-[13px] text-neutral-500">
          Bạn đã xem hết tất cả bài viết.
        </p>
      )}
    </div>
  );
}

export default Home;
