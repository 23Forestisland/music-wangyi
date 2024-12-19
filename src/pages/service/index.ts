interface requestParams{
    url: string
}

export const bannerRequest = <T>({ url }: requestParams) => {
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

// 获取甄选歌单接口
export const getSongListApi = () => {
    const url = 'https://zyxcl.xyz/music/api/personalized';
    return bannerRequest<Res<'result', SongListItem>>({ url });
}