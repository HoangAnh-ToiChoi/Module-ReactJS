import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "./Selector";
import { useEffect } from "react";
import { infoUser } from "~/service/AuthService/AuthService";

export function useSelectorUser() {
  return useSelector(userSelector);
}

export function useCurrentUser() {
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(infoUser());
  }, [dispacth]);
}
