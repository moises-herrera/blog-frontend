import { Avatar } from "@chakra-ui/react";
import { User } from "src/interfaces";
import { getFullName } from "src/helpers";
import { Link } from "react-router-dom";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";
import { Username } from ".";

interface UserCardProps {
  user: User;
  children: React.ReactNode;
}

export const UserCard = ({ children, user }: UserCardProps) => {
  return (
    <div className="flex items-center max-w-full bg-white rounded-lg justify-between p-3">
      <Link to={`/profile/${user.username}`} className="w-3/5">
        <div className="flex items-center gap-3 w-full">
          <Avatar
            size="md"
            name={getFullName(user)}
            src={user.avatar || avatarPlaceholder}
          />
          <p className="truncate">
            <Username
              username={user.username}
              isAccountVerified={user.isAccountVerified}
            />
          </p>
        </div>
      </Link>
      <div className="flex items-center max-w-full">{children}</div>
    </div>
  );
};
