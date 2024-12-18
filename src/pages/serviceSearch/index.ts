
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
