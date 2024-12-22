<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { getMusicChartDetailApi } from '../service';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
import { formatNumber } from '../discover/Music/index';
const isHidden = ref<Boolean>(true); // 是否隐藏收藏/评论/分享
const isLoading = ref<Boolean>(false); // 页面加载loading
const playlist = ref<playlistItem>({
    coverImgUrl: '',
    name: '',
    updateTime: 0,
    subscribedCount: 0,
    playCount: 0,
    trackCount: 0,
    tracks: [],
});

interface trackItem{
    id: number;
    name: string;
    ar: Object[];
};

interface playlistItem{
    coverImgUrl: string;
    name: string;
    updateTime: number;
    subscribedCount: number;
    playCount: number;
    trackCount: number;
    tracks: trackItem[];
};

onLoad((option) => {
    const { id } = option;
    // 获取榜单详情页数据
    isLoading.value = true;
    getMusicChartDetailApi({ id })
    .then((res) => {
        playlist.value = res.playlist;
        isLoading.value = false;
    })
})

// 展示全部歌手的名字
const singerName = (ar: Object[]) => {
    return ar.map((item) => item.name).join('/');
}

// 格式化更新时间
const formatUpdateTime = (time: number) => {
    const date = new Date(time);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 监听滚动条滚动事件
const handleScroll = (e) => {
    const { scrollTop } = e.detail;
    if(scrollTop <= 112) {
        isHidden.value = true;
    } else {
        isHidden.value = false;
    };
}

const goBack = () => {
    uni.navigateBack({
        delta: 1,
        animationType: 'pop-out',
        animationDuration: 200
    });
}

</script>
<template>
    <uni-load-more :status="'loading'" class="loading" v-if="isLoading"/>
    <view class="music-chart-detail-view">
        <!-- 背景图 -->
        <view class="bg" :style="{'background-image': 'url('+playlist.coverImgUrl+')'}"></view>
        <!-- 头部 -->
        <view class="header">
            <view class="header-l">
                <i class="iconfont icon-fanhui" @click="goBack"></i>
            </view>
            <view class="header-r">
                <i class="iconfont icon-sousuo"></i>
                <i class="iconfont icon-gengduoxiao"></i>
            </view>
        </view>
        <!-- 内容 -->
        <scroll-view class="content" :scroll-top="scrollTop" scroll-y="true" @scroll="handleScroll">
            <!-- 榜单标题 -->
            <view class="music-chart-title">
                <view class="logo">
                    <image src="../../static/logo.png"/>
                    <text class="name">{{ "网易云音乐" }}</text>
                </view>
                <view class="title">{{ playlist.name }}</view>
                <view class="update-time">{{ "最近更新时间" }}<text>{{ formatUpdateTime(playlist.updateTime) }}</text></view>
            </view>
            <!-- 榜单列表详情 -->
            <view class="music-chart-detail">
                <!-- 用户操作：收藏/评论/分享 -->
                <view class="user-actions" v-show="isHidden" >
                    <!-- 收藏 -->
                    <view class="user-actions-item">
                        <image src="../../static/duigou.png"></image>
                        <text class="count">{{ formatNumber(playlist.subscribedCount) }}</text>
                    </view>
                    <!-- 评论 -->
                    <view class="user-actions-item">
                        <image src="../../static/pinglun.png"></image>
                        <text class="count">{{ formatNumber(playlist.playCount) }}</text>
                    </view>
                    <!-- 分享 -->
                    <view class="user-actions-item no-line">
                        <image src="../../static/fenxiang.png"></image>
                        <text class="count">{{ formatNumber(playlist.playCount) }}</text>
                    </view>
                </view>
                <view class="empty"></view>
                <view class="music-chart-detail-content">
                    <!-- 播放全部 -->
                    <view class="play-all-box">
                        <view class="play-all-box-l">
                            <image src="../../static/bofang.png"/>
                            <text class="play-all-btn">{{ "播放全部" }}<text>({{ playlist.trackCount }})</text></text>
                        </view>
                        <view class="play-all-box-r">
                            <image src="../../static/xiazai.png"/>
                            <image src="../../static/liebiao.png"/>
                        </view>
                    </view>
                    <!-- 音乐列表 -->
                    <view class="play-all-list">
                        <uni-list :border="true">
                            <uni-list-item
                                class="list-item"
                                v-for="(item, index) in playlist.tracks"
                                :key= "item.id"
                                ellipsis="1"
                                :title="item.name"
                                :note="singerName(item.ar)"
                            >
                                <template v-slot:header>
                                    <view class="list-item-h">{{ index + 1 }}</view>
                                </template>
                                <template v-slot:footer>
                                    <i class="iconfont icon-gengduoxiao"></i>
                                </template>
                            </uni-list-item>
                        </uni-list>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>
<style lang="scss" scoped>
.loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
.music-chart-detail-view {
    width: 100%;
    height: 100vh;
    .bg {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-position: center 0;
        background-size: cover; /*背景图平铺*/
        filter: blur(3px); /*模糊*/
        transform: scale(1.2);
    }
    .header {
        height: 87rpx;
        display: flex;
        line-height: 87rpx;
        justify-content: space-between;
        padding-left: 38rpx;
        padding-right: 54rpx;
        position: relative;
        color: #fff;
        >i {
            color: #fff;
        }
        .icon-fanhui {
            margin-right: 44rpx;
        }
        .icon-sousuo {
            margin-left: 44rpx;
        }
        .icon-gengduoxiao {
            margin-left: 66rpx;
        }

    }
    .content {
        height: 100vh;
        overflow: auto;
        position: relative;
        .music-chart-title {
            height: 268rpx;
            color: #fff;
            .logo {
                height: 34rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                image {
                    width: 34rpx;
                    height: 34rpx;
                    color: #fff;
                }
                .name {
                    font-size: 20rpx;
                    font-weight: bold;
                }
            }
            .title {
                height: 144rpx;
                font-size: 84rpx;
                font-weight: bolder;
                line-height: 144rpx;
                text-align: center;
            }
            .update-time {
                height: 92rpx;
                font-size: 22rpx;
                text-align: center;
            }
        }
        .music-chart-detail {
            position: relative;
            background: #fff;
            .user-actions {
                width: 556rpx;
                height: 86rpx;
                border-radius: 50rpx;
                background: #fff;
                padding: 24rpx 36rpx;
                position: absolute;
                display: flex;
                align-items: center;
                border: 1px solid #fff;
                left: 50%; /* 水平居中 */
                transform: translate(-50%, -50%);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
                overflow-y: scroll;
                .user-actions-item {
                    flex: 1;
                    height: 34rpx;
                    border-right: 1px solid #dfd5d3;
                    font-weight: bold;
                    line-height: 34rpx;
                    text-align: center;
                    image {
                        height: 34rpx;
                        width: 34rpx;
                        margin-right: 14rpx;
                        vertical-align: middle; //基线对齐
                    }
                    .count {
                        font-size: 20rpx;
                    }
                }
                .no-line {
                    border-right: none;
                }
            }
            .empty {
                height: 82rpx;
                width: 100%;
            }
            .music-chart-detail-content {
                height: 100%;
                .play-all-box {
                    height: 82rpx;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 36rpx 0 22rpx;
                    top: 0;
                    position: sticky;
                    z-index: 9;
                    background: #fff;
                    .play-all-box-l {
                        display: flex;
                        align-items: center;
                        image {
                            height: 46rpx;
                            width: 46rpx;
                            margin-right: 20rpx;
                        }
                        .play-all-btn text {
                            font-size: 30rpx;
                        }
                        .play-all-btn text:nth-child(1) {
                            margin-left: 14rpx;
                            font-size: 22rpx;
                        }
                    }
                    .play-all-box-r {
                        display: flex;
                        align-items: center;
                        image {
                            height: 30rpx;
                            width: 30rpx;
                        }
                    }
                    .play-all-box-r image:nth-child(2){
                        margin-left: 36rpx;
                    }
                }
                .play-all-list {
                    height: 100%;
                    margin-bottom: 86rpx;
                    .uni-list-item__container {
                        align-items: center;
                        .list-item-h {
                            margin-right: 34rpx;
                        }
                    }
                }
            }
        }
    }
}
</style>