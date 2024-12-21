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
    subCount?: number
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

// 歌单详情
export interface DetailItem{
    id: number
    name: string
    coverImgUrl: string
    score: string
    tags: string[]
    subscribers: [
        {
            nickname: string
        }
    ]
    playCount: number
    tracks:{
        id: number
        name: string
        al:{
            id: number
            picUrl: string
            pic: number
        }
        ar:{
            id: number
            name: string
        }
    }
}
export interface DetailRes {
    code: number
    playlist: DetailItem
}
export const getDetailApi = (id:number) =>{
    return request<DetailRes>({url:`https://zyxcl.xyz/music/api/playlist/detail`,data:{
        id
    }})
}

//每日推荐
export const getDayApi = () =>{
    return request<PodcastRes>({url:'https://zyxcl.xyz/music/api/recommend/resource'})
}

// 歌单评论
export interface ReviewItem{
    commentId: number
    user: {
        nickname: string
        avatarUrl: string
    }
    timeStr: string
    content: string
}
export interface ReviewRes {
    code: number
    comments: ReviewItem[]
}
export const getReviewApi = (id:number) =>{
    return request<ReviewRes>({url:`https://zyxcl.xyz/music/api/comment/playlist`,data:{
        id
    }})
}

// vip成长值
interface GrowupItem{
    accountPageIconImgUrl: string
    backgroundImageUrl: string
}
interface GrowupRes{
    code: number
    data: {
        levelCard: GrowupItem
        taskList:[
            {
                seqName: string
                taskItems: [
                    {
                        action: string
                        iconUrl: string
                    }
                ]
            }

        ]
    }
}

export const getGrowupApi = () =>{
    return request<GrowupRes>({url:'https://zyxcl.xyz/music/api/vip/growthpoint'})
}
export const getQuestApi = () =>{
    return request<GrowupRes>({url:'https://zyxcl.xyz/music/api/vip/tasks'})
}
// 独家放送
export const getExclusiveApi = () =>{
    return request<GrowupRes>({url:'https://zyxcl.xyz/music/api/yunbei/rcmd/song?id=65528'})
}

// 热门榜单
// export const getHotApi = () =>{
//     return request({url:'https://zyxcl.xyz/music/api/homepage/block/page'})
// }
// 歌曲类型标签
// /playlist/highquality/tags

// 发送验证码
export const getCodeApi = (phone:string) =>{
    return request({url:'https://zyxcl.xyz/music/api/captcha/sent',data:{
        phone
    }})
}
// 登录验证码
interface VerifyRes{
    code: number
    data: boolean
    message: string
}
export const getVerifyApi = (phone:string, captcha: string) =>{
    return request<VerifyRes>({url:'https://zyxcl.xyz/music/api/captcha/verify',data:{
        phone,
        captcha
    }})
}