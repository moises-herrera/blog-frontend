import { Loading } from ".";

interface ListContainerProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingHeight?: string;
}

export const ListContainer = ({
  children,
  isLoading,
  loadingHeight = "120px",
}: ListContainerProps) => {
  return (
    <>
      {children}
      {isLoading && (
        <div className={`mt-4 h-[${loadingHeight}]`}>
          <Loading displayText={false} size="50px" />
        </div>
      )}
    </>
  );
};
