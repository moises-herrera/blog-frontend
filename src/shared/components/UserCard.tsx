import { Avatar } from "@chakra-ui/react";
import { User } from "src/interfaces";
import { getFullName } from "src/helpers";

interface UserCardProps {
  user: User;
  children: React.ReactNode;
}

export const UserCard = ({ children, user }: UserCardProps) => {
  return (
    <div className="flex max-w-full bg-white rounded-lg justify-between p-3">
      <div className="flex items-center gap-3">
        <Avatar
          size="md"
          name={getFullName(user)}
          src={user.avatar}
        />
        <p>@{user.username}</p>
      </div>
      <div className="flex items-center max-w-full">{children}</div>
    </div>
  );
};
