import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { APP_NAME } from "src/constants";
import { FollowingTab, SuggestedTab } from "src/feed/components";

export const Feed = () => {
  useEffect(() => {
    document.title = `${APP_NAME}`;
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
            <FollowingTab />
          </TabPanel>
          <TabPanel>
            <SuggestedTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
};
