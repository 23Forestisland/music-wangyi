<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getDetailApi, getReviewApi } from '../../serviceDiscover'
import { onLoad } from '@dcloudio/uni-app';
import type { DetailItem, ReviewItem } from '../../serviceDiscover'
import AudioList from './components/AudioList.vue'
import Recommend from './components/Recommend.vue'
import Review from './components/Review.vue'
import {useList} from '../../store/playlist.ts'
const detPage=ref<string>()
const pageTitle=ref<string>('歌单')

const list=useList()



let query = ref<number>(0)
onLoad((options) => {
    query.value = Number(options!.id)
    getDetail()
    getReview()
})
const detailList = ref<DetailItem>()
const plCont = ref(0)
const reviewList = ref<ReviewItem[]>([])
const flag = ref(false)
const songlist=ref<string>()
const getDetail = async() =>{
    try{
        flag.value = true
        const res = await getDetailApi(query.value)
        detailList.value = res.playlist
        console.log(res)
        list.aslist=res.playlist.tracks
        songlist.value=res.playlist.tracks.map(item=>{
            return item.id
        }).join(',')
        plCont.value = res.playlist.playCount / 10000
    }catch(e){
        console.log(e)
    }finally{
        flag.value = false
    }
}
const curIdx = ref(0)

const getReview = async() =>{
    try{
        flag.value = true
        const res = await getReviewApi(query.value)
        reviewList.value = res.comments
        console.log(res)
    }catch(e){
        console.log(e)
    }finally{
        flag.value = false
    }
}

const scroll=(e)=>{
        // console.log(e)
        if(e.detail.scrollTop>=40){
                if(detailList.value){
                    pageTitle.value=detailList.value!.name
                }

            }else{
                pageTitle.value='歌单'

            }
            if(e.detail.scrollTop>=100){
                detPage.value='#161711'
            }else{
                detPage.value='rgba(0,0,0,0.5)'
            }
}


const goSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}

const playallsong = () => {
    uni.navigateTo({
        url: `/pages/player/player?id=${songlist.value}`
    })
}



const navList = ref(['声音','评论','推荐'])



const goBack=()=>{
    uni.navigateBack({
        delta: 1
    })
}
</script>

<template>
<scroll-view class="box"  scroll-y style="height: 100vh;" @scroll="scroll">
    <view class="loading"  v-if="flag">
        <uni-load-more status="loading" 
            iconType="circle" 
            color="#fff"
        ></uni-load-more>
    </view> 
    <view class="bg">
        <view class="header" :style="{background:detPage}">
                <view class="it L">
                    <view class="iconfont icon-houtui" v-on:click="goBack"></view>
                    <view class="scrolling-text" >
                        <view class="text">{{pageTitle}}</view>
                    </view>
                </view>
                <view class="it R">
                    <view class="iconfont icon-sousuo" @click="goSearch"></view>
                    <view class="iconfont icon-gengduo" ></view>
                </view>
        </view>
        <view class="img">
            <view class="imgBox">
                <image :src="detailList?.coverImgUrl" mode="widthFix" ></image>
            </view>
            <view class="imgText">
                <view class="imgTitle">{{ detailList?.name }}</view>
                <!-- <view class="nickname">{{ detailList?.subscribers[0].nickname}}<i class="iconfont icon-jiantou"></i></view> -->
                <view class="tags">
                    <view class="mark" v-if="detailList?.score">
                        <i class="iconfont icon-shoucang"></i>
                        {{ detailList?.score }} | 高分必听
                        <i class="iconfont icon-jiantou"></i>
                    </view>
                    <view class="tag" v-for="item in detailList?.tags" :key="item">{{ item }}</view> 
                </view>
                
            </view>
        </view>
        <view class="button">
            <view class="collect"><i class="iconfont icon-folder-5-fill"></i>{{ plCont.toFixed(1) }}万收藏</view>
            <view class="latest" @click="playallsong"><i class="iconfont icon-bofang" ></i>最新单集</view>
        </view>
    </view>
    <view class="content">
        <view class="navs" >
            <view class="navTxt">
                <uni-badge class="uni-badge-left-margin" 
                    text="99+" 
                    absolute="rightTop" 
                    size="small"
                    type="infor"
                    :inverted="true"
                    v-for="(item,idx) in navList" :key="item"
                >
                    <view :class="{'active': curIdx === idx}"
                        @click="curIdx = idx"
                    >{{ item }}</view>
                </uni-badge>
            </view>
            <view class="icon">
                <i class="iconfont icon-paixu-jiangxu"></i>
                <i class="iconfont icon-duigou"></i>
            </view>
        </view>
        <view scroll-y class="count">
            <view class="countItem">
                <view v-if="curIdx === 0">
                    <AudioList :list="detailList?.tracks" />
                </view>
                <view v-else-if="curIdx === 1">
                    <Review :list="reviewList"/>
                </view>
                <view v-else-if="curIdx === 2">
                    <Recommend />
                </view>
            </view>
        <view>
    </view>
    </view>
