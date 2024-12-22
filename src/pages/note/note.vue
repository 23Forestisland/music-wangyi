<script lang='ts' setup >
import { ref} from 'vue'
import Follow from './components/follow.vue';
import Recommend from './components/recommend.vue';
import type{ noteRecommendItem, followItem} from '../../pages/service/type'
import { getFollowApi,getRecommendApi } from '../service';


    const recommendList = ref<noteRecommendItem[]>([]);
    const followList = ref<followItem[]>([]);
    const navTabs = ref<string[]>(['关注', '推荐'])
    const navTabIndex = ref<number>(1)

    const getRecommend =  () => {
        getRecommendApi().then((res) => {
            recommendList.value = res.data.events;
        });;
    };
    // getRecommend();
    const getFollow =  () => {
        getFollowApi().then((res) => {
            followList.value = res.data.followeds;
        });
    };
    getRecommend();
    getFollow();
</script>

<template>
 
    <view class="notea">
        <view class="nav">
                <img src="../../static/note.png" alt="" class="img1">
                <view class="nav-tab">
                    <view 
                    v-for="(item,index) in navTabs"
                    :key="item"
                    :class="{ active: navTabIndex === index }"
                    @click="navTabIndex = index"
                    >{{ item }}</view>
                    <img src="../../static/note_1.png" alt="" class="img2">
                </view>
        </view>
                <Follow v-if="navTabIndex=== 0" v-model="followList"></Follow>
                <Recommend v-else  v-model="recommendList"></Recommend>
        
    </view>
 
</template>

<style lang='scss' scoped>
    .notea{
        padding: 0 30rpx;
    }
    .nav{
        
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
    .img1{
        width: 50rpx;
        height: 50rpx;
    }
    .img2 {
        width: 60rpx;
        height: 60rpx;
    }
    .nav-tab{
        flex: 1;
        display: flex;
        margin: 0 60rpx;
        view{
            flex: 1;
            text-align: center;
            font-weight: bolder;
            font-size: 40rpx;
        }
        .active {
            color: #f00;
        }
    }
}

</style>