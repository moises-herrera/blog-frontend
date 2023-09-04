import { Avatar, Heading, Text } from '@chakra-ui/react';

export const ProfileHeader = () => {
  return (
    <header className="profile-header w-full lg:profile-header-desktop">
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
