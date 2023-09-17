import { Avatar } from "@chakra-ui/react";

interface HeaderChatProps {
  avatar: string;
  fullName: string;
}

export const HeaderChat = ({ avatar, fullName }: HeaderChatProps) => {
  return (
    <div className="w-full border-b-[1px] border-[#B3B3B3] pb-3">
      <div className="flex">
        <Avatar name="Dan Abrahmov" src={avatar} />
        <div className="pl-3">
          <p className="font-bold">{fullName}</p>
        </div>
      </div>
    </div>
  );
};
