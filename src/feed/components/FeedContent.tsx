import { PostInfo } from 'src/interfaces';
import { PostCard, PostForm } from '.';
import { useSelector } from 'react-redux';

interface FeedContentProps {
  posts: PostInfo[];
}

export const FeedContent = ({ posts }: FeedContentProps) => {
  const { isNewPostFormVisible } = useSelector(({ post }) => post);

  return (
    <div className="flex flex-col w-full items-center gap-8">
      {isNewPostFormVisible && <PostForm />}

      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
};
