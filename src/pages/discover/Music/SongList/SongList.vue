<script lang="ts" setup>
import { ref } from 'vue';
const musicList = ref([]);

uni.request({
    url: 'https://zyxcl.xyz/music/api/personalized',
    success: (res) => {
        console.log("res===", res.data.result);
        musicList.value = res.data.result
    }
});
</script>

<template>
    <view class="song_list_wrap">
        <view class="title">
            <view class="h1">
                甄选歌单
            </view>
        </view>
        <view class="song_scroll_view_wrap">
            <scroll_view class="song_scroll_view" scroll_x>
                <view class="items">
                    <view class="song_scroll_view_item" v-for="item in musicList" id="item.id" :key="item.id">
                        <image :src="item.picUrl"/>
                        <view class="music_list_desc">
                            <text class="text-desc">
                                {{ item.name }}
                            </text>
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
        padding: 0 40rpx;
            .song_scroll_view {
                white-space: nowrap;
                width: 100%;
                .items {
                    width: 130%;
                    display: flex;
                    flex-wrap: nowrap;
                    overflow: auto;
                    .song_scroll_view_item {
                        display: inline-block;
                        height: 300rpx;
                        margin-right: 20rpx;
                        flex-shrink: 0;
                        image {
                            width: 200rpx;
                            height: 200rpx;
                            border-radius: 5px;
                        }
                        .music_list_desc {
                            .text-desc {
                                width: 200rpx;
                                font-size: 28rpx;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                            }
                        }
                    }
            }
        }
    }
}

</style>