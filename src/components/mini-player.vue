<script setup lang="ts">
import { ref, reactive,watch,computed, nextTick, watchEffect, onMounted} from 'vue'
import { onLoad ,onUnload} from "@dcloudio/uni-app";
import {songApi,albumApi} from '../pages/serviceSearch'
import type {SongInfo} from '../pages/serviceSearch'
import { useStore } from '../store/index'; 
import { useList } from '../store/playlist'; 

interface query{
    id:string
    albumId:number
    name:string
    art:string
}
interface play{
    pic:string
    name:string
    art:string
}

const store=useStore()
const  query=ref<query>()
const pic=ref<string>()
const songInfo=ref<SongInfo[]>([])
const list=useList()
const playA=ref({
    pic:'',
    name:'',
    art:''
})






const rot2=ref<number>()
const songnumb=ref<number>(0)
let src:string=''






onLoad((option)=>{
    // console.log(option!.id)
    query.value={
        id:option!.id,
        albumId:option!.albumId ,
        name:option!.name ,
        art:option!.art ,
    }

})
const getSong= async ()=>{
    try{
        const res=await songApi(query.value?.id as string)
        
        songInfo.value=res.data
        console.log(songInfo.value)
        // store.memo=songInfo.value[songnumb.value].url
        // store.memo=innerAudioContext.src
        
    }catch(e){
        console.log(e)
    }
}


const getalbum= async ()=>{
    try{
        if(!isNaN(query.value!.albumId)){
            const res=await albumApi(query.value?.albumId as number)
            // console.log(res)
            pic.value=res.album.blurPicUrl
        }
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
console.log(list.aslist[store.songnumb].name)
console.log(store.songnumb)

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

watch([()=>store.songnumb,songInfo],()=>{
    if(songInfo.value && store.songnumb!<songInfo.value.length){
        store.memo=songInfo.value[store.songnumb!].url
    }
})

watch([pic,()=>store.songnumb,()=>list.aslist],()=>{
        playA.value.pic=pic.value || list.aslist?.[store.songnumb].al.picUrl||'',
        playA.value.name=query.value?.name ||  list.aslist?.[store.songnumb!].name,
        playA.value.art=query.value?.art || list.aslist?.[store.songnumb!].ar.map(it=>{return it.name}).join('/')

    console.log(playA.value.pic)

},{immediate:true})


</script>

<template>
    <view class="nimi-player">
        <view class="pic">
            <image  class="tpic" :src="playA?.pic" mode="widthFix"  />
        </view>
        <view class="info">
            <view class="songname">{{ playA?.name }}</view>
            <view class="zuozhe">{{ playA?.art }}</view>
        </view>
        <view class="ico">
            <view class="iconfont" :class="[store.scroll?'icon-bofang':'icon-zanting1']" @click="openplay"></view>
            <view class="iconfont icon-bofangliebiao"></view>
        </view>
    </view>
</template>

<style lang='scss' scoped>
.nimi-player{
    width: 100%;
    height: 80px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    .info{
        flex:1;
    }
    .ico{
        display: flex;
        align-items: center;
        .iconfont{
            margin-left: 20px;
        }
    }
}
.pic{
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: #000;
    margin-right: 10px;
    .tpic{
        width: 60rpx;
    }

}
</style>