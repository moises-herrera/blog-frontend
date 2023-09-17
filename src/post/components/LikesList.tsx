import { useRef, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSearch, useScrollPagination } from "src/hooks";
import { User } from "src/interfaces";
import { SearchInput, UserCard, FollowButton } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { getPostLikes } from "src/store/post";
import { AppDispatch } from "src/store/types";

export const LikesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const { postInfoActive, postUserLikes, isLoadingPostLikes, totalPostLikes } =
    useTypedSelector(({ post }) => post);
  const { debouncedSearchTerm, onSearch } = useSearch({
    value: "",
  });
  const currentUserId = useMemo(
    () => postInfoActive?._id,
    [postInfoActive?._id]
  );
  const scrollableDiv = useRef<HTMLDivElement>(null);

  const { page } = useScrollPagination({
    isLoading: isLoadingPostLikes,
    currentRecords: postInfoActive?.likes.length || 0,
    total: totalPostLikes,
    elementRef: scrollableDiv,
  });

  useEffect(() => {
    dispatch(
      getPostLikes({
        id: currentUserId as string,
        queryParams: {
          username: debouncedSearchTerm || "",
          limit: 10,
          page,
        },
      })
    );
  }, [dispatch, debouncedSearchTerm, currentUserId, page]);

  return (
    <>
      <div className="users-container">
        <p className="users-list-title">Likes</p>

        <SearchInput placeholder="Buscar usuarios" onSearch={onSearch} />
      </div>
      <div
        className="users-list h-[310px] overflow-auto scrollable-div"
        ref={scrollableDiv}
      >
        {postUserLikes.map((user) => (
          <UserCard key={user.username} user={user}>
            <FollowButton user={user} currentUser={currentUser as User} />
          </UserCard>
        ))}
      </div>
    </>
  );
};
