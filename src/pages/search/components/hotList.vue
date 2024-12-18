<script setup lang="ts">
import { ref, reactive,watch, nextTick} from 'vue'
import {hotSearchApi,detailListApi} from '../../serviceSearch'
import type {Dailys,Detail} from '../../serviceSearch'
import Index from '@/pages/index/index.vue';

const hotlist=ref<Dailys[]>([])

let cur=ref('60px')
let cur2=ref('0')

type lArr=Detail[]

let listArr=ref<lArr[]>([])
let midArr:lArr[]=[]

const getHotList=async ()=>{
    try{
        const res=await hotSearchApi()
        const idx=Math.floor(Math.random()*(res.list.length-5))
        hotlist.value=res.list.slice(idx,idx+6)
        randerList()
    }catch(e){
        console.log(e)
    }
}

const getDetailList=async (id:number)=>{
    try{
        const res=await detailListApi(id)
        // console.log(res)
        midArr.push(res.playlist.tracks.slice(0,20))
    }catch(e){
        console.log(e)
    }
}

const randerList= async()=>{
    for (const item of hotlist.value) {
        await getDetailList(item.id)
    }
        listArr.value=midArr
        console.log(listArr.value)
    
}


getHotList()




const changecur=(e)=>{
    // console.log(e.detail.current) 
    if(e.detail.current<hotlist.value.length-1){
        cur.value=60+'px'
        cur2.value='0'
    }else{
        cur.value='0'
        cur2.value='60px'
    }
}

</script>

<template>
    <view class="hotList">
        <swiper class="swiper" :next-margin="cur"  :previous-margin="cur2" @change="changecur" >
				<swiper-item v-for="(item,index) in hotlist" :key="item.id" class="swp">
					<view class="swiper-item ">
                        <view class="tit">
                            <text class="tit-name">{{ item.name }}</text>
                            <text class="iconfont icon-bofang">播放</text>
                        </view>
                        <view class="dtlList">
                            <view class="ls-item" v-for="(item,idx) in listArr[index]" :key="item.name"><text>{{ idx+1+'.'}}</text>{{item.name}}</view>
                        </view>
                    </view>
				</swiper-item>
			</swiper>
    </view>
</template>

<style lang='scss' scoped>
.hotList{
    padding: 0 10px;
}
.swiper{
    height :600px ;
}
.swp{
    width: 100%;
    padding: 5px;
}
.swiper-item{
    width:100%;
    min-height: 40px;
    padding: 0 15px 15px;
    background: #eee;
    border-radius: 10px;
    margin-right: 10px;
    
    .tit{
        width:100%;
        height: 50px;
        display: flex;
        align-items: flex-end;
        padding: 10px 0;
        border-bottom:  1px solid #ccc;
        .tit-name{
            font-size: 18px;
            font-weight: bold;
            margin-right: 10px;
            max-width: 140px;
            overflow: hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
        }
        >.iconfont{
            font-size: 12px;
            padding: 2px 4px;
            background: #ccc;
            border-radius: 9px;
        }
        
    }
}
.dtlList{
    margin: 10px 0;
    padding: 0 10px;
}
.ls-item{
    width: 100%;
    height: 20px;
    margin: 5px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    cursor: pointer;
    text{
        margin-right: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
        
}

</style>