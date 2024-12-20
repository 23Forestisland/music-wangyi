<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getGrowupApi} from '../serviceDiscover'

const getGrowup = async () => {
    try{
        const res = await getGrowupApi()
        console.log(res);
    }catch(e){
        console.log(e);
    }
}


</script>

<template>
  <view class="box">
    <view class="header">
        <view class="avatar">
            <image src="" />
        </view>
        <view class="name">hhhhh<i class="iconfont icon-jiantou"></i></view>
        <i class="iconfont icon-saomiaoerweima"></i>
    </view>
    <view class="VIP">
        <view class="vinyl"></view>
        <view class="space">
            <view>双人空间</view>
            <view>超多人都在玩<i class="iconfont icon-jiantou"></i></view>
        </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.box{
    width: 100%;
    height: 100%;
    padding: 15px;
}
.header{
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    .avatar{
        width: 100rpx;
        height: 100rpx;
        background: #eee;
        border-radius: 50%;
    }
    .name{
        flex: 1;
        font-size: 17px;
        margin: 0 10px;
        color: #666;
        i{
            font-size: 20px;
        }
    }
    .icon-saomiaoerweima{
        font-size: 24px;
        color: #666;
    }
}
.VIP{
    width: 100%;
    height: 400rpx;
    background: #eee;
    border-radius: 20px;
    margin: 15px 0;
    overflow: hidden;
    .vinyl{
        width: 100%;
        height: 300rpx;
        background: linear-gradient(-135deg,#1e1916, #5e4e4e, #1e1916);
        border-radius: 20px;
    }
    .space{
        height: 25%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        padding: 0 15px;
        color: #999;
    }
}
</style>