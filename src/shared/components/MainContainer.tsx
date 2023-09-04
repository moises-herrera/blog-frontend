interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return <div className="lg:pl-[350px] h-full w-full">{children}</div>;
};
