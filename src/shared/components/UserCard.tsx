import { Avatar } from "@chakra-ui/react";

interface Props {
  user: string;
  img: string;
  children: React.ReactNode;
}
export const UserCard = ({ children, user, img }: Props) => {
  return (
    <>
      <div className="flex max-w-full h-[54px] bg-white rounded-lg mb-2 justify-between mr-1">
        <div className="flex items-center">
          <Avatar
            marginLeft={"10px"}
            marginRight={"5px"}
            size="md"
            name="Non"
            src={img}
          />
          <p>{user}</p>
        </div>
        <div className="flex items-center max-w-full mr-2">{children}</div>
      </div>
    </>
  );
};
