<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getDayApi } from '../../serviceDiscover'
import type { PodcastItem } from '../../serviceDiscover'

const goSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}

let status = ref('loading')
const flag = ref(false)

const dayList = ref<PodcastItem[]>([])
const getDay = async() =>{
    try{
        flag.value = true
        const res = await getDayApi()
        dayList.value = res.recommend
    }catch(e){
        console.log(e)
    }finally{
        flag.value = false
    }
}
getDay()


const showLeft = ref()
const showLeftFn = () => {
    showLeft.value.open()
}

</script>

<template>
  <view> 

    <view class="loading" v-if="flag">
        <uni-load-more :status="status" 
            iconType="circle" 
            color="#fff"
        ></uni-load-more>
    </view>
    
    <view class="header">
        <uni-badge class="uni-badge-left-margin" text="3" absolute="rightTop" size="small" radius="100">
			<i class="iconfont icon-gengduo" @click="showLeftFn"></i>
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
        <view class="hot">
            <view class="rapTitle">说唱 | 电子 | 摇滚 热门榜单</view>
            <swiper next-margin="25px">
                <swiper-item>
                    <view class="rapItem">
                        <view class="imgBox">
                            <view class="img">
                                <image src="" mode="widthFix" />
                            </view>
                            <view></view>
                            <i></i>
                        </view>
                        <view class="imgBox">
                            <view class="img">
                                <image src="" mode="widthFix" />
                            </view>
                            <view></view>
                            <i></i>
                        </view>
                        <view class="imgBox">
                            <view class="img">
                                <image src="" mode="widthFix" />
                            </view>
                            <view></view>
                            <i></i>
                        </view>
                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="rapItem">2</view>
                </swiper-item>
                <swiper-item>
                    <view class="rapItem">3</view>
                </swiper-item>
            </swiper>
        </view>
        <text class="half-border">hhhhh45646515</text>
    </scroll-view>
    <!-- 左侧抽屉 -->
    <uni-drawer ref="showLeft" mode="left" :width="320" >
        <More />
    </uni-drawer>
  </view>
</template>

<style lang='scss' scoped >
.loading{
    width: 250rpx;
    height: 100rpx;
    background: rgba(0,0,0,.2);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
}
.header{
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    .icon-gengduo{
        font-size: 20px;
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
::v-deep .uni-drawer__content--visible{
    background: #f8f9fd;
}
.hot{
    height: 220px;
    width: 100%;
    background: #ddd;
    .rapTitle{
        margin-top: 15px;
        font-size: 15px;
        padding-top: 10px;
    }
    uni-swiper{
        height: 100%;
    }
    .rapItem{
        background: #fff;
        padding-left: 15px;
        height: 100%;
        width: 100%;
        .imgBox{
            margin: 10px 0;
        }
        .img{
            width: 100rpx;
            height: 100rpx;
            background: #ddd;
        }
        image{
            width: 100%;
        }
    }
}

.half-border {
  position: relative;
  border: none;
}
.half-border:before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: 0;
  left: 0;
  border: 1px solid black;
  transform: scale(0.5); 
  transform-origin: 0 0;
  box-sizing: border-box;
}
</style>
