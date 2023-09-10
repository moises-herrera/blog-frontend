import { FeedContent } from "src/feed/components";
import { Loading, SearchInput } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { searchPosts } from "src/store/post";
import { useSearch } from "src/hooks";
import { PostInfo } from "src/interfaces";

export const Search = () => {
  const { searchResults, isLoadingSearch } = useTypedSelector(
    ({ post }) => post
  );
  const { onSearch } = useSearch<PostInfo, string>({
    value: "all",
    action: searchPosts,
  });

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
