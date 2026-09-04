import { Outlet } from "react-router";
import SidebarDefault from "./components/SidebarDefault";
import FeedHeader from "./components/FeedHeader";

function DefaultLayout() {
  return (
    <div className="flex min-h-screen bg-[#101010] text-white">
      <SidebarDefault />

      <div className="flex-1 p-6">
        <FeedHeader />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
