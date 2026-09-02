import SidebarMenu from "./SidebarMenu";

function SidebarDefault() {
  return (
    <aside className="flex h-screen w-[280px] flex-col justify-between overflow-y-auto border-r border-[#222222] bg-[#101010] py-3 pr-3 pl-[20px] text-white select-none">
      <SidebarMenu />
    </aside>
  );
}

export default SidebarDefault;
