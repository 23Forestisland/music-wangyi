<script lang="ts" setup>
import { ref, defineComponent } from 'vue';
import { getSongListApi } from '../../../service/index';
import type { SongListItem } from '../../../service/index';
import { formatNumber } from '../index';
const musicList = ref<SongListItem[]>([]);

const props = defineProps({
    title: String,
    getApi: Function,
    getChartApi: Function,
    showType: String,
    list: [],
})

props.getApi()
    .then((res) => {
        if(res) {
            if(props.showType === 'list') {
                musicList.value = res.result;
            } else if(props.showType === 'chart') {
                const l = res.list.slice(0, 6);
                musicList.value = l;
            }
        }
    })


function goToListDetail(id: number) {
    if(props.showType === 'list') {
        // 跳转到歌单详情页
        uni.navigateTo({
            url: `/pages/detail/detail?id=${id}`,
        });
    } else if(props.showType === 'chart') {
        // 跳转到排行榜详情页
        uni.navigateTo({
            url: `/pages/musicChartDetail/musicChartDetail?id=${id}`,
        });
    }
};

</script>

<template>
    <view class="song_list_wrap">
        <view class="title">
            <view class="h1">
                <!-- 标题 -->
                {{props.title}}
            </view>
        </view>
        <view class="song_scroll_view_wrap">
            <scroll_view class="song_scroll_view" scroll_x>
                <view class="items">
                    <view class="song_scroll_view_item" v-for="item in musicList" :key="item.id" @click="goToListDetail(item.id)">
                        <view class="headphones-icon" v-if="item.playCount">
                            <i class="iconfont icon-24gf-headphones"></i>
                            <text>{{ formatNumber(item.playCount) }}</text>
                        </view>
                        <image :src="item.picUrl ? item.picUrl : item.coverImgUrl"/>
                        <view class="bofang-icon">
                            <i class="iconfont icon-bofang"></i>
                        </view>
                        <view class="music_list_name">
                            <text class="text-name">{{ item.name }}</text>
                        </view>
                    </view>
                </view>
            </scroll_view>
        </view>
        <view class="uni-common-pb"></view>
    </view>
</template>

<style lang="scss" scoped>
.song_list_wrap {
    margin-top: 60rpx;
    .title {
        margin-bottom: 20rpx;
        .h1 {
            padding-left: 40rpx;
            font-size: 32rpx;
            font-weight: bold;
        }
    }
    .song_scroll_view_wrap {
        padding: 0 20rpx 0 40rpx;
        .song_scroll_view {
            white-space: nowrap;
            width: 100%;
            .items {
                display: flex;
                flex-wrap: nowrap;
                overflow: auto;
                .song_scroll_view_item {
                    display: inline-block;
                    height: 300rpx;
                    margin-right: 20rpx;
                    flex-shrink: 0;
                    position: relative;
                    image {
                        width: 200rpx;
                        height: 200rpx;
                        border-radius: 5px;
                    }
                    .text-name {
                        width: 200rpx;
                        font-size: 28rpx;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .headphones-icon {
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        z-index: 1;
                        color: #fff;
                        font-weight: bolder;
                        font-size: 12px;
                        .icon-24gf-headphones {
                            margin-right: 5px;
                        }
                    }
                    .icon-bofang {
                        color: #fff;
                        position: absolute;
                        bottom: 55px;
                        right: 10px;
                        font-size: 22px;
                    }
                }
            }
        }
    }
}

</style>