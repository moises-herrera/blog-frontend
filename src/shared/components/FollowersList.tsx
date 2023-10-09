import { User } from "src/interfaces";
import { FollowButton, ListContainer, Loading, SearchInput, UserCard } from ".";
import { useTypedSelector } from "src/store";
import { useScrollPagination, useSearch } from "src/hooks";
import { getFollowers } from "src/store/users";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";

export const FollowersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const { followers, followersLoading, followersResultsCount } =
    useTypedSelector(({ users }) => users);
  const currentUserId = useMemo(() => currentUser?._id, [currentUser?._id]);
  const { debouncedSearchTerm, onSearch } = useSearch({
    value: "",
  });
  const scrollableDiv = useRef<HTMLDivElement>(null);

  const { page } = useScrollPagination({
    isLoading: followersLoading,
    currentRecords: followers?.length || 0,
    total: followersResultsCount,
    elementRef: scrollableDiv,
  });

  useEffect(() => {
    dispatch(
      getFollowers({
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
        <p className="users-list-title">Seguidores</p>

        <SearchInput placeholder="Buscar usuarios" onSearch={onSearch} />
      </div>
      {!followers.length && followersLoading ? (
        <div className="h-[310px]">
          <Loading />
        </div>
      ) : (
        <ListContainer isLoading={followersLoading} loadingHeight="50px">
          <div
            className="users-list h-[310px] overflow-auto scrollable-div"
            ref={scrollableDiv}
          >
            {followers.map((user) => (
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
