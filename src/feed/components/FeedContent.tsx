import { Box, Image } from "@chakra-ui/react";
import { PostInfo } from "src/interfaces";
import { DeletePostModal, PostCard } from "src/post/components";
import feedContent from "src/assets/images/feed.svg";

interface FeedContentProps {
  posts: PostInfo[];
}

export const FeedContent = ({ posts }: FeedContentProps) => {
  return (
    <>
      {posts.length > 0 ? (
        <div className="flex flex-col items-center h-full w-full gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}

          <DeletePostModal />
        </div>
      ) : (
        <div className="feed-empty">
          <Box className="flex items-center justify-center">
            <Image src={feedContent} alt="Feed" />
          </Box>
        </div>
      )}
    </>
  );
};
