interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return <div className="pl-[350px] h-full">{children}</div>;
};
