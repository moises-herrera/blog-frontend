import { Avatar } from "@chakra-ui/react";

interface Props {
  user: string;
  children: React.ReactNode;
}
export const UserCard = ({ children, user }: Props) => {
  return (
    <>
      <div className="flex max-w-full h-[54px] bg-white rounded-lg mb-2 justify-between mr-1">
        <div className="flex items-center">
          <Avatar
            marginLeft={"10px"}
            marginRight={"5px"}
            size="md"
            name="Non"
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
          />
          <p>{user}</p>
        </div>
        <div className="flex items-center max-w-full mr-2">{children}</div>
      </div>
    </>
  );
};
