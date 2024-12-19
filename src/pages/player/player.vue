<script lang='ts' setup >
import { ref, reactive,watch,onMounted, nextTick,watchEffect} from 'vue'
import { onLoad } from "@dcloudio/uni-app";
import {songApi,albumApi} from '../serviceSearch'
import type {SongInfo} from '../serviceSearch'

interface query{
    id:number
    albumId:number
    name:string
    art:string
}

const  query=ref<query>()
const pic=ref<string>()
const songInfo=ref<SongInfo>()
const innerAudioContext = uni.createInnerAudioContext();
const play=ref<boolean>(false)
const scroll=ref<boolean>(false)
const curTm=ref<string>()
const dotleft=ref<string>()
const rot=ref<number>(0)
const rot2=ref<number>()
let timer:any
let tm:number


innerAudioContext.autoplay = true;
onLoad((option)=>{
    console.log(option!.id)
    query.value={
        id:option!.id,
        albumId:option!.albumId,
        name:option!.name,
        art:option!.art,
    }
})
const getSong= async ()=>{
    try{
        const res=await songApi(query.value?.id as number)
        
        songInfo.value={
            id:res.data[0].id,
            url:res.data[0].url,
            time:'0'
        }
        // console.log(res)
    }catch(e){
        console.log(e)
    }
}


const getalbum= async ()=>{
    try{
        const res=await albumApi(query.value?.albumId as number)
        // console.log(res)
        pic.value=res.album.blurPicUrl
    }catch(e){
        console.log(e)
    }
}

innerAudioContext.onPause(() => {
    clearInterval(timer)
})

innerAudioContext.onPlay(() => {
    
        timer=setInterval(()=>{
            let curtm=Math.floor(innerAudioContext.currentTime)
            // console.log(curtm)
            let cursec= curtm%60<10?'0'+ curtm%60: curtm%60
            curTm.value=Math.floor(curtm/60)+':'+cursec
            let a =Math.floor(curtm/(tm-1)*100) + '%'
            dotleft.value=a
            if(!scroll.value){
                rot.value!+=30
                // console.log(rot.value)
            }
            // console.log(dotleft.value)
        },500)

})

innerAudioContext.onEnded(()=>{
    if(timer){
        clearInterval(timer)
    }
    scroll.value=false
    play.value=false
})


innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
})

const openplay=()=>{
    
    if(play.value===true){
        innerAudioContext.play()
        scroll.value=false
        play.value=false

    }else{
        innerAudioContext.pause()
        scroll.value=true
        play.value=true
        // console.log('assda')
    }
    
}

innerAudioContext.onCanplay(()=>{
    // console.log(innerAudioContext.duration)
    tm=parseInt(innerAudioContext.duration)
    let sec=tm%60<10?'0'+tm%60:tm%60
    songInfo.value!.time=Math.floor(tm/60) + ':'+sec
    
})
// onMounted(()=>{
//     console.log(songInfo.value)

// })
watch(scroll,()=>{
    if(scroll.value){
        rot2.value=-30
    }else{
        rot2.value=0
    }
})

watch(()=>query.value?.id,()=>{
    getSong()
    getalbum()
})

watch(()=>songInfo.value,()=>{
    innerAudioContext.src = songInfo.value!.url
},{once:true})

</script>

