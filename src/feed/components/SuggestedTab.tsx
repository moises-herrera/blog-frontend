import { useDispatch } from "react-redux";
import { Loading } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { FeedContent } from ".";
import { useEffect } from "react";
import { getPostsSuggested } from "src/store/post";
import { useScrollPagination } from "src/hooks";

export const SuggestedTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { postSuggestedList, isLoadingSuggested, postsSuggestedTotal } =
    useTypedSelector(({ post }) => post);

  const { page } = useScrollPagination({
    isLoading: isLoadingSuggested,
    currentRecords: postSuggestedList.length,
    total: postsSuggestedTotal,
  });

  useEffect(() => {
    dispatch(
      getPostsSuggested({
        limit: 10,
        page,
      })
    );
  }, [dispatch, page]);

  return (
    <>
      {!isLoadingSuggested ? (
        <FeedContent posts={postSuggestedList} />
      ) : (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      )}
    </>
  );
};
