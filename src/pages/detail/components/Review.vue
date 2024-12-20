<script lang='ts' setup >
import { ref, reactive} from 'vue'
import type { ReviewItem } from '../../../serviceDiscover'

type Props = {
    list: ReviewItem[]
}

const props = defineProps<Props>()

</script>

<template>
  <view class="list">
    <view class="listItem" v-for="item in props.list" :key="item.commentId">
        <view class="user">
            <view class="img">
                <image :src="item.user.avatarUrl" mode="widthFix" />
            </view>
            <view class="username">
                <view class="name">{{ item.user.nickname }}</view>
                <view class="time">{{ item.timeStr }}</view>
            </view>
            <i class="iconfont icon-dianzan"></i>
        </view>
        <view class="content">
            <view class="title">{{ item.content }}</view>
        </view>
    </view> 
  </view>
</template>

<style lang='scss' scoped>
.list{
    .listItem{
        width: 100%;
        min-height: 80rpx;
        margin-top: 10px;
        padding: 15px 0;
        border-bottom: 1px solid #ddd;
    }
    .user{
        display: flex;
        align-items: center;
        .username{
            flex: 1;
        }
    }
    .img{
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        image{
            width: 100%;
        }
    }
    .content{
        padding-left: 50px;
        padding-right: 15px;
        font-size: 14px;
        margin-top: 10px;
    }
    .time{
        font-size: 11px;
        color: #bbb;
    }
    i{
        text-align: right;
        font-size: 23px;
        color: #aaa;
    }
}
</style>