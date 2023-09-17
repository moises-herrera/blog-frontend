import { Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { ChatData } from "src/interfaces";
import { setChatSelected } from "src/store/chats";
import { AppDispatch } from "src/store/types";
import { ChatModal } from ".";
import { useDisclosure } from "@chakra-ui/react";
import { getDateFormattedFromString } from "src/helpers";

export const ChatItem = (data: ChatData) => {
  const { participants, lastMessage } = data;
  const dispatch = useDispatch<AppDispatch>();
  const { firstName, lastName, avatar } = participants[0];
  const fullName = `${firstName} ${lastName}`;
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
      <div className="flex justify-between py-2 pl-3">
        <div className="flex">
          <Avatar name="Dan Abrahmov" src={avatar} />
          <div className="pl-3">
            <p className="font-bold">{fullName}</p>
            <p className="text-sm ">{lastMessage.content.text}</p>
          </div>
        </div>
        <div className="pr-3 text-sm">
          <p>{getDateFormattedFromString(lastMessage.createdAt)}</p>
        </div>
      </div>
      <ChatModal onClose={onClose} isOpen={isOpen} />
    </div>
  );
};
