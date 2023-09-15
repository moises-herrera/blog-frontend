import { useDispatch } from "react-redux";
import { Loading } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { FeedContent } from ".";
import { useEffect } from "react";
import { getPostsFollowing } from "src/store/post";
import { useScrollPagination } from "src/hooks";

export const FollowingTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { postFollowingList, isLoadingFollowing, postsFollowingTotal } =
    useTypedSelector(({ post }) => post);
  const { following } = useTypedSelector(({ users }) => users);

  const { page } = useScrollPagination({
    isLoading: isLoadingFollowing,
    currentRecords: postFollowingList.length,
    total: postsFollowingTotal,
  });

  useEffect(() => {
    dispatch(
      getPostsFollowing({
        limit: 10,
        page,
      })
    );
  }, [dispatch, following, page]);

  return (
    <>
      {!isLoadingFollowing ? (
        <FeedContent posts={postFollowingList} />
      ) : (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      )}
    </>
  );
};
