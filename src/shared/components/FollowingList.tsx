import { User } from "src/interfaces";
import { FollowButton, ListContainer, Loading, SearchInput, UserCard } from ".";
import { useTypedSelector } from "src/store";
import { useScrollPagination, useSearch } from "src/hooks";
import { getFollowing } from "src/store/users";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";

export const FollowingList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const { following, followingLoading, followingResultsCount } =
    useTypedSelector(({ users }) => users);
  const currentUserId = useMemo(() => currentUser?._id, [currentUser?._id]);
  const { debouncedSearchTerm, onSearch } = useSearch({
    value: "",
  });
  const scrollableDiv = useRef<HTMLDivElement>(null);

  const { page } = useScrollPagination({
    isLoading: followingLoading,
    currentRecords: following?.length || 0,
    total: followingResultsCount,
    elementRef: scrollableDiv,
  });

  useEffect(() => {
    dispatch(
      getFollowing({
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
        <p className="users-list-title">Seguidos</p>

        <SearchInput placeholder="Buscar usuarios" onSearch={onSearch} />
      </div>
      {!following?.length && followingLoading ? (
        <div className="h-[310px]">
          <Loading />
        </div>
      ) : (
        <ListContainer isLoading={followingLoading} loadingHeight="50px">
          <div
            className="users-list h-[310px] overflow-auto scrollable-div"
            ref={scrollableDiv}
          >
            {following.map((user) => (
              <UserCard key={user.username} user={user}>
                <FollowButton user={user} currentUser={currentUser as User} />
              </UserCard>
            ))}
          </div>
        </ListContainer>
      )}
    </>
  );
};
