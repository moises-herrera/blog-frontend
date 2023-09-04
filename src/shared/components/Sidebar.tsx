interface SidebarProps {
  align?: 'left' | 'right';

  children: React.ReactNode;
}

export const Sidebar = ({ align = 'left', children }: SidebarProps) => {
  return (
    <aside
      className={`fixed w-[350px] h-screen bg-[#2F2F2F] px-6 ${
        align === 'right' ? 'right-0' : ''
      }`}
    >
      {children}
    </aside>
  );
};
