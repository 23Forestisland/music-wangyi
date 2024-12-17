<script lang='ts' setup >
import { ref, reactive} from 'vue';
import { getBannerApi } from '../service/index';
import type { BannerItem } from '../service/index';
const bannerList = ref<BannerItem[]>([]);

getBannerApi()
    .then((res) => {
        bannerList.value = res.banners;
    })

</script>

<template>
<h1>发现</h1>
<view class="swiper-wrap">
    <swiper
        class="swiper"
        indicator-dots
        indicator-color="#859c96"
        indicator-active-color="#ffffff"
        autoplay
        circular
    >
        <swiper-item class="swiper-item" v-for="item in bannerList" :key="item.targetId">
            <image mode="widthFix" :src="item.imageUrl"/>
        </swiper-item>
    </swiper>
</view>
</template>

<style lang='scss' scoped>
.swiper-wrap {
    height: 260rpx;
    .swiper{
        image {
            width: 100%;
            border-radius: 10px;
        }
    }
}

</style>