import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
