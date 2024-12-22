const baseUrl = 'https://zyxcl.xyz/music/api';
interface requestParams{
    url: string,
    data?: object
}

// 封装请求接口
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

export interface MusicChartDetailItem{
    id: number
}
export interface Res<K, V, O>{
    code: number,
    K: V[],
    O?: object
}

export interface BlocksItem{
    blocks: []
}

export interface HomePageRes{
    code: number,
    data: BlocksItem
}


// 获取banner图列表接口
export const getBannerApi = () => {
    const url = `${baseUrl}/banner`;
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
    const url = `${baseUrl}/personalized`;
    const data = {
        limit: 6
    };
    return bannerRequest<Res<'result', SongListItem>>({ url, data });
}

// 获取首页发现-新歌新碟接口
export const getHomePageApi = () => {
    const url = `${baseUrl}/homepage/block/page`;
    return bannerRequest<HomePageRes>({ url });
};

// 获取排行榜接口
export const getMusicChartApi = () => {
    const url = `${baseUrl}/toplist/detail`;
    return bannerRequest({ url });
};

// 获取排行榜详情接口
export const getMusicChartDetailApi = ({ id }) => {
    const url = `${baseUrl}/playlist/detail`;
    return bannerRequest<Res<'privileges', MusicChartDetailItem, 'playlist'>>({ url, data: { id } });
};