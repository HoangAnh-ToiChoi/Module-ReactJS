import { Outlet } from "react-router";
import SidebarDefault from "./components/SidebarDefault";

function DefaultLayout() {
  return (
    // wrapper
    <div className="flex min-h-screen bg-[#101010] text-white">
      {/* sidebar */}
      <div>
        <SidebarDefault />
      </div>

      {/* content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
