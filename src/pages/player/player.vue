<script lang='ts' setup >
import { ref, reactive,watch,computed, nextTick, watchEffect, onMounted} from 'vue'
import { onLoad ,onUnload} from "@dcloudio/uni-app";
import {songApi,albumApi} from '../serviceSearch'
import type {SongInfo} from '../serviceSearch'
import { useStore } from '@/store'; 

interface query{
    id:number
    albumId:number
    name:string
    art:string
}


const store=useStore()
const  query=ref<query>()
const pic=ref<string>()
const songInfo=ref<SongInfo[]>([])






const rot2=ref<number>()
const songnumb=ref<number>(0)
let src:string=''






onLoad((option)=>{
    // console.log(option!.id)
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
        
        songInfo.value=res.data

        store.memo=songInfo.value[songnumb.value].url
        // store.memo=innerAudioContext.src
        
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





const openplay=()=>{
    
    if(store.innerAudioContext){
        if(store.play===true){
        store.innerAudioContext.play()
        store.scroll=false
        store.play=false

    }else{
        store.innerAudioContext.pause()
        store.scroll=true
        store.play=true
        // console.log('assda')
    }
    }
    
}


const priveSong=()=>{
    if(songnumb.value!==0){
        songnumb.value-=1
    }
}

const nextSong=()=>{
    if(songnumb.value<songInfo.value.length){
        songnumb.value+=1
    }
}

const playSong=computed(()=>{
    return  songInfo.value[songnumb.value]
})
    

watch(()=>store.scroll,()=>{
    if(store.scroll){
        rot2.value=-30
    }else{
        rot2.value=0
    }
})

watch(()=>query.value?.id,()=>{
    getSong()
    getalbum()

    

})



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
                <view class="circle" :style="{transform:`rotate(${store.rot}deg)`}">
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
                        <view class="dot" :style="{left:store.dotleft}"></view>
                    </view>
                    <view class="prsinfo">
                        <view> {{store.curTm}}</view>
                        <view>极高</view>
                        <view> {{store.totalTime}}</view>
                    </view>
                    <view class="control">
                        <view class="iconfont icon-shunxubofang"></view>
                        <view class="cen-ctrl">
                            <view class="iconfont icon-shangyishou1" @click="priveSong"></view>
                            <view class="play-stop iconfont " :class="[store.scroll?'icon-bofang':'icon-zanting1']" @click="openplay"></view>
                            <view class="iconfont icon-xiayishou" @click="nextSong"></view>
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