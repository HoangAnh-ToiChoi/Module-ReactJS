import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Loading from "~/components/Loading";

import PostCard from "~/components/Post/PostCard";
import ReportSuccessModal from "~/components/Post/components/Modals/ReportSuccessModal";
import { useSelectorUser } from "~/features/Auth/Hook";
import { useSelectorPost } from "~/features/Post/Hook";
import {
  DelPostSuccess,
  HidePostSuccess,
  toggleSavePost,
  UpdatePostSuccess,
} from "~/features/Post/PostSilce";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import {
  delPost,
  editPost,
  getFeed,
  hidePost,
  reportPost,
  savePost,
} from "~/service/PostService/PostService";

function Home() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [hasMore, setHasmore] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const [reportModalConfig, setReportModalConfig] = useState({
    isOpen: false,
    title: "",
    description: "",
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
        title: t("report.thank_you_title"),
        description: t("report.thank_you_desc"),
        isError: false,
      });
    } catch (e) {
      console.error(e);
      setReportModalConfig({
        isOpen: true,
        title: t("report.already_reported_title"),
        description: t("report.already_reported_desc"),
        isError: true,
      });
    }
  };

  const handleEditPost = async (postId, data) => {
    try {
      const res = await editPost(postId, data);
      if (res) {
        dispatch(UpdatePostSuccess(res));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelPost = async (postId, data) => {
    try {
      const res = await delPost(postId, data);
      dispatch(DelPostSuccess(postId));
      console.log(res);
    } catch (e) {
      console.error(e);
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
                onEdit={handleEditPost}
                onDelete={handleDelPost}
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
            onEdit={handleEditPost}
            onDelete={handleDelPost}
          />
        );
      })}

      {isFetching && (
        <div className="flex justify-center py-6">
          <Loading>{t("post.loading_more")}</Loading>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="py-6 text-center text-[13px] text-neutral-500">
          {t("post.seen_all")}
        </p>
      )}
    </div>
  );
}

export default Home;
