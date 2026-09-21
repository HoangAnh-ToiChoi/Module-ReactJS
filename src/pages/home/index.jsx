import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "~/components/Loading";

import PostCard from "~/components/Post/PostCard";
import ReportSuccessModal from "~/components/Post/components/Modals/ReportSuccessModal";
import { useSelectorUser } from "~/features/Auth/Hook";
import { useSelectorPost } from "~/features/Post/Hook";
import { HidePostSuccess, toggleSavePost } from "~/features/Post/PostSilce";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import {
  getFeed,
  hidePost,
  reportPost,
  savePost,
} from "~/service/PostService/PostService";

function Home() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasmore] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [reportModalConfig, setReportModalConfig] = useState({
    isOpen: false,
    title: "Cảm ơn bạn đã đóng góp ý kiến",
    description:
      "Khi nhìn thấy nội dung mình không thích trên Threads, bạn có thể báo cáo nếu nội dung đó không tuân thủ Tiêu chuẩn cộng đồng hoặc xóa người chia sẻ nội dung đó khỏi trải nghiệm của mình.",
    isError: false,
  });
  const posts = useSelectorPost();
  const user = useSelectorUser();
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

  const handleSavePost = async (postId) => {
    try {
      dispatch(toggleSavePost(postId));
      const data = await savePost(postId);
      console.log(data);
    } catch (e) {
      console.error(e);
      dispatch(toggleSavePost(postId));
    }
  };

  const handleHidePost = async (postId) => {
    try {
      dispatch(HidePostSuccess(postId));
      await hidePost(postId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReportPost = async (postId, key, reason) => {
    const data = {
      reason: key,
      description: reason,
    };
    try {
      await reportPost(postId, data);
      setReportModalConfig({
        isOpen: true,
        title: "Cảm ơn bạn đã đóng góp ý kiến",
        description:
          "Khi nhìn thấy nội dung mình không thích trên Threads, bạn có thể báo cáo nếu nội dung đó không tuân thủ Tiêu chuẩn cộng đồng hoặc xóa người chia sẻ nội dung đó khỏi trải nghiệm của mình.",
        isError: false,
      });
    } catch (e) {
      console.error(e);
      setReportModalConfig({
        isOpen: true,
        title: "Thông báo",
        description: "Bạn đã báo cáo bài viết này!",
        isError: true,
      });
    }
  };

  return (
    <div className="mx-auto max-w-[620px] pb-10">
      {reportModalConfig.isOpen && (
        <ReportSuccessModal
          title={reportModalConfig.title}
          description={reportModalConfig.description}
          isError={reportModalConfig.isError}
          onClose={() =>
            setReportModalConfig((prev) => ({ ...prev, isOpen: false }))
          }
        />
      )}
      {posts?.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div ref={lastElementRef} key={post.id}>
              <PostCard
                post={post}
                user={user}
                onSavePost={handleSavePost}
                onHidePost={handleHidePost}
                onReportPost={handleReportPost}
              />
            </div>
          );
        }
        return (
          <PostCard
            key={post.id}
            post={post}
            user={user}
            onSavePost={handleSavePost}
            onHidePost={handleHidePost}
            onReportPost={handleReportPost}
          />
        );
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
