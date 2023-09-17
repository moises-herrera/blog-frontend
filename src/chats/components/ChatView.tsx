import { useEffect, useState } from "react";
import { HeaderChat } from ".";
import not_chat from "src/assets/images/not-chat.svg";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { getMessages, sendMessage } from "src/store/chats";
import { Textarea } from "@chakra-ui/react";
import "./ChatView.css";

export const ChatView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useTypedSelector(({ auth }) => auth);
  const { chatSelected, messages } = useTypedSelector(({ chats }) => chats);
  const participant = chatSelected?.participants[0];
  const [message, setMessage] = useState<string>("");

  const onChangeMessage = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(value);
  };

  const onSendMessage = ({ key }: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (key !== "Enter" || !chatSelected?._id || !message.trim()) return;

    dispatch(
      sendMessage({
        id: chatSelected._id,
        message: {
          content: {
            text: message,
          },
        },
      })
    );
  };

  useEffect(() => {
    if (chatSelected?._id) {
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
                  className={`bg-white rounded-md py-2 px-4 ${
                    sender === user?._id
                      ? "justify-self-end bg-accent-500 text-white ml-6"
                      : "justify-self-start mr-6"
                  }`}
                >
                  {content.text}
                </p>
              ))}
            </div>
          </div>
          <Textarea
            backgroundColor="white"
            resize="none"
            placeholder="Mensaje"
            onChange={onChangeMessage}
            onKeyDown={onSendMessage}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <img className="w-72 h-72" src={not_chat} />
        </div>
      )}
    </div>
  );
};
