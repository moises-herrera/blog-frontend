import { FeedContent } from "src/feed/components";
import { ListContainer, Loading, SearchInput } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { searchPosts } from "src/store/post";
import { useScrollPagination, useSearch } from "src/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, isLoadingSearch, totalResults } = useTypedSelector(
    ({ post }) => post
  );

  const { debouncedSearchTerm, onSearch } = useSearch({
    value: "",
  });

  const { page } = useScrollPagination({
    isLoading: isLoadingSearch,
    currentRecords: searchResults.length,
    total: totalResults,
  });

  useEffect(() => {
    dispatch(
      searchPosts({
        search: debouncedSearchTerm || "",
        limit: 10,
        page,
      })
    );
  }, [dispatch, debouncedSearchTerm, page]);

  useEffect(() => {
    document.title = "Buscar publicaciones";
  }, []);

  return (
    <div className="section-content px-4 !pt-12">
      <div className="px-4">
        <h2 className="text-3xl font-semibold mb-4">Buscar publicaciones</h2>

        <SearchInput
          placeholder="Buscar tema de interés"
          onSearch={onSearch}
          backgroundColor="white"
          textColor="black"
          iconClassName="text-gray-400"
        />
      </div>

      {!searchResults.length && isLoadingSearch ? (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      ) : (
        <div className="mt-8">
          <ListContainer isLoading={isLoadingSearch}>
            <FeedContent posts={searchResults} />
          </ListContainer>
        </div>
      )}
    </div>
  );
};
