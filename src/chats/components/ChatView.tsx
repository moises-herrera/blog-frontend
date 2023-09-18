import { Fragment, useEffect, useRef, useState } from "react";
import { HeaderChat, MessageContent } from ".";
import defaultChat from "src/assets/images/default-chat.svg";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import {
  addNewMessage,
  getMessages,
  sendMessage,
  updateLastMessage,
} from "src/store/chats";
import { Button, Textarea } from "@chakra-ui/react";
import { Message, SendMessage } from "src/interfaces";
import { socket } from "src/socket";
import "./ChatView.css";
import { getDateFormattedFromString, isSameDate } from "src/helpers";
import { useScrollPagination } from "src/hooks";

export const ChatView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useTypedSelector(({ auth }) => auth);
  const {
    chatSelected,
    messages,
    isSendingMessage,
    isLoadingMessages,
    totalMessages,
  } = useTypedSelector(({ chats }) => chats);
  const participant = chatSelected?.participants[0];
  const [message, setMessage] = useState<string>("");
  const messagesListRef = useRef<HTMLDivElement>(null);
  const { page } = useScrollPagination({
    isLoading: isLoadingMessages,
    currentRecords: messages.length,
    total: totalMessages,
    elementRef: messagesListRef,
    isReverse: true,
  });

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
      dispatch(
        getMessages({
          id: chatSelected._id,
          queryParams: {
            limit: 15,
            page,
          },
        })
      );
    }
  }, [dispatch, chatSelected?._id, page]);

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
      {participant ? (
        <>
          <HeaderChat
            avatar={participant.avatar}
            fullName={participant.fullName}
          />
          <div
            className="messages-container scrollable-chat"
            ref={messagesListRef}
          >
            {messages.map(({ _id, content, sender, createdAt }, index) => (
              <Fragment key={_id}>
                <>
                  {index !== 0 &&
                    !isSameDate(createdAt, messages[index - 1].createdAt) && (
                      <div className="w-full flex justify-center">
                        <span className="date-label">
                          {getDateFormattedFromString(createdAt)}
                        </span>
                      </div>
                    )}
                </>
                <MessageContent
                  content={content}
                  createdAt={createdAt}
                  isFromCurrentUser={sender === user?._id}
                />
              </Fragment>
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
