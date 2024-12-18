<script lang="ts" setup>
    import {ref} from 'vue'
    import type { noteRecommendItem } from '../../service/type'
    const recommendList = defineModel<noteRecommendItem[]>();
</script>

<template>
    <view class="follows">
        
        <view v-for="(item,index) in recommendList" :key="index" class="item">
            <view>
                <image mode="widthFix" :src="item.user.avatarUrl" class="pic"/>
                <view class="title">{{ item.user.nickname }}</view>
            </view>
            <view class="content">
                <text class="content-text">{{ JSON.parse(item.json).msg }}</text>
            </view>
        </view>
    </view>
</template>


<style lang="scss" scoped>
    
   
    .item {
    min-height: 160rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    
        .title {
                display: flex;
                align-items: center;
                height: 100rpx;
                font-weight: bold;
                // width: 45%;
                font-size: 40rpx;
            }
        
            image {
                width:50%;
                // margin-right: 30rpx;
            }
    
    

    .content {
        // width: 40%;
        font-size: 15px;
        padding: 10px; 
        
    }
}
</style>