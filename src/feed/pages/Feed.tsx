import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FeedContent } from "src/feed/components";
import { Loading } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { getPostsFollowing, getPostsSuggested } from "src/store/post";
import { AppDispatch } from "src/store/types";

export const Feed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    postFollowingList,
    isLoadingFollowing,
    postSuggestedList,
    isLoadingSuggested,
  } = useTypedSelector(({ post }) => post);

  useEffect(() => {
    dispatch(getPostsFollowing());
    dispatch(getPostsSuggested());
  }, []);

  return (
    <section className="section-content">
      <Tabs colorScheme="accent" align="center" paddingTop={10}>
        <TabList width="230px">
          <Tab fontSize={18}>Seguidos</Tab>
          <Tab fontSize={18}>Sugeridos</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {!isLoadingFollowing ? (
              <FeedContent posts={postFollowingList} />
            ) : (
              <div className="loading-container">
                <Loading textClass="text-black" />
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {!isLoadingSuggested ? (
              <FeedContent posts={postSuggestedList} />
            ) : (
              <div className="loading-container">
                <Loading textClass="text-black" />
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
};
