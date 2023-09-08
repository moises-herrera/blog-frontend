import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FeedContent } from "src/feed/components";
import { ProfileHeader } from "src/profile/components";
import { Loading } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { getUserPosts } from "src/store/post";
import { AppDispatch } from "src/store/types";

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useTypedSelector(({ auth }) => auth);
  const { userPosts, isLoadingUserPosts } = useTypedSelector(
    ({ post }) => post
  );

  useEffect(() => {
    dispatch(getUserPosts(user?._id as string));
  }, []);

  return (
    <section className="section-content">
      <ProfileHeader />

      <div className="mt-[300px] lg:mt-28">
        {!isLoadingUserPosts ? (
          <FeedContent posts={userPosts} />
        ) : (
          <div className="loading-container">
            <Loading textClass="text-black" />
          </div>
        )}
      </div>
    </section>
  );
};
