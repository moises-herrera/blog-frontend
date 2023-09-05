import { Avatar, Button, Heading, Text } from '@chakra-ui/react';
import './ProfileHeader.css';

export const ProfileHeader = () => {
  return (
    <header className="profile-header">
      <div className="flex items-center gap-4">
        <Avatar size="xl" name="John Doe" src="" />
        <div className="flex flex-col">
          <Heading size="lg">John Doe</Heading>
          <Text>@john_doe</Text>
        </div>
        <Button
          variant="brand"
          fontSize="12px"
          fontWeight="500"
          width="64px"
          height="26px"
          borderRadius={10}
          marginLeft={5}
        >
          Seguir
        </Button>
      </div>
      <div className="flex flex-col items-center pl-2">
        <i className="fa-solid fa-user-check text-3xl"></i>
        <span>Seguidores</span>
        <span>100</span>
      </div>
    </header>
  );
};
