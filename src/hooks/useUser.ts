import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser, setToken } from "../store/reducers/userSlice";
import { RootState } from "../store";
import { IUser } from "../interfaces";

export function useUser() {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.user);

  const user = selector.user;

  const clear = () => {
    dispatch(clearUser());
  };

  const update = (user: IUser, token?: string) => {
    dispatch(setUser(user));
    if (token) dispatch(setToken(token));
  };

  const updateNoToken = (user: IUser) => {
    dispatch(setUser(user));
  };

  return { user, clear, update, updateNoToken };
}
