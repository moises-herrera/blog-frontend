import { Chat } from ".";
import { Avatar } from "@chakra-ui/react";

export const HeaderChat = ({ avatar, fullname }: Chat) => {
  return (
    <div className="w-full border-b-[1px] border-[#B3B3B3] pb-3">
      <div className="flex">
        <Avatar name="Dan Abrahmov" src={avatar} />
        <div className="pl-3">
          <p className="font-bold">{fullname}</p>
          <p className="text-sm ">{"Typing..."}</p>
        </div>
      </div>
    </div>
  );
};
