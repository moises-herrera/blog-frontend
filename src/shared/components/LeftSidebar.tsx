import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from '@chakra-ui/react';
import { LeftSidebarLinks } from './LeftSidebarLinks';

export const LeftSidebar = () => {
  return (
    <Drawer
      placement="left"
      isOpen={true}
      onClose={() => {}}
      blockScrollOnMount={false}
      size="xs"
    >
      <DrawerContent backgroundColor="#2F2F2F" width="100%">
        <DrawerHeader textAlign="center" textColor="#FF5050" fontSize="48px">
          Blog.
        </DrawerHeader>

        <DrawerBody>
          <LeftSidebarLinks />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
