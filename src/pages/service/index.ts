import request from "./request";
import type{followRes,noteRecommendRes} from './type'



export const getRecommendApi = () => {
    return request<noteRecommendRes>({
      url: "/topic/detail/event/hot?actid=111551188",
    });
  };

  export const getFollowApi = () => {
    return request<followRes>({
      url: "/user/followeds?uid=416608258",
    });
  };