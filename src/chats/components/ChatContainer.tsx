import { useState, ChangeEvent } from "react";
import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { ChatItems } from "./ChatItem";
import { datachats } from "src/mocks/users";

export const ChatContainer = () => {
  const [search, setSearch] = useState<string>("");
  const onSearchUser = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="w-full h-screen bg-[#D3D3D3] md:w-1/2 lg:w-1/3 xl:w-1/2 2xl:w-1/3">
      <div className="flex w-full px-3 pt-16 pb-5 md:pt-3">
        <form className="w-full ">
          <InputGroup>
            <InputLeftElement>
              <Button
                type="submit"
                backgroundColor={"#ffffff"}
                marginLeft={"10px"}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputLeftElement>
            <Input
              onChange={onSearchUser}
              type="text"
              placeholder="Buscar..."
              marginLeft={"5px"}
              background={"ffffff"}
            />
          </InputGroup>
        </form>
        <i className="pl-2 pt-2 text-2xl fa-solid fa-pencil text-[##e9ecf1]"></i>
      </div>
      <div className="w-full px-3 overflow-auto chat-list scrollable-chat">
        {datachats
          .filter((user) =>
            user.firstName.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div key={item._id}>
              <ChatItems
                id={item._id}
                fullname={`${item.firstName} ${item.lastName}`}
                avatar={item.avatar}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
