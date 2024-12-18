interface  RequestParams {
    url: string
    data?: object
}

export const request = <T>({url, data} : RequestParams) => {
    return new Promise<T>((resolve, reject) => {
        uni.request({
            url,
            data,
            success: (res) =>{
                resolve(res.data as T)
            },
            fail: reject
        })
    })
}

// 博客列表
export interface PodcastItem{
    id: number
    name: string
    picUrl: string
    playCount: number
    copywriter: string
}
export interface PodcastRes {
    code: number
    recommend: PodcastItem[]
}
export const getPodcastApi = () =>{
    return request<PodcastRes>({url:'https://zyxcl.xyz/music/api/recommend/resource'})
}

// 翻唱列表
export interface VersionRes {
    code: number
    djRadios: PodcastItem[]
}
export const getVersionApi = () =>{
    return request<VersionRes>({url:'https://zyxcl.xyz/music/api/dj/radio/hot',data:{
        cateId:2001,
        limit: 6
    }})
}

// 私人播客
export const getPrivateApi = () =>{
    return request<VersionRes>({url:'https://zyxcl.xyz/music/api/dj/recommend'})
}