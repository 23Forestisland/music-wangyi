<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getPodcastApi, getVersionApi, getPrivateApi } from '../../../serviceDiscover'
import type { PodcastItem } from '../../../serviceDiscover'

const privateList = ref<PodcastItem[]>([])
const getPrivate = async () => {
    try{
        const res = await getPrivateApi()
        privateList.value = res.djRadios
    }catch(e){
        console.log(e)
    }
}
getPrivate()

const podcast = ref<PodcastItem[]>([])
const getPodcast = async () => {
    try{
        const res = await getPodcastApi()
        podcast.value = res.recommend
    }catch(e){
        console.log(e)
    }
}
getPodcast()

const versionList = ref<PodcastItem[]>([])
const getVersion = async() =>{
    try{
        const res = await getVersionApi()
        versionList.value = res.djRadios
    }catch(e){
        console.log(e)
    }
}
getVersion()

const goDetail = (id: number) => {
    console.log(id)
    uni.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
        data: {
            id: id
        }
    })
}


const headList = ref([ '我的播客', '全部分类', '排行榜', '音乐百科', '助眠解压', '广播电台' ])

</script>

<template>
 <view>
    <scroll-view class="header" scroll-x>
        <view class="headItem">
            <view class="tags" v-for="item in  headList" :key="item">{{ item }}</view>
        </view>
    </scroll-view>
    <swiper class="swiperBox" next-margin="20px" previous-margin="20px">
        <swiper-item class="swiperItem" v-for="item in privateList" :key="item.id">
            <view class="swiCount">
                <view class="pad">
                    <image :src="item.picUrl" mode="heightFix" class=""/>
                    <view class="swiText">
                        <view class="iteTitle">{{ item.name }}</view>
                        <view class="play">{{ item.playCount / 10000}}万次播放</view>
                        <view class="count">{{ item.copywriter }}</view>
                    </view>
                    <i class="iconfont icon-bofang"></i>
                </view>
            </view>
        </swiper-item>
    </swiper>
    <view class="exclusive">
        <view class="excTitle">
            <view>为你推荐专属播客</view>
            <view class="like">兴趣定制</view>
        </view>
        <view class="excItem">
            <view v-for="item in podcast" :key="item.id" 
                class="picitem" 
                @click="goDetail(item.id)" 
            >
                <image :src="item.picUrl" mode="widthFix" />
                <view class="picText">{{ item.name }}</view>
            </view>
        </view>
    </view>
    <view class="constant">
        <view>你常听的创作翻唱</view>
        <swiper class="contSwiper" display-multiple-items="3">
            <swiper-item v-for="item in versionList" :key="item.id">
                <view>
                    <image :src="item.picUrl" mode="widthFix" />
                    <view class="picText">{{ item.name }}</view>
                </view>
            </swiper-item>
        </swiper>
    </view>
 </view>
</template>

<style lang='scss' scoped>
.header{
    height: 50px;
    width: 100%;
    overflow: auto;
    margin-top: 15px;
    .headItem{
        width: 130%;
        display: flex;
        overflow: auto;
        .tags{
            width: 70px;
            height: 30px;
            border-radius: 5px;
            margin: 0 5px;
            font-size: 13px;
            background: #eee;
            text-align: center;
            line-height: 30px;
        }
    }
}
.swiperBox{
    height: 200px;
    width: 100%;
    background: #e0d7da;
}
.swiperItem {
    .swiCount{
        width: 100%;
        height: 100px;
        margin-top: 30px;
        padding: 10px;
        .pad{
            padding: 15px;
            display: flex;
            background: #f0eced;
            border-radius: 8px;
            image{
                width: 75px;
                height: 75px;
                margin-right: 10px;
            }
        }
       
        .swiText{
            width: 170px;
            height: 70px;
            margin-right: 10px;
            .iteTitle{
                font-size: 14px;
                color: #7e373f;
            }
            .play{
                font-size: 12px;
                color: #dfc7c9;
                margin-top: 5px;
            }
           .count{
                width: 100%;
                height: 14px;
                font-size: 12px;
                color: #bc9598;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 10px;
           }
        }
        i{
            width: 30px;
            height: 30px;
            background: #e6d8d9;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            margin-top: 40px;
            color: #7d3542;
        }
    }
}
.exclusive{
    width: 100%;
    height: 350px;
    margin: 15px 0;
    padding: 15px;
}
.excTitle{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 14px;
    margin-bottom: 15px;
    .like{
        font-size: 12px;
        color: #506ba4;
    }
}
.excItem {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .picitem{
        margin-bottom: 15px;
    }
    image{
        width: 105px;
        border-radius: 8px;
        white-space: nowrap;
    }
}
.picText{
    width: 100px;
    font-size: 12px;
    overflow:hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.constant{
    height: 200px;
    width: 100%;
    padding: 15px;
}
.contSwiper{
    width: 100%;
    height: 150px;
}
.contSwiper{
    margin-top: 15px;
    image{
        width: 100px;
        border-radius: 8px;
    }
}

</style>