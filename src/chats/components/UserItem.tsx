import { ChatData } from "src/interfaces";
import { AppDispatch } from "src/store/types";
import { useDispatch } from "react-redux";
import { openChatModal, setChatSelected } from "src/store/chats";
import { Avatar } from "@chakra-ui/react";
interface NewChat {
  onClose: () => void;
  _id: string;
  fullName: string;
  avatar: string;
}

export const UserItem = ({ _id, fullName, avatar, onClose }: NewChat) => {
  const dispatch = useDispatch<AppDispatch>();
  const onSelectUser = () => {
    const newChat = {
      participants: [
        {
          _id,
          fullName,
          avatar,
        },
      ],
    } as ChatData;
    dispatch(setChatSelected(newChat));

    const isMobile = window.screen.width <= 767;

    if (isMobile) {
      dispatch(openChatModal());
    }
    onClose();
  };
  return (
    <div
      className="w-full bg-white rounded-lg cursor-pointer"
      onClick={onSelectUser}
    >
      <div className="flex justify-between max-w-full py-2 pl-3">
        <div className="flex max-w-full">
          <Avatar name={fullName} src={avatar} />
          <div className="flex items-center pl-3">
            <p className="font-bold">{fullName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
