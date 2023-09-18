import { Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { ChatData } from "src/interfaces";
import { setChatSelected } from "src/store/chats";
import { AppDispatch } from "src/store/types";
import { getTimeFormatted } from "src/helpers";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";
import { useCallback } from "react";

export const ChatItem = (data: ChatData) => {
  const { participants, lastMessage } = data;
  const dispatch = useDispatch<AppDispatch>();
  const { fullName, avatar } = participants[0];

  const onSelectChat = useCallback(() => {
    dispatch(setChatSelected(data));
  }, [dispatch, data]);

  return (
    <div
      className="w-full mb-3 bg-white rounded-lg cursor-pointer"
      onClick={onSelectChat}
    >
      <div className="relative flex justify-between max-w-full py-2 pl-3">
        <div className="flex max-w-full">
          <Avatar name={fullName} src={avatar || avatarPlaceholder} />
          <div className="pl-3">
            <p className="font-bold">{fullName}</p>
            <p className="text-sm truncate max-w-[300px]">
              {lastMessage?.content.text || ""}
            </p>
          </div>
        </div>
        <div className="absolute right-3 text-sm">
          <p>{getTimeFormatted(lastMessage?.createdAt || "")}</p>
        </div>
      </div>
    </div>
  );
};
