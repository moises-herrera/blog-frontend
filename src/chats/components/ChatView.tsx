import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { addNewMessage, updateLastMessage } from "src/store/chats";
import { Message } from "src/interfaces";
import { socket } from "src/socket";
import { ChatMessages } from ".";
import "./ChatView.css";

export const ChatView = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const onNewMessage = (message: Message) => {
      dispatch(addNewMessage(message));
      dispatch(updateLastMessage(message));
    };

    socket.on("message", onNewMessage);

    return () => {
      socket.off("message", onNewMessage);
    };
  }, []);

  return (
    <div className="chat-selected-container">
      <ChatMessages />
    </div>
  );
};
