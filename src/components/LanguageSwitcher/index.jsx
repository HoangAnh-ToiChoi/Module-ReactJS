import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("vi") ? "vi" : "en";

  const toggleLanguage = () => {
    const nextLang = currentLang === "vi" ? "en" : "vi";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`flex cursor-pointer items-center gap-1.5 rounded-full border border-[#333333] bg-[#1a1a1a] px-3 py-1.5 text-[12px] font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white ${className}`}
      title={currentLang === "vi" ? "Chuyển sang English" : "Switch to Tiếng Việt"}
    >
      <Globe className="h-3.5 w-3.5" />
      <span className="uppercase font-semibold">{currentLang}</span>
    </button>
  );
}

export default LanguageSwitcher;
