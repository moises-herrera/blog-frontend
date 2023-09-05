import { FeedContent } from 'src/feed/components';
import { posts } from 'src/mocks';
import { ProfileHeader } from 'src/profile/components';

export const Profile = () => {
  return (
    <section className="section-content">
      <ProfileHeader />

      <div className="mt-[300px] lg:mt-28">
        <FeedContent posts={posts} />
      </div>
    </section>
  );
};
