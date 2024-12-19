<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getDetailApi } from '../../serviceDiscover'
import { onLoad } from '@dcloudio/uni-app';
import type { DetailItem } from '../../serviceDiscover'

const id = ref(5019223500)
// onLoad((options:any) => {
//     id.value = Number(options.id)
//     console.log(options.id)
// })
const detailList = ref<DetailItem>()
const plCont = ref(0)
const getDetail = async() =>{
    try{
        const res = await getDetailApi(id.value)
        console.log(res.playlist)
        detailList.value = res.playlist
        plCont.value = Math.floor(res.playlist.playCount / 10000)
    }catch(e){
        console.log(e)
    }
}
getDetail()

const goSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}

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
            </view>
        </view>
        <view class="button">
            <view class="collect"><i class="iconfont icon-folder-5-fill"></i>{{ plCont}}.0万收藏</view>
            <view class="latest"><i class="iconfont icon-bofang"></i>最新单集</view>
        </view>
    </view>
    <view class="content">
        <view class="nav"></view>

    </view>
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
.content{
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    position: absolute;
    top: 270px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
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
    }
    .imgTitle{
        width: 80%;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
        margin-bottom: 10px;
    }
}
.button{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .collect{
        width: 130px;
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
        width: 200px;
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
</style>