import { Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { ChatItem } from "src/interfaces";
import { setChatSelected } from "src/store/chats";
import { AppDispatch } from "src/store/types";
import { ChatModal } from ".";
import { useDisclosure } from "@chakra-ui/react";
export const ChatItems = ({ id, fullname, avatar }: ChatItem) => {
  const dispatch = useDispatch<AppDispatch>();
  const onSelectChat = () => {
    //767
    dispatch(setChatSelected({ id, fullname, avatar }));
    onOpen();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      className="w-full mb-3 bg-white rounded-lg cursor-pointer"
      onClick={onSelectChat}
    >
      <div className="flex justify-between py-2 pl-3">
        <div className="flex">
          <Avatar name="Dan Abrahmov" src={avatar} />
          <div className="pl-3">
            <p className="font-bold">{fullname}</p>
            <p className="text-sm ">{"Manana sera bonito"}</p>
          </div>
        </div>
        <div className="pr-3 text-sm">
          <p>{"27/12/2023"}</p>
        </div>
      </div>
      <ChatModal onClose={onClose} isOpen={isOpen} />
    </div>
  );
};
