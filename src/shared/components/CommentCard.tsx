import { Avatar } from "@chakra-ui/react";

interface Props {
  user: string;
  comment: string;
  img: string;
}
export const CommentCard = ({ user, comment, img }: Props) => {
  return (
    <div className="flex mb-4">
      <div className="pl-3 pr-4">
        <Avatar size="lg" name="Non" src={img} />
      </div>
      <div className="flex flex-col w-full text-white">
        <div className="flex flex-row justify-between w-full">
          <p className="font-bold text-[16px]">{user}</p>
          <i className="pr-3 text-xl text-white fa-solid fa-ellipsis-vertical"></i>
        </div>
        <p className="pr-3 text-[14px]">{comment}</p>
      </div>
    </div>
  );
};
