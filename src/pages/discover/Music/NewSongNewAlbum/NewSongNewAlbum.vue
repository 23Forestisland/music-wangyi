<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
    title: String,
    list: Array
});

interface Obj{
    name: String
}

function formatName(n: Obj[]): String {
    return n.map(item => item.name).join('');
}

// 点击播放音乐
function handlePlayMusic(id) {
    // console.log("点击播放", id)
}


</script>

<template>
    <view class="new-song-view">
        <view class="new-song-title">
            {{  title  }}
            <i class="iconfont icon-jiantou"></i>
        </view>
        <swiper class="new-song-swiper" next-margin="70rpx">
            <swiper-item class="new-song-swiper-item" v-for="(listItem, index) in list" :key="index">
                <uni-list class="list" :border="false">
                    <uni-list-chat
                        class="list-chat"
                        v-for="(resourcesItem, index) in listItem.resources"
                        :key="index"
                        :title="resourcesItem.uiElement.mainTitle.title"
                        :avatar="resourcesItem.uiElement.image.imageUrl"
                        :note="formatName(resourcesItem.resourceExtInfo.artists)"
                        clickable
                        @click="handlePlayMusic(resourcesItem.resourceId)"
                    >
                        <i class="iconfont icon-bofang"></i>
                    </uni-list-chat>
                </uni-list>
            </swiper-item>
        </swiper>
    </view>
</template>

<style lang="scss" scoped>
.new-song-view {
    width: 100%;
    margin-top: 60rpx;
    .new-song-title {
        padding-left: 40rpx;
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
    }
    .new-song-swiper {
        height: 420rpx;
        .new-song-swiper-item {
            width: 325px;
            .list {
                background: none;
                .list-chat {
                    background: none;
                }
            }
            .icon-bofang {
                line-height: 90rpx;
                font-size: 26rpx;
                color: #7D676E;
            }
        }
    }
}
</style>