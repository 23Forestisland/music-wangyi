<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getPodcastApi, getVersionApi, getPrivateApi } from '../serviceDiscover'
import type { PodcastItem } from '../serviceDiscover'

const privateList = ref([])
const getPrivate = async () => {
    try{
        const res = await getPrivateApi()
        privateList.value = res.data
        console.log(res)
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


const headList = ref([ '我的播客', '全部分类', '排行榜', '音乐百科', '助眠解压', '广播电台' ])

</script>

<template>
 <view>
    <scroll-view class="header" scroll-x>
        <view class="headItem">
            <view class="tags" v-for="item in  headList" :key="item">{{ item }}</view>
        </view>
    </scroll-view>
    <swiper class="swiperBox" next-margin="15px" previous-margin="15px">
        <swiper-item class="swiperItem">
            <view class="swiCount">
                <image src="" mode="heightFix" class=""/>
                <view class="swiText">内容</view>
                <i class="iconfont icon-bofang"></i>
            </view>
        </swiper-item>
        <swiper-item class="swiperItem">
            <view class="swiCount">2</view>
        </swiper-item>
        <swiper-item class="swiperItem">
            <view class="swiCount">3</view>
        </swiper-item>
    </swiper>
    <view class="exclusive">
        <view class="excTitle">
            <view>为你推荐专属播客</view>
            <view class="like">兴趣定制</view>
        </view>
        <view class="excItem">
            <view v-for="item in podcast" :key="item.id" class="picitem">
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
        width: 90%;
        height: 100px;
        background: #f0eced;
        margin-top: 30px;
        border-radius: 8px;
        padding: 15px;
        display: flex;
        image{
            height: 100%;
            width: 70px;
            background: #f00;
            border-radius: 5px;
            margin-right: 10px;
        }
        .swiText{
            flex: 1;
        }
        i{
            width: 40px;
            height: 100%;
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