import { PostInfo } from 'src/interfaces';
import { PostCard, PostForm } from '.';

interface FeedContentProps {
  posts: PostInfo[];
}

export const FeedContent = ({ posts }: FeedContentProps) => {
  return (
    <>
      <PostForm />

      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </>
  );
};
