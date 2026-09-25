import { useState } from "react";
import { NavLink } from "react-router";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import AppLogo from "~/layouts/DefaultLayout/components/AppLogo";
import { MENU_BLOCK_1, MENU_BLOCK_2, MENU_BLOCK_3 } from "./SidebarConfig";

function SidebarMenu() {
  const [activeTab, setActive] = useState("for-you");
  const { t } = useTranslation();

  const classNameActive = (tabName) =>
    clsx(
      "flex h-11 w-full cursor-pointer items-center gap-3.5 rounded-2xl px-4 text-[15px] whitespace-nowrap transition-colors",
      {
        "bg-[#222222] font-semibold text-white": activeTab === tabName,
        "transition-colors hover:bg-[#1f1f1f]": activeTab !== tabName,
      },
    );

  const getPath = (id) => {
    return id === "for-you" ? "/" : `/${id}`;
  };

  const renderMenuItems = (item) => {
    const translationKey = `sidebar.${item.id.replace(/-/g, "_")}`;
    return (
      <NavLink
        key={item.id}
        to={getPath(item.id)}
        className={classNameActive(item.id)}
        onClick={() => setActive(item.id)}
      >
        {item.icon ? <item.icon className={item.iconSize} /> : null}
        <span>{t(translationKey, item.label)}</span>
      </NavLink>
    );
  };

  return (
    <nav className="flex flex-col">
      <AppLogo />

      <div className="flex flex-col gap-1">
        {MENU_BLOCK_1.map(renderMenuItems)}
      </div>

      <div className="mt-3 flex flex-col gap-1">
        {MENU_BLOCK_2.map(renderMenuItems)}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex h-8 items-center justify-between px-4 text-[13px] font-semibold text-[#777777]">
          <span>{t("sidebar.other_feeds")}</span>
          <button className="cursor-pointer transition-colors hover:text-[#999999]">
            {t("common.edit")}
          </button>
        </div>
        {MENU_BLOCK_3.map(renderMenuItems)}
      </div>
    </nav>
  );
}

export default SidebarMenu;
