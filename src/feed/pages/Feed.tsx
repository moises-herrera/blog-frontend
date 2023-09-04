import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FeedContent } from 'src/feed/components';
import { posts } from 'src/mocks';

export const Feed = () => {
  return (
    <section className="section-content">
      <Tabs colorScheme="accent" align="center">
        <TabList width="230px">
          <Tab fontSize={18}>Seguidos</Tab>
          <Tab fontSize={18}>Sugeridos</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FeedContent posts={posts} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
};
