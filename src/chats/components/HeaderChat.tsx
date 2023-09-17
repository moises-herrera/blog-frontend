import { Avatar } from "@chakra-ui/react";

interface HeaderChatProps {
  avatar: string;
  fullName: string;
}

export const HeaderChat = ({ avatar, fullName }: HeaderChatProps) => {
  return (
    <div className="w-full border-b border-[#B3B3B3] pb-3">
      <div className="flex items-center">
        <Avatar name={fullName} src={avatar} />
        <div className="pl-3">
          <p className="font-bold">{fullName}</p>
        </div>
      </div>
    </div>
  );
};
