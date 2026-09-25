import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "~/components/ui/button";
import { useSelectorUser } from "~/features/Auth/Hook";
import LanguageSwitcher from "~/components/LanguageSwitcher";

function FeedHeader() {
  const currentUser = useSelectorUser();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-end border-b border-[#222222] bg-[#101010] px-8">
      <NavLink
        to="/"
        className="absolute left-1/2 flex h-10 w-[120px] -translate-x-1/2 items-center justify-center text-[16px] font-bold text-white transition-transform hover:scale-105 shrink-0"
      >
        {t("common.home")}
      </NavLink>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        {!currentUser && (
          <div className="flex items-center gap-3 text-[14px]">
            <NavLink
              to="/login"
              className={buttonVariants({
                variant: "login",
                size: "lg",
                className:
                  "h-10 w-[110px] justify-center px-0 text-center font-semibold shrink-0",
              })}
            >
              {t("common.login")}
            </NavLink>
            <NavLink
              to="/register"
              className={buttonVariants({
                variant: "register",
                size: "lg",
                className:
                  "h-10 w-[105px] justify-center px-0 text-center font-semibold shrink-0",
              })}
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