<template>
    <view class="player">
        <image :src="pic"/>
        <view class="subject">
            <view class="playHead">
                <view class="iconfont icon-xiajiantou"></view>
                <view class="title">热门推荐</view>
                <view class="share iconfont icon-fenxiang"></view>
            </view>
            <view class="record ">
                <view class="circle" :style="{transform:`rotate(${rot}deg)`}">
                    <view class="light">
                        <view class="center">
                            <image :src="pic" mode="widthFix" />
                        </view>
                    </view>
                    
                </view>
                <view class="rod" :style="{transform:`translate(-50%) rotate(${rot2}deg)`}">
                    <image src="../../static/playpic4.png"></image>
                </view>
            </view>
            <view class="player-item">
                <view class="item-head">
                    <view class="text-info">
                        <view>{{query?.name}}</view>
                        <view>{{ query?.art }}<text class="iconfont icon-youjiantou"></text></view>
                    </view>
                    <view class="like iconfont icon-aixin_line"></view>
                    <view class="comments iconfont icon-pinglun-"></view>
                </view>
                <view class="pl-progress">
                    <view class="line">
                        <view class="dot" :style="{left:dotleft}"></view>
                    </view>
                    <view class="prsinfo">
                        <view> {{curTm}}</view>
                        <view>极高</view>
                        <view> {{songInfo?.time}}</view>
                    </view>
                    <view class="control">
                        <view class="iconfont icon-shunxubofang"></view>
                        <view class="cen-ctrl">
                            <view class="iconfont icon-shangyishou1"></view>
                            <view class="play-stop iconfont " :class="[scroll?'icon-bofang':'icon-zanting1']" @click="openplay"></view>
                            <view class="iconfont icon-xiayishou"></view>
                        </view>
                        <view class="iconfont icon-bofangliebiao1"></view>
                    </view>
                    <view class="share">
                        <view class="iconfont icon-Pickup-3"></view>
                        <view class="iconfont icon-xiazai"></view>
                        <view class="iconfont icon-gengduo"></view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang='scss' scoped>
.rod{
    transform-origin: 50% 0;
}
page{
    width: 100%;
    height: 100%;
    color: #ccc;
}
.player{
    width: 100%;
    height: 100%;
    position: relative;
    background: rgb(0 , 0, 0);
    >image{
        display: block;
        width: 100%;
        height: 100%;
        filter: blur(40px);
    }
}
.subject{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    background: rgba(0,0,0,0.7);
}

.share{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.control{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0;
    >.iconfont{
        font-size: 20px;
    }
    .cen-ctrl{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 0 10px;
        .iconfont{
            margin: 0 30px;
            font-size: 25px;
        }
        
    }
}
.play-stop{
        font-size: 30px!important;
}
.pl-progress{
    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding: 5px;

    .line{
        width: 95%;
        height: 2px;
        background: #ccc;
        position: relative;
        padding: 0 4px;
        margin: 0 auto;
        .dot{
            position: absolute;
            left: 0;
            top: -4px;
            width:8px;
            height:8px;
            background: #eee;
            border-radius: 50%;
            transform: translate(-50%);
        }
        
        }
    .prsinfo{
        width: 100%;
        height: 15px;
        line-height: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        margin-top: 5px;
    }

}

    .playHead{
        width: 100%;
        display: flex;
        align-items: center;
        line-height: 30px;
        padding: 0 15px;
        .iconfont{
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
        }
        .title{
            flex: 1;
            text-align: center;
        }
    }


    .record{
        width: 100%;
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .circle{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60%;
            aspect-ratio:1 / 1;
            background: url(../../static/playpic2.png) center center / cover;
            border-radius: 50%;
            transform: rotate(30deg);
            transition: all 0.5s linear;
            .light{
                width: 100%;
                aspect-ratio:1 / 1;
                background: url(../../static/playpic1.png) center center / cover;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                .center{
                    width: 63%;
                    aspect-ratio:1 / 1;
                    background: red;
                    border-radius: 50%;
                    overflow: hidden;
                    image{
                        width: 100%;
                    }
                    }
            }
        }
    }
    .rod{
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translate(-50%);
        image{
            width: 80px;
            height: 80px;
        }
    }
    .player-item{
        width: 100%;
        padding: 10px 0 0;
    }
    .item-head{
        display: flex;
        align-items: center;
        height: 60px;
        .text-info{
            flex:1;
        }
        >.iconfont{
            width: 30px;
            height: 30px;
            font-size: 25px;
            margin-left: 30px;
        }
    }

</style>