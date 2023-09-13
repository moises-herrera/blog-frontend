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
      className={`fixed w-[350px] h-screen bg-primary-500 px-6 ${
        align === "right" ? "right-0" : ""
      } ${cssClass}`}
    >
      {children}
    </aside>
  );
};
