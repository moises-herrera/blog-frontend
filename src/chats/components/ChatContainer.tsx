import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ChatItem, ChatModal } from ".";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { useEffect, useRef } from "react";
import { closeChatModal, getChatsList } from "src/store/chats";
import { useScrollPagination, useSearch } from "src/hooks";
import { socket } from "src/socket";
import { SearchUsersModal } from ".";
import { openSearchUsersModal } from "src/store/ui";

export const ChatContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, isLoadingList, totalChats } = useTypedSelector(
    ({ chats }) => chats
  );
  const { debouncedSearchTerm, onSearch } = useSearch({ value: "" });
  const listRef = useRef<HTMLDivElement>(null);
  const { isChatModalOpen } = useTypedSelector(({ chats }) => chats);

  const onCloseModal = () => {
    dispatch(closeChatModal());
  };

  const onOpenUsersModal = () => {
    dispatch(openSearchUsersModal());
  };

  const { page } = useScrollPagination({
    isLoading: isLoadingList,
    currentRecords: list?.length,
    total: totalChats,
    elementRef: listRef,
  });

  useEffect(() => {
    if (list?.length) {
      const chatIds = list.map(({ _id }) => _id);
      socket.emit("join", chatIds);
    }
  }, [list]);

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
    <div className="w-full bg-secondary-100 md:w-1/2 lg:w-1/3 xl:w-1/2 2xl:w-1/3">
      <div className="flex items-center w-full gap-2 px-3 pt-16 pb-5 md:pt-3">
        <SearchUsersModal />
        <form className="w-full">
          <InputGroup>
            <InputLeftElement>
              <button type="button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </InputLeftElement>
            <Input
              onChange={onSearch}
              type="text"
              placeholder="Buscar..."
              background={"ffffff"}
            />
          </InputGroup>
        </form>
        <button onClick={onOpenUsersModal}>
          <i className="text-2xl text-accent-500 fa-solid fa-circle-plus"></i>
        </button>
      </div>
      <div
        ref={listRef}
        className="w-full px-3 overflow-y-auto chat-list scrollbar-gray"
      >
        {list.map((chat) => (
          <ChatItem key={chat._id} {...chat} />
        ))}
        {isChatModalOpen && (
          <ChatModal onClose={onCloseModal} isOpen={isChatModalOpen} />
        )}
      </div>
    </div>
  );
};
