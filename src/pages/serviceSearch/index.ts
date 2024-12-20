
interface RequestParams {
    url: string
    data?: object
}

export const request=<T>({url,data}:RequestParams)=>{
    return new Promise<T>((resolve,reject)=>{
        uni.request({
            url,
            data,
            success: (res) => {
                // console.log(res.data);
                resolve(res.data as T)
            },
            fail:reject,
        })
    })
}

// 调取推荐歌曲接口

export interface Dailys{
    name:string
    id:number
}
export interface RecmdsongRes{
    code:number
    data:{
        dailySongs:Dailys[]
    }
}

export interface HotlistRes{
    code:number
    list:[]
}

export interface DetailList{
    code:number
    playlist:{
        tracks:Detail[]
    }
}

export interface Detail{
    name:string
}



export const guessSongsApi=()=>{
    return request<RecmdsongRes>({ url: 'https://zyxcl.xyz/music/api/recommend/songs'})
    
}


// 调取榜单接口
export const hotSearchApi=()=>{
    return request<HotlistRes>({ url: 'https://zyxcl.xyz/music/api/toplist' })
    
}



// 调取歌单详情
export const detailListApi=(id:number)=>{
    return request<DetailList>({ url: 'https://zyxcl.xyz/music/api/playlist/detail',data:{id}})
    
}


export interface SearchResultItem {
    id: number
    name: string
    album:{
        name:string
        id:number
    }
    artists: {
    id: number
    name: string
    img1v1Url: string
    }[]
}


export interface SearchRes{
        code: number
        result: {
        hasMore: boolean
        songs: SearchResultItem[]
    }
}


export const searchApi = (keywords: string) => {
    return request<SearchRes>({
        url: 'https://zyxcl.xyz/music/api/search',
        data: {
            keywords
        }
    })
}

export interface SearchSuggestItem {
    keyword: string
}

export interface SearchSuggestRes {
    code: number
    result: {
        allMatch: SearchSuggestItem[]
    }
}


export const suggestApi= (keywords: string) => {
    return request<SearchSuggestRes>({
        url: 'https://zyxcl.xyz/music/api/search/suggest',
        data: {
            keywords,
            type:'mobile'
        },
        
    })
}

export interface SongInfo{
    id:number
    url:string
    time?:string
}

export interface songPlayeRes {
    code: number
    data: SongInfo[]
}
// 调取歌曲接口
export const songApi= (id:number) => {
    return request<songPlayeRes>({
        url: 'https://zyxcl.xyz/music/api/song/url',
        data: {
            id
        },
    })
}


// export interface AlbumInfo{
//     V:number
//     name:string
// }

export interface AlbumRes {
    resourceState: Boolean
    album:{
        blurPicUrl:string
    }
}


// 获取专辑
export const albumApi= (id:number) => {
    return request<AlbumRes>({
        url: 'https://zyxcl.xyz/music/api/album',
        data: {
            id
        },
    })
}