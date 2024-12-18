<script setup lang="ts">
import { ref, reactive} from 'vue'
import Historical from './components/historical.vue';
import HotList from './components/hotList.vue';
import GuessLike from './components/guessLike.vue'


const searchValue=ref<string>()


const search=(res)=> {
        uni.showToast({
            title: '搜索：' + res.value,
            icon: 'none'
        })
}

</script>

<template>
    <view class="head">
        <view class="iconfont icon-houtui"></view>
        <view class="search">
            <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入搜索内容" clearButton="auto" cancelButton="none" @confirm="search" />
        </view>
        <view>搜索</view>
    </view>
    <!-- 搜索框下列表 -->
    <view class="tabs">
        <view class="tab-item">
            <text class="iconfont icon-geshou"></text>
            <text>歌手</text>
        </view>
        |
        <view class="tab-item">
            <text class="iconfont icon-benshu"></text>
            <text>曲风</text>
        </view>
        |
        <view class="tab-item">
            <text class="iconfont icon-yinfuSVG-"></text>
            <text>专区</text>
        </view>
        |
        <view class="tab-item">
            <text class="iconfont icon-maikefeng"></text>
            <text>识曲</text>
        </view>
    </view>
    <!-- 搜索历史 -->
    <Historical />
    <!-- 猜你喜欢 -->
    <GuessLike />
    <!-- 榜单列表 -->
    <HotList />

</template>

<style lang='scss' scoped>
    .head{
        width: 100%;
        height: 40px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >.iconfont{
            font-size: 25px;
            font-weight: bold;
        }
        .search{
            flex: 1;
            border-radius: 15px;
        }
    }
    ::v-deep.uni-searchbar__box{
        border-radius: 18px!important;
    }
    .tabs{
        width: 100%;
        height: 20px;
        padding: 20px 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #ccc;
        .tab-item{
            text{
                font-size: 16px;
                font-weight: 600;
                color: #555;
            }
            .iconfont{
                color: #FC3B3B;
                font-weight: bold;
                margin: 0 5px;
                font-size: 18px;
            }
        }
    }
</style>