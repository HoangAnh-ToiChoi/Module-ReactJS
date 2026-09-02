import { BsThreads } from "react-icons/bs";
import { NavLink } from "react-router";

function AppLogo() {
  return (
    <div className="mb-3 flex items-center justify-between px-3 py-2">
      <NavLink
        to="/"
        className="inline-flex cursor-pointer items-center gap-2 transition-transform duration-200 hover:scale-105"
      >
        <BsThreads className="text-[28px] text-white" />
        <span className="text-[28px] font-bold tracking-tight text-white">
          threads
        </span>
      </NavLink>

      <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-[#1f1f1f]">
        <div className="flex flex-col gap-[5px]">
          <span className="h-[2px] w-5 rounded-full bg-white"></span>
          <span className="h-[2px] w-5 rounded-full bg-white"></span>
        </div>
      </button>
    </div>
  );
}

export default AppLogo;
