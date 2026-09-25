import { Outlet } from "react-router";
import LanguageSwitcher from "~/components/LanguageSwitcher";

function AuthLayout() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md">
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
