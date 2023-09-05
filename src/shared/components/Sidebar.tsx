interface SidebarProps {
  align?: "left" | "right";

  cssClass?: string;

  children: React.ReactNode;
}

export const Sidebar = ({
  align = "left",
  cssClass = "",
  children,
}: SidebarProps) => {
  return (
    <aside
      className={`fixed z-50 w-[350px] h-screen bg-[#2F2F2F] px-6 ${
        align === "right" ? "right-0" : ""
      } ${cssClass}`}
    >
      {children}
    </aside>
  );
};
