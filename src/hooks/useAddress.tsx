import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../store/reducers/addressSlice";
import { RootState } from "@/store";

interface IAddress {
  data: {
    address: string;
    province: string;
    country: string;
    zip_code: string;
  }
}

export function useAddress() {
  const dispatch = useDispatch();

  const changeAddress = ({ data }: IAddress) => {
    dispatch(setAddress(data));
  };

  const address = useSelector((state: RootState) => state.address);

  return { address, changeAddress };
}
