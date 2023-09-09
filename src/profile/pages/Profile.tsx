import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FeedContent } from "src/feed/components";
import { ProfileHeader } from "src/profile/components";
import { Loading } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { getUserPosts } from "src/store/post";
import { AppDispatch } from "src/store/types";
import { getUser } from "src/store/users";

export const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { userPosts, isLoadingUserPosts } = useTypedSelector(
    ({ post }) => post
  );
  const { userProfile, userProfileLoading } = useTypedSelector(
    ({ users }) => users
  );

  useEffect(() => {
    if (userProfile) dispatch(getUserPosts(userProfile._id));
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (username) dispatch(getUser(username));
  }, [dispatch, username]);

  return (
    <section className="section-content">
      {!userProfileLoading && userProfile ? (
        <>
          <ProfileHeader user={userProfile} />

          <div className="mt-[300px] lg:mt-28">
            {!isLoadingUserPosts ? (
              <FeedContent posts={userPosts} />
            ) : (
              <div className="loading-container">
                <Loading textClass="text-black" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      )}
    </section>
  );
};
