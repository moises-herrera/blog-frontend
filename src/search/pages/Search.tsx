import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FeedContent } from "src/feed/components";
import { Loading, SearchInput } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { useDebounce } from "use-debounce";
import { searchPosts } from "src/store/post";

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, isLoadingSearch } = useTypedSelector(
    ({ post }) => post
  );
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 600);

  useEffect(() => {
    if (debouncedSearchTerm !== null) {
      dispatch(searchPosts(debouncedSearchTerm));
    }
  }, [dispatch, debouncedSearchTerm]);

  const onSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
  };

  return (
    <div className="section-content p-8 !py-12">
      <h2 className="text-3xl font-semibold mb-4">Buscar publicaciones</h2>

      <SearchInput
        placeholder="Buscar tema de interés"
        onSearch={onSearch}
        backgroundColor="white"
        textColor="black"
        iconClassName="text-gray-400"
      />

      {isLoadingSearch ? (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      ) : (
        <div className="mt-8">
          <FeedContent posts={searchResults} />
        </div>
      )}
    </div>
  );
};
