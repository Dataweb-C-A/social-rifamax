import { useDispatch, useSelector } from "react-redux";
import { setInfluencer } from "../store/reducers/influencerSlice";
import { RootState } from "../store";
import axios from "axios";

interface IResponse {
  id: number;
  name: string;
  dni: string;
  is_active: boolean;
  phone: string | null;
  influencer_id: number;
  content_code: string;
  role: 'Influencer' | 'Admin'
}

export function useInfluencer() {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.influencer);

  const influencer = selector.user;

  const search = (whenFinish?: () => void): Promise<IResponse | null> => {
    const influencer_code = selector.content_code

    return axios.get(`http://localhost:3000/social/influencers?content_code=${influencer_code}`)
      .then((res) => {
        dispatch(setInfluencer(res.data))
        whenFinish && whenFinish()
        return res.data
      })
      .catch(() => {
        whenFinish && whenFinish()
        return null
      })
  }

  return { influencer, search };
}
