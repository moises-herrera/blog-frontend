import { useEffect } from "react";
import { toggleRightSidebar } from "src/store/ui";
import { useDispatch } from "react-redux";
import { ChatContainer, ChatView } from "src/chats/components";
import {
  addChatToList,
  addNewMessage,
  updateLastMessage,
} from "src/store/chats";
import { ChatData, Message } from "src/interfaces";
import { AppDispatch } from "src/store/types";
import { socket } from "src/socket";
import { useTypedSelector } from "src/store";

export const Chats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useTypedSelector(({ auth }) => auth);
  const { isChatModalOpen } = useTypedSelector(({ chats }) => chats);

  useEffect(() => {
    dispatch(toggleRightSidebar());
    return () => {
      dispatch(toggleRightSidebar());
    };
  }, []);

  useEffect(() => {
    const onNewMessage = (message: Message) => {
      dispatch(addNewMessage(message));
      dispatch(updateLastMessage(message));
    };

    const onNewChat = (chat: ChatData) => {
      dispatch(addChatToList(chat));
    };

    socket.emit("join", user?._id);

    socket.on("message", onNewMessage);

    socket.on("new-chat", onNewChat);

    return () => {
      socket.off("message", onNewMessage);
      socket.off("new-chat", onNewChat);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <ChatContainer />
      {!isChatModalOpen && <ChatView />}
    </div>
  );
};
