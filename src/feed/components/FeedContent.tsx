import { PostInfo } from "src/interfaces";
import { DeletePostModal, PostCard } from "src/post/components";

interface FeedContentProps {
  posts: PostInfo[];
}

export const FeedContent = ({ posts }: FeedContentProps) => {
  return (
    <div className="flex flex-col items-center w-full gap-8">
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}

      <DeletePostModal />
    </div>
  );
};
