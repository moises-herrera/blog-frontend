import { useEffect } from "react";

import { toggleRightSidebar } from "src/store/ui";
import { useDispatch } from "react-redux";
import { ChatContainer } from "../components/ChatContainer";
import { ChatView } from "../components/ChatView";

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
