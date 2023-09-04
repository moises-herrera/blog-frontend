import { Avatar, Heading, Text } from '@chakra-ui/react';

export const ProfileHeader = () => {
  return (
    <header className="fixed z-40 top-0 profile-header bg-primary-500 text-white flex h-[115px] justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <Avatar size="xl" name="John Doe" src="" />
        <div className="flex flex-col">
          <Heading size="lg">John Doe</Heading>
          <Text>@john_doe</Text>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <i className="fa-solid fa-user-check text-3xl"></i>
        <span>Seguidores</span>
        <span>100</span>
      </div>
    </header>
  );
};
