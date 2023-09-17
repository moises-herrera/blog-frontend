import { HeaderChat } from ".";
import not_chat from "src/assets/images/not-chat.svg";
import { useTypedSelector } from "src/store";

export const ChatView = () => {
  const { chatSelected } = useTypedSelector(({ chats }) => chats);
  const participant = chatSelected?.participants[0];

  return (
    <div className="hidden h-screen bg-secondary-200 md:w-1/2 lg:w-2/3 xl:w-2/3 md:block border-l-[1px] border-[#B3B3B3] pl-7 pt-3 pr-7">
      {participant ? (
        <HeaderChat
          avatar={participant.avatar}
          fullName={participant.fullName}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <img className="w-72 h-72" src={not_chat} />
        </div>
      )}
    </div>
  );
};
