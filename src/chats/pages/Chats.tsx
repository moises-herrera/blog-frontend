import { useEffect } from "react";
import { toggleRightSidebar } from "src/store/ui";
import { useDispatch } from "react-redux";
import { ChatContainer, ChatView } from "src/chats/components";

export const Chats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleRightSidebar());
    return () => {
      dispatch(toggleRightSidebar());
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <ChatContainer />
      <ChatView />
    </div>
  );
};
