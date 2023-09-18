import { Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { ChatData } from "src/interfaces";
import {
  closeChatModal,
  openChatModal,
  setChatSelected,
} from "src/store/chats";
import { AppDispatch } from "src/store/types";
import { ChatModal } from ".";
import { getTimeFormatted } from "src/helpers";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";
import { useTypedSelector } from "src/store";

export const ChatItem = (data: ChatData) => {
  const { participants, lastMessage } = data;
  const dispatch = useDispatch<AppDispatch>();
  const { fullName, avatar } = participants[0];
  const { isChatModalOpen } = useTypedSelector(({ chats }) => chats);

  const onSelectChat = () => {
    dispatch(setChatSelected(data));
    const isMobile = window.screen.width <= 767;

    if (isMobile) {
      dispatch(openChatModal());
    }
  };

  const onCloseModal = () => {
    dispatch(closeChatModal());
  };

  return (
    <div
      className="w-full mb-3 bg-white rounded-lg cursor-pointer"
      onClick={onSelectChat}
    >
      <div className="flex justify-between max-w-full py-2 pl-3">
        <div className="flex max-w-full">
          <Avatar name={fullName} src={avatar || avatarPlaceholder} />
          <div className="pl-3">
            <p className="font-bold">{fullName}</p>
            <p className="text-sm truncate">
              {lastMessage?.content.text || ""}
            </p>
          </div>
        </div>
        <div className="pr-3 text-sm">
          <p>{getTimeFormatted(lastMessage?.createdAt || "")}</p>
        </div>
      </div>
      <ChatModal onClose={onCloseModal} isOpen={isChatModalOpen} />
    </div>
  );
};
