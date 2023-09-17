import { getTimeString } from "src/helpers";

interface MessageContentProps {
  content: {
    text: string;
  };
  createdAt: Date;
  isFromCurrentUser: boolean;
}

export const MessageContent = ({
  content,
  createdAt,
  isFromCurrentUser,
}: MessageContentProps) => {
  return (
    <div
      className={`flex ${isFromCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex rounded-md p-2 ${
          isFromCurrentUser ? "bg-accent-500 text-white ml-6" : "bg-white mr-6"
        }`}
      >
        <span>{content.text}</span>
        <div className="flex items-end pl-2">
          <span className="text-xs">{getTimeString(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
