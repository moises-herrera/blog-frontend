import { PostInfo } from 'src/interfaces';
import { PostCard, PostForm } from '.';

interface FeedContentProps {
  posts: PostInfo[];
}

export const FeedContent = ({ posts }: FeedContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <PostForm />

      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
};
