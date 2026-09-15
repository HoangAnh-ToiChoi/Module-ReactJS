import { useSelector } from "react-redux";
import { postsSelector } from "./Selector";

export function useSelectorPost() {
  return useSelector(postsSelector);
}
