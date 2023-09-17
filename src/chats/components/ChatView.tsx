import { useEffect, useState } from "react";
import { HeaderChat, MessageContent } from ".";
import defaultChat from "src/assets/images/default-chat.svg";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { addNewMessage, getMessages, sendMessage } from "src/store/chats";
import { Button, Textarea } from "@chakra-ui/react";
import { Message, SendMessage } from "src/interfaces";
import { socket } from "src/socket";
import "./ChatView.css";

export const ChatView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useTypedSelector(({ auth }) => auth);
  const { chatSelected, messages, isSendingMessage } = useTypedSelector(
    ({ chats }) => chats
  );
  const participant = chatSelected?.participants[0];
  const [message, setMessage] = useState<string>("");

  const onChangeMessage = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(value);
  };

  const onSendMessage = () => {
    if (!chatSelected?._id || !message.trim()) return;

    const data: SendMessage = {
      id: chatSelected._id,
      message: {
        content: {
          text: message,
        },
      },
    };

    setMessage("");
    dispatch(sendMessage(data));
  };

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
      {participant ? (
        <>
          <HeaderChat
            avatar={participant.avatar}
            fullName={participant.fullName}
          />
          <div className="messages-container scrollable-chat">
            {messages.map(({ _id, content, sender, createdAt }) => (
              <MessageContent
                key={_id}
                content={content}
                createdAt={createdAt}
                isFromCurrentUser={sender === user?._id}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 bg-white p-3 rounded-md">
            <Textarea
              backgroundColor="white"
              resize="none"
              placeholder="Mensaje"
              value={message}
              onChange={onChangeMessage}
            />
            <div className="flex justify-end">
              <Button
                onClick={onSendMessage}
                leftIcon={<i className="fa-regular fa-paper-plane"></i>}
                variant="message"
                isLoading={isSendingMessage}
              >
                Enviar
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <div className="max-w-[500px]">
            <img className="w-full" src={defaultChat} />
          </div>
        </div>
      )}
    </div>
  );
};
