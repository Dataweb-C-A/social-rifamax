import { useDispatch, useSelector } from "react-redux";
import { setClient } from "../store/reducers/clientSlice";
import { RootState } from "@/store";

interface IClient {
  data: {
    id: number;
    name: string;
    phone: string;
    email: string;
  }
}

export function useClient() {
  const dispatch = useDispatch();

  const changeClient = ({ data }: IClient) => {
    dispatch(setClient(data));
  };

  const client = useSelector((state: RootState) => state.client);

  return { client, changeClient };
}
