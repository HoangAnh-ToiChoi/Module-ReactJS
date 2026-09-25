import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "~/components/ui/button";
import { useSelectorUser } from "~/features/Auth/Hook";
import LanguageSwitcher from "~/components/LanguageSwitcher";

function FeedHeader() {
  const currentUser = useSelectorUser();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-end border-b border-[#222222] bg-[#101010] px-4 py-8">
      <NavLink
        to="/"
        className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-white transition-transform hover:scale-110"
      >
        {t("common.home")}
      </NavLink>

      <div className="mr-8 flex items-center gap-4">
        <LanguageSwitcher />

        {!currentUser && (
          <div className="flex items-center gap-5 text-[14px]">
            <NavLink
              to="/login"
              className={buttonVariants({
                variant: "login",
                size: "lg",
                className: "px-6",
              })}
            >
              {t("common.login")}
            </NavLink>
            <NavLink
              to="/register"
              className={buttonVariants({ variant: "register", size: "lg" })}
            >
              {t("common.register")}
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default FeedHeader;
