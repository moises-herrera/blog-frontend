import { GetFollowers, User } from "src/interfaces";
import { FollowButton, Loading, SearchInput, UserCard } from ".";
import { useTypedSelector } from "src/store";
import { useSearch } from "src/hooks";
import { getFollowing } from "src/store/users";
import { useCallback, useMemo } from "react";

export const FollowingList = () => {
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);
  const { following, followingLoading } = useTypedSelector(
    ({ users }) => users
  );
  const currentUserId = useMemo(() => currentUser?._id, [currentUser?._id]);
  const searchResults = useCallback(
    (filter: string) =>
      getFollowing({
        id: currentUserId as string,
        username: filter,
      }),
    [currentUserId]
  );

  const { onSearch } = useSearch<User, GetFollowers>({
    value: "",
    action: searchResults,
  });

  return (
    <>
      <div className="users-container">
        <p className="users-list-title">Seguidos</p>

        <SearchInput placeholder="Buscar usuarios" onSearch={onSearch} />
      </div>
      <div className="users-list h-[310px] overflow-auto scrollable-div">
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
