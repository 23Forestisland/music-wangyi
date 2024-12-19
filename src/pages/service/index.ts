interface requestParams{
    url: string,
    data?: object
}

export const bannerRequest = <T>({ url, data }: requestParams) => {
    return new Promise<T>((resolve, reject) => {
        uni.request({
            url,
            data,
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
export interface SongListItem{
    id: number,
    name: string,
    picUrl: string,
    playCount: number
}
export interface Res<K, V>{
    code: number,
    K: V[]
}


// 获取banner图列表接口
export const getBannerApi = () => {
    const url = 'https://zyxcl.xyz/music/api/banner';
    return bannerRequest<Res<'banners', BannerItem>>({ url });
}

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

// 获取甄选歌单接口
export const getSongListApi = () => {
    const url = 'https://zyxcl.xyz/music/api/personalized';
    const data = {
        limit: 6
    };
    return bannerRequest<Res<'result', SongListItem>>({ url, data });
}
