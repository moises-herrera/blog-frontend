import { hasFollower } from "src/helpers";
import { User } from "src/interfaces";
import { FollowButton, UserCard } from "src/shared/components";
import { useTypedSelector } from "src/store";

interface UsersListProps {
  users: User[];
}

export const UsersList = ({ users }: UsersListProps) => {
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);

  return (
    <div className="users-list mt-4">
      {users.map((user) => (
        <div key={user.username}>
          {user._id !== currentUser?._id && (
            <UserCard user={user}>
              <FollowButton
                title={
                  !hasFollower(user, currentUser?._id as string)
                    ? "Seguir"
                    : "No seguir"
                }
              />
            </UserCard>
          )}
        </div>
      ))}
    </div>
  );
};
