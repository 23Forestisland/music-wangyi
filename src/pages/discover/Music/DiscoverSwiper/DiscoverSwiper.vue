<script lang="ts" setup>
import { ref } from 'vue';
import { getBannerApi } from '../../../service/index';
import type { BannerItem } from '../../../service/index';
const bannerList = ref<BannerItem[]>([]);

getBannerApi()
    .then((res) => {
        bannerList.value = res.banners;
    })

function handleClick() {
    console.log('点击');
}
</script>

<template>
  <view class="discover-music-swiper-wrap">
        <swiper
            class="swiper"
            indicator-dots
            indicator-color="#859c96"
            indicator-active-color="#ffffff"
            autoplay
            circular
        >
            <swiper-item class="swiper-item" v-for="item in bannerList" :key="item.targetId">
                <image mode="widthFix" :src="item.imageUrl" @click="handleClick()"/>
                <text class="item-type">{{ item.typeTitle }}</text>
            </swiper-item>
        </swiper>
    </view>
</template>

<style lang="scss" scoped>
.discover-music-swiper-wrap {
    margin: 20px 0;
    height: 248rpx;
    .swiper{
        height: 248rpx;
        .swiper-item {
            padding: 0 40rpx;
            position: relative;
            image {
                width: 100%;
                border-radius: 10px;
            }
            .item-type {
                background: #fff;
                position: absolute;
                bottom: 10rpx;
                right: 50rpx;
                font-size: 20rpx;
                padding: 4rpx;
                border-radius: 10rpx;
                font-weight: bold;
                color: #202720;
            }
        }
    }
}
</style>