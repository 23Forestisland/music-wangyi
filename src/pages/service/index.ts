interface requestParams{
    url: string
}

export const request = <T>({ url }: requestParams) => {
    return new Promise<T>((resolve, reject) => {
        uni.request({
            url,
            success: (res) => {
                resolve(res.data as T)
            },
            fail: reject
        });
    })
}



export interface BannerItem{
    imageUrl: string,
    targetId: number
}
export interface BannerRes{
    code: number,
    banners: BannerItem[];
}

// 获取banner图列表接口
export const getBannerApi = () => {
    const url = 'https://zyxcl.xyz/music/api/banner';
    return request<BannerRes>({ url });
}

// 获取甄选歌单接口
// export const getZhenxuanMusicListApi = () => {
//     const url = 'https://zyxcl.xyz/music/api/personalized';

// }
import request1 from "./request";
import type{followRes,noteRecommendRes} from './type'



export const getRecommendApi = () => {
    return request1<noteRecommendRes>({
      url: "/topic/detail/event/hot?actid=111551188",
    });
  };

  export const getFollowApi = () => {
    return request1<followRes>({
      url: "/user/followeds?uid=416608258",
    });
  };
