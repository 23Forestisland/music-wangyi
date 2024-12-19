<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getDetailApi } from '../../serviceDiscover'
import { onLoad } from '@dcloudio/uni-app';
import type { DetailItem } from '../../serviceDiscover'
import AudioList from './components/AudioList.vue'
import Recommend from './components/Recommend.vue'
import Review from './components/Review.vue'

let query = ref<number>(0)
onLoad((options) => {
    query.value = Number(options!.id)
    console.log(query.value)
    getDetail()
})
const detailList = ref<DetailItem>()
const plCont = ref(0)
const getDetail = async() =>{
    try{
        const res = await getDetailApi(query.value)
        console.log(res)
        detailList.value = res.playlist
        plCont.value = res.playlist.playCount / 10000
    }catch(e){
        console.log(e)
    }
}
const curIdx = ref(0)


const goSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}
const navList = ref(['声音','评论','推荐'])
</script>

<template>
  <view class="box">
    <view class="bg">
        <view class="header">
            <i class="iconfont icon-fanhui"></i>
            <i class="iconfont icon-sousuo" @click="goSearch"></i>
            <i class="iconfont icon-gengduo"></i>
        </view>
        <view class="img">
            <image :src="detailList?.coverImgUrl" mode="widthFix" ></image>
            <view class="imgText">
                <view class="imgTitle">{{ detailList?.name }}</view>
                <view>{{ detailList?.subscribers[0].nickname}}<i class="iconfont icon-jiantou"></i></view>
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
            <view class="latest"><i class="iconfont icon-bofang"></i>最新单集</view>
        </view>
    </view>
    <scroll-view class="content">
        <view class="navs">
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
                <i class="iconfont icon-zhengpinbaozhang-duigou"></i>
            </view>
        </view>
        <scroll-view scroll-y class="count">
            <view class="countItem">
                <view v-if="curIdx === 0">
                    <AudioList :list="detailList?.tracks" />
                </view>
                <view v-else-if="curIdx === 1">
                    <Review />
                </view>
                <view v-else-if="curIdx === 2">
                    <Recommend />
                </view>
            </view>
        </scroll-view>
    </scroll-view>
  </view>
</template>

<style lang='scss' scoped>
.box{
    width: 100vw;
    height: 100vh;
    position: relative;
}
.bg{
    width: 100%;
    height: 300px;
    padding: 0 15px;
    background: linear-gradient(#444438,#161711);
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
    image{
        width: 110px;
        height: 110px;
        background: #fff;
        margin-right: 15px;
        border-radius: 5px;
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
    height: 100%;
    background: #f3f3f3;
    position: absolute;
    top: 270px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 15px;
    .navs{
        margin-top: 10px;
        display: flex;
        align-items: center;
        height: 30px;
        width: 100%;
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
}
</style>