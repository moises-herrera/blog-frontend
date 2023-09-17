import { HeaderChat } from "./HeaderChat";
import not_chat from "src/assets/images/not-chat.svg";
import { useTypedSelector } from "src/store";
export const ChatView = () => {
  const { chatSelected } = useTypedSelector(({ chats }) => chats);
  return (
    <div className="hidden h-screen bg-[#D3D3D3] md:w-1/2 lg:w-2/3 xl:w-2/3 md:block border-l-[1px] border-[#B3B3B3] pl-7 pt-3 pr-7">
      {chatSelected ? (
        <HeaderChat
          avatar={chatSelected.avatar}
          fullname={chatSelected.fullname}
          id={chatSelected.id}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <img className="w-72 h-72" src={not_chat} />
        </div>
      )}
    </div>
  );
};
