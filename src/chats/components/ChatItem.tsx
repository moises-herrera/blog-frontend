import { Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { ChatData } from "src/interfaces";
import { setChatSelected } from "src/store/chats";
import { AppDispatch } from "src/store/types";
import { ChatModal } from ".";
import { useDisclosure } from "@chakra-ui/react";
import { getTimeFormatted } from "src/helpers";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";

export const ChatItem = (data: ChatData) => {
  const { participants, lastMessage } = data;
  const dispatch = useDispatch<AppDispatch>();
  const { fullName, avatar } = participants[0];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSelectChat = () => {
    dispatch(setChatSelected(data));
    onOpen();
  };

  return (
    <div
      className="w-full mb-3 bg-white rounded-lg cursor-pointer"
      onClick={onSelectChat}
    >
      <div className="flex max-w-full justify-between py-2 pl-3">
        <div className="flex max-w-full">
          <Avatar name={fullName} src={avatar || avatarPlaceholder} />
          <div className="pl-3">
            <p className="font-bold">{fullName}</p>
            <p className="text-sm truncate">{lastMessage.content.text}</p>
          </div>
        </div>
        <div className="pr-3 text-sm">
          <p>{getTimeFormatted(lastMessage.createdAt)}</p>
        </div>
      </div>
      <ChatModal onClose={onClose} isOpen={isOpen} />
    </div>
  );
};
