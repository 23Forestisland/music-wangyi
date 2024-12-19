<script lang="ts" setup>
import { ref, defineComponent } from 'vue';
import { getSongListApi, type SongListItem } from '../../../service/index';
const musicList = ref<SongListItem[]>([]);

getSongListApi()
    .then((res) => {
        musicList.value = res.result;
    })

// 处理数字展示亿/万单位
const formatNumber = (num: number): string | number => {
  let formattedNum;

  if (num >= 100000000) {
    //大于等于1亿时，转换为“亿”为单位，保留一位小数
    formattedNum = (num / 100000000).toFixed(1) + '亿';
  } else if (num >= 10000) {
    // 大于等于1万，小于等于1亿时，转换为“万”为单位，保留一位小数
    formattedNum = (num / 10000).toFixed(1) + '万';
  } else if (num >= 1000) {
    // 大于等于1千，小于1万时，直接显示
    formattedNum = (num / 1000);
  } else {
    // 小于1千，直接显示
    formattedNum = num;
  }

  return formattedNum;
}

function goToListDetail(id: number) {
    // 跳转到歌单详情页
    uni.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
    });
};

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
                    <view class="song_scroll_view_item" v-for="item in musicList" :key="item.id" @click="goToListDetail(item.id)">
                        <view class="headphones-icon">
                            <i class="iconfont icon-24gf-headphones"></i>
                            <text>{{ formatNumber(item.playCount) }}</text>
                        </view>
                        <image :src="item.picUrl"/>
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