</view>
</scroll-view>
</template>

<style lang='scss' scoped>
.uni-page-wrapper{
    height: 100vh;
    overflow: scroll;
}
.test{
    height: 900px;
}
// body{
//     height: 100vh;
//     overflow: scroll;
    
// }
// // page{
//     width: 100vw;
//     min-height: 100vh;
//     overflow: scroll;

// }


.scrolling-text {
    position: relative;
    white-space: nowrap; /* 保持文本为单行 */
    overflow: hidden; /* 隐藏溢出的内容 */
    width:  100px; /* 容器宽度 */
    height: 30px; /* 容器高度 */
    padding:0 5px;
    margin-right: 0!important;
}
.scrolling-text .text {
    display: inline-block;
    padding-left: 100%; /* 初始位置 */
    animation: scrollText 5s linear infinite; /* 动画 */
    animation-fill-mode: forwards;
}
.scrolling-text:hover .text {
  animation-play-state: paused; /* 暂停动画 */
}
@keyframes scrollText {
    0% { transform: translateX(0); }
    100%  { transform: translateX(-100%); }
}

.header{
    width: 100%;
    height: 40px;
    position: fixed;
    display: flex;
    padding: 20px;
    left: 0;
    height: 0;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    z-index: 2;
    
    .it{
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 18px;    
        font-weight: 600;
        .iconfont{
            font-size: 25px;
        }
        }
    }
.L{
    flex: 1;
    margin-right: 100px;
    >.iconfont{
        margin-right: 20px;
    }

}
.R{
    >view{
        margin-left: 20px;
    }
}



.loading{
    width: 250rpx;
    height: 100rpx;
    background: rgba(0,0,0,.2);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    z-index: 99;
}
.box{
    position: relative;
    overflow: scroll;
    background: linear-gradient(#444438,#161711);
}
.bg{
    width: 100%;
    height: 250px;
    padding: 0 15px;
    background: linear-gradient(#444438,#161711);
    position: relative;
}
.header{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    i{
        font-size: 25px;
        color: #fff;
    }
    .icon-sousuo{
        flex: 1;
        text-align: right;
        margin: 0 10px;
        font-size: 20px;
    }
}
.img{
    display: flex;
    margin-bottom: 15px;
    color: #bbb;
    padding-top: 40px;
    .imgBox{
        width: 220rpx;
        height: 220rpx;
        overflow: hidden;
        margin-right: 15px;
        border-radius: 5px;
    }
    image{
        width: 100%;
        background: #fff;
        flex-shrink: 0;
    }
    .imgText{
        flex: 1;
        font-size: 14px;
        overflow: hidden;
    }
    .imgTitle{
        width: 80%;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
        margin-bottom: 5px;
    }
}
.button{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .collect{
        width: 140px;
        height: 40px;
        background: #fff;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        i{
            margin-right: 5px;
            font-size: 18px;
        }
    }
    .latest{
        width: 190px;
        height: 40px;
        background: #fd3b3b;
        border-radius: 20px;
        font-size: 14px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            margin-right: 5px;
            font-size: 18px;
        }
    }
}
.tags{
    display: flex;
    margin-top: 15px;
    flex-shrink: 0;
    width: 300px;
    i{
        font-size: 12px;
        color: #f2c877;
    }
    view{
        padding: 3px 6px;
        border: 1px solid #aaa;
        font-size: 12px;
        border-radius: 3px;
        margin-right: 5px;
    }
}
.content{
    width: 100%;
    // height: 500px;
    background: #f3f3f3;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    padding-top: 5px;
    .navs{
        position: sticky;
        top: 50px;
        left: 0;
        margin-top: 10px;
        display: flex;
        align-items: center;
        height: 30px;
        width: 100%;
        background: #f3f3f3;
        padding: 15px;
        z-index: 9;
        .navTxt{
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-right: 90px;
        }
        .icon{
            display: flex;
            align-items: center;
        }
        .icon-paixu-jiangxu{
            font-size: 28px;
            margin-right: 18px;
        }
        i{
            font-size: 22px;
        }
    }
}
.uni-badge-left-margin {
    margin-right: 15px;
    font-size: 15px;
    .active{
        position: relative;
        &::after{
            content: '';
            position: absolute;
            width: 15px;
            border-radius: 7px;
            height: 3px;
            background: #fb304f;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

}
::v-deep .uni-badge--infor-inverted{
    color: #333;
}
.count{
    height: 100%;
    width: 100%;
    padding-bottom: 300px;
    padding: 15px;
}
</style>