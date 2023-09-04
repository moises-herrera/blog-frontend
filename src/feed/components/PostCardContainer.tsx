import { Card } from '@chakra-ui/react';

interface PostCardContainerProps {
  children: React.ReactNode;
}

export const PostCardContainer = ({ children }: PostCardContainerProps) => {
  return (
    <Card maxWidth="528px" backgroundColor="#D3D3D3" borderRadius={20}>
      {children}
    </Card>
  );
};
