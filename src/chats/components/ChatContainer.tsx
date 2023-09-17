import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ChatItem } from ".";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { useEffect, useRef } from "react";
import { getChatsList } from "src/store/chats";
import { useScrollPagination, useSearch } from "src/hooks";

export const ChatContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, isLoadingList, totalChats } = useTypedSelector(
    ({ chats }) => chats
  );
  const { debouncedSearchTerm, onSearch } = useSearch({ value: "" });
  const listRef = useRef<HTMLDivElement>(null);

  const { page } = useScrollPagination({
    isLoading: isLoadingList,
    currentRecords: list.length,
    total: totalChats,
    elementRef: listRef,
  });

  useEffect(() => {
    dispatch(
      getChatsList({
        search: debouncedSearchTerm || "",
        limit: 10,
        page,
      })
    );
  }, [dispatch, debouncedSearchTerm, page]);

  return (
    <div className="w-full h-screen bg-secondary-100 md:w-1/2 lg:w-1/3 xl:w-1/2 2xl:w-1/3">
      <div className="flex w-full px-3 pt-16 pb-5 md:pt-3">
        <form className="w-full ">
          <InputGroup>
            <InputLeftElement>
              <button className="ml-[10px]">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </InputLeftElement>
            <Input
              onChange={onSearch}
              type="text"
              placeholder="Buscar..."
              marginLeft={"5px"}
              background={"ffffff"}
            />
          </InputGroup>
        </form>
        <i className="pl-2 pt-2 text-2xl fa-solid fa-pencil"></i>
      </div>
      <div
        ref={listRef}
        className="w-full px-3 overflow-auto chat-list scrollable-chat"
      >
        {list.map((chat) => (
          <ChatItem key={chat._id} {...chat} />
        ))}
      </div>
    </div>
  );
};
