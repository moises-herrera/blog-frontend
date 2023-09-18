import { useEffect } from "react";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { addNewMessage, clearMessages, getMessages } from "src/store/chats";
import { Message } from "src/interfaces";
import { socket } from "src/socket";
import { ChatMessages } from ".";

export const ChatView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatSelected } = useTypedSelector(({ chats }) => chats);

  useEffect(() => {
    if (chatSelected?._id) {
      socket.emit("join", chatSelected._id);

      dispatch(
        getMessages({
          id: chatSelected._id,
          queryParams: {
            limit: 10,
            page: 1,
          },
        })
      );
    } else {
      dispatch(clearMessages());
    }
  }, [dispatch, chatSelected?._id]);

  useEffect(() => {
    const onNewMessage = (message: Message) => {
      dispatch(addNewMessage(message));
    };

    socket.on("message", onNewMessage);

    return () => {
      socket.off("message", onNewMessage);
    };
  }, []);

  return (
    <div className="hidden h-screen bg-secondary-100 md:w-1/2 lg:w-2/3 xl:w-2/3 md:block border-l border-[#B3B3B3] pt-3 px-4">
      <ChatMessages />
    </div>
  );
};
