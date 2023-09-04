import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { FeedContent } from 'src/feed/components';
import { posts } from 'src/mocks';
import { toggleLeftSidebar } from 'src/store/ui';

export const Feed = () => {
  const { isLeftSidebarOpen } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();

  const onToggleLeftSidebar = () => {
    dispatch(toggleLeftSidebar());
  };

  return (
    <section className="section-content">
      <button
        type="button"
        onClick={onToggleLeftSidebar}
        className={`lg:hidden absolute z-50 right-5 ${
          isLeftSidebarOpen ? 'text-white' : ''
        }`}
      >
        <i className="fa-solid fa-bars text-3xl"></i>
      </button>

      <Tabs colorScheme="accent" align="center" paddingTop={10}>
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
