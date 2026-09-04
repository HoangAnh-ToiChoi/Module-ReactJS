import { NavLink } from "react-router";

import { buttonVariants } from "~/components/ui/button";

function FeedHeader() {
  return (
    <header className="relative flex items-center justify-end border-b border-[#222222] px-4 py-3">
      <NavLink
        to="/"
        className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-white transition-transform hover:scale-110"
      >
        Trang Chủ
      </NavLink>

      <div className="flex items-center gap-3 text-[14px]">
        <NavLink
          to="/login"
          className={buttonVariants({ variant: "login", size: "lg" })}
        >
          login
        </NavLink>
        <NavLink
          to="/register"
          className={buttonVariants({ variant: "register", size: "lg" })}
        >
          register
        </NavLink>
      </div>
    </header>
  );
}

export default FeedHeader;
