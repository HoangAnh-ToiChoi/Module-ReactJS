import { Outlet } from "react-router";

function EmbedLayout() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#101010] p-2 text-white sm:p-4">
      <main className="w-full max-w-[560px]">
        <Outlet />
      </main>
    </div>
  );
}

export default EmbedLayout;

