import { PostInfo } from "src/interfaces";
import { PostCard, PostForm } from ".";
import { useTypedSelector } from "src/store";

interface FeedContentProps {
  posts: PostInfo[];
}

export const FeedContent = ({ posts }: FeedContentProps) => {
  const { isNewPostFormVisible } = useTypedSelector(({ post }) => post);

  return (
    <div className="flex flex-col items-center w-full gap-8">
      {isNewPostFormVisible && <PostForm />}

      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
};
