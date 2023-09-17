import { useEffect, useState } from "react";
import { HeaderChat } from ".";
import not_chat from "src/assets/images/not-chat.svg";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { addNewMessage, getMessages, sendMessage } from "src/store/chats";
import { Button, Textarea } from "@chakra-ui/react";
import "./ChatView.css";
import { Message, SendMessage } from "src/interfaces";
import { socket } from "src/socket";

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
    <div className="hidden h-screen bg-secondary-200 md:w-1/2 lg:w-2/3 xl:w-2/3 md:block border-l-[1px] border-[#B3B3B3] pl-7 pt-3 pr-7">
      {participant ? (
        <>
          <HeaderChat
            avatar={participant.avatar}
            fullName={participant.fullName}
          />
          <div className="messages-container">
            <div className="grid gap-3 pt-5">
              {messages.map(({ _id, content, sender }) => (
                <p
                  key={_id}
                  className={`rounded-md py-2 px-4 ${
                    sender === user?._id
                      ? "justify-self-end bg-accent-500 text-white ml-6"
                      : "justify-self-start bg-white mr-6"
                  }`}
                >
                  {content.text}
                </p>
              ))}
            </div>
          </div>
          <div className="grid gap-2 bg-white p-3 rounded-md">
            <Textarea
              backgroundColor="white"
              resize="none"
              placeholder="Mensaje"
              value={message}
              onChange={onChangeMessage}
            />
            <Button
              onClick={onSendMessage}
              className="justify-self-end"
              leftIcon={<i className="fa-regular fa-paper-plane"></i>}
              variant="message"
              isLoading={isSendingMessage}
            >
              Enviar
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <img className="w-72 h-72" src={not_chat} />
        </div>
      )}
    </div>
  );
};
