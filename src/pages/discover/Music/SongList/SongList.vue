<script lang="ts" setup>
import { ref } from 'vue';
import { getSongListApi, type SongListItem } from '../../../service/index';
const musicList = ref<SongListItem[]>([]);

getSongListApi()
    .then((res) => {
        musicList.value = res.result;
    })


// 处理数字展示千/万单位
const formatNumber = (num: number): string | number => {
  let formattedNum;

  if (num >= 10000) {
    // 金额大于等于1万时，转换为“万”为单位，保留一位小数
    formattedNum = (num / 10000).toFixed(1) + '万';
  } else if (num >= 1000) {
    // 金额大于等于1千，小于1万时，显示为“千”
    formattedNum = (num / 1000).toFixed(0) + '千';
  } else {
    // 金额小于1千，直接显示原金额
    formattedNum = num;
  }

  return formattedNum;
}
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
                        <view class="headphones-icon">
                            <i class="iconfont icon-24gf-headphones"></i>
                            <text>{{ formatNumber(item.playCount) }}</text>
                        </view>
                        <image :src="item.picUrl"/>
                        <view class="bofang-icon">
                            <i class="iconfont icon-bofang"></i>
                        </view>
                        <view class="music_list_desc">
                            <text class="text-desc">{{ item.name }}</text>
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
                        position: relative;
                        image {
                            width: 200rpx;
                            height: 200rpx;
                            border-radius: 5px;
                        }
                        .text-desc {
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