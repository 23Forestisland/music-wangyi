<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getDayApi } from '../../serviceDiscover'
import type { PodcastItem } from '../../serviceDiscover'

const goSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}

const dayList = ref<PodcastItem[]>([])
const getDay = async() =>{
    try{
        const res = await getDayApi()
        console.log(res)
        dayList.value = res.recommend
    }catch(e){
        console.log(e)
    }
}
getDay()
</script>

<template>
  <view>
    <view class="header">
        <uni-badge class="uni-badge-left-margin" text="3" absolute="rightTop" size="small" radius="100">
			<i class="iconfont icon-gengduo1"></i>
		</uni-badge>
        <uni-search-bar class="uni-mt-10" radius="100" bgColor="#EEEEEE" placeholder="搜索歌曲" 
            clearButton="none" cancelButton="none" @click="goSearch"
        />
        <i class="iconfont icon-maikefeng"></i>
    </view>
    <scroll-view class="content" scroll-y>
        <swiper class="swiperBox" next-margin="50px" display-multiple-items="2">
            <swiper-item v-for="item in dayList" :key="item.id">
                <view class="swiperItem">
                    <image :src="item.picUrl" mode="heightFix" />
                    <i class="iconfont icon-bofang"></i>
                    <view class="title">{{ item.name }}</view>
                </view>
            </swiper-item>
        </swiper>
    </scroll-view>
  </view>
</template>

<style lang='scss' scoped >
.header{
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    .icon-gengduo1{
        font-size: 18px;
    }
    .icon-maikefeng{
        font-size: 25px;
    }
}
.uni-searchbar{
    flex: 1;
    border-radius: 20px;
    margin: 0 8px;
}
.content{
    width: 100%;
    height: 100%;
}
.swiperBox{
    height: 200px;
    width: 100%;
    padding-left: 15px;
    margin-bottom: 10px;
    swiper-item{
        display: flex;
        align-items: center;
    }
    .swiperItem{
        height: 90%;
        width: 140px;
        background: #fff;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        image{
            height: 100%;
        }
        i{
            position: absolute;
            right: 7px;
            bottom: 40px;
            color: #fff;
            font-size: 20px;
        }
        .title{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 40px;
            background: rgba(0,0,0,.5);
            color: #fff;
            font-size: 13px;
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 40px;
        }
    }
}
</style>
