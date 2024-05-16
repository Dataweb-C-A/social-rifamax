import { useSelector } from "react-redux";
import { RootState } from "../store";

export function useUser() {
  const selector = useSelector((state: RootState) => state.user);

  const user = selector.user

  return { user };
}
