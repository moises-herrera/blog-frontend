interface SidebarProps {
  align?: "left" | "right";

  children: React.ReactNode;
}

export const Sidebar = ({ align = "left", children }: SidebarProps) => {
  return (
    <aside
      className={`absolute w-[350px] min-h-screen h-full scrollable-div overflow-auto  bg-[#2F2F2F] px-6 ${
        align === "right" ? "right-0" : ""
      }`}
    >
      {children}
    </aside>
  );
};
