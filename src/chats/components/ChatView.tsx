import { ChatMessages } from ".";
import "./ChatView.css";

export const ChatView = () => {
  return (
    <div className="chat-selected-container">
      <ChatMessages />
    </div>
  );
};
