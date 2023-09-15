import { User } from "src/interfaces";
import { FollowButton, Loading, SearchInput, UserCard } from ".";
import { useTypedSelector } from "src/store";
import { useScrollPagination, useSearch } from "src/hooks";
import { getFollowing } from "src/store/users";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";

export const FollowingList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const { following, followingLoading, totalFollowing, followingResultsCount } =
    useTypedSelector(({ users }) => users);
  const currentUserId = useMemo(() => currentUser?._id, [currentUser?._id]);
  const { debouncedSearchTerm, onSearch } = useSearch({
    value: "",
  });
  const scrollableDiv = useRef<HTMLDivElement>(null);

  const { page } = useScrollPagination({
    isLoading: followingLoading,
    currentRecords: followingResultsCount,
    total: totalFollowing,
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
      <div
        className="users-list h-[310px] overflow-auto scrollable-div"
        ref={scrollableDiv}
      >
        {!followingLoading ? (
          following.map((user) => (
            <UserCard key={user.username} user={user}>
              <FollowButton user={user} currentUser={currentUser as User} />
            </UserCard>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
