import { RootState } from "@/store";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function useAuth() {
  const user = useSelector((state: RootState) => state.user);
}

export default useAuth;
