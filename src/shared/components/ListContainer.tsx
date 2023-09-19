import { Loading } from ".";

interface ListContainerProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const ListContainer = ({ children, isLoading }: ListContainerProps) => {
  return (
    <>
      {children}
      {isLoading && (
        <div className="mt-4 h-[120px]">
          <Loading displayText={false} size="50px" />
        </div>
      )}
    </>
  );
};
