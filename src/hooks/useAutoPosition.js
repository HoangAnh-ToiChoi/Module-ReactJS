import { useLayoutEffect, useState } from "react";

function useAutoPosition(isOpen, triggerRef, menuHeight = 280) {
  const [placeMent, setPlaceMent] = useState("botttom");

  useLayoutEffect(() => {
    if (!triggerRef.current && isOpen) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    spaceBelow < menuHeight ? setPlaceMent("top") : setPlaceMent("bottom");
  }, [isOpen, menuHeight, triggerRef]);
  return placeMent;
}
export default useAutoPosition;
