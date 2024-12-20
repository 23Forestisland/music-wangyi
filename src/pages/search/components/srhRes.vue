<script setup lang="ts">
import { ref, reactive,} from 'vue'
import type{SearchResultItem} from '../../serviceSearch'

interface Props{
    list:SearchResultItem[]

}

const props=defineProps<Props>()


const goplay=(id:number,albumId:number,name:string,art:string)=>{
    uni.navigateTo({
	    url: `/pages/player/player?id=${id}&albumId=${albumId}&name=${name}&art=${art}`
    })
}

</script>

<template>
    <view class="srhRestList" >
        <view v-for="(item,index) in props.list" :key="item.id" class="item" @click="goplay(item.id,item.album.id,item.name ,item.artists.map((it)=>{return it.name}).join('/'))">
            <view class="left">
                <view class="name">{{ item.name }}</view>
                <view class="art">{{ item.artists.map((it)=>{return it.name}).join('/') }} - {{ item.album.name }}</view>
            </view>
            <view class="right">
                <view class="play iconfont icon-bofang"></view>
                <view class="menu iconfont icon-gengduo"></view>
            </view>
        </view>
    </view>
</template>

<style lang='scss' scoped>
.srhRestList{
    margin-top: 10px;
    padding: 20px 0 0;
    border-top: 1px solid #ccc;
}
.item{
    width: 100%;
    height: 50px;
    padding: 0 0 10px;
    margin: 0 10px 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.left{
    flex: 1;
    margin-right: 70px;
    overflow: hidden;
    .name{
        width: 100%;
        font-size: 16px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
    }
    .art{
        width: 100%;
        font-size: 12px;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
    }
}
.right{
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    .menu{
            transform: rotate(90deg);
            font-size: 16px;
            font-weight: 600;
    }
}
</style>