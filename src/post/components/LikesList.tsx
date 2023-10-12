import { useRef, useEffect, useMemo, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSearch, useScrollPagination } from "src/hooks";
import { User } from "src/interfaces";
import {
  SearchInput,
  UserCard,
  FollowButton,
  Loading,
  ListContainer,
} from "src/shared/components";
import { useTypedSelector } from "src/store";
import { clearLikes, getPostLikes } from "src/store/post";
import { AppDispatch } from "src/store/types";

export const LikesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const { postInfoActive, postUserLikes, isLoadingPostLikes, totalPostLikes } =
    useTypedSelector(({ post }) => post);
  const { debouncedSearchTerm, onSearch } = useSearch({
    value: "",
  });
  const postId = useMemo(() => postInfoActive?._id, [postInfoActive?._id]);
  const scrollableDiv = useRef<HTMLDivElement>(null);

  const { page, setPage } = useScrollPagination({
    isLoading: isLoadingPostLikes,
    currentRecords: postInfoActive?.likes.length || 0,
    total: totalPostLikes,
    elementRef: scrollableDiv,
  });

  useEffect(() => {
    if (postId) {
      dispatch(
        getPostLikes({
          id: postId as string,
          queryParams: {
            username: debouncedSearchTerm || "",
            limit: 10,
            page,
          },
        })
      );
    }
  }, [dispatch, debouncedSearchTerm, postId, page]);

  useEffect(() => {
    dispatch(clearLikes());
    setPage(1);
  }, [postId]);

  return (
    <>
      <div className="users-container">
        <p className="users-list-title">Likes</p>

        <SearchInput placeholder="Buscar usuarios" onSearch={onSearch} />
      </div>
      {!postUserLikes.length && isLoadingPostLikes ? (
        <div className="h-[310px]">
          <Loading />
        </div>
      ) : (
        <ListContainer isLoading={isLoadingPostLikes} loadingHeight="50px">
          <div
            className="users-list h-[310px] overflow-auto scrollable-div"
            ref={scrollableDiv}
          >
            {postUserLikes.map((user) => (
              <UserCard key={user.username} user={user}>
                <Fragment>
                  {user._id !== currentUser?._id && (
                    <FollowButton
                      user={user}
                      currentUser={currentUser as User}
                    />
                  )}
                </Fragment>
              </UserCard>
            ))}
          </div>
        </ListContainer>
      )}
    </>
  );
};
