<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getGrowupApi, getQuestApi } from '../serviceDiscover'

const img = ref()
const quest = ref()
const getGrowup = async () => {
    try{
        const res = await getGrowupApi()
        const rew = await getQuestApi()
        img.value = res.data.levelCard.accountPageIconImgUrl
        quest.value = rew.data.taskList[0]
    }catch(e){
        console.log(e);
    }
}
getGrowup()

</script>

<template>
  <scroll-view class="box">
    <view class="header">
        <view class="avatar">
            <image src="" />
        </view>
        <view class="name">hhhhh<i class="iconfont icon-jiantou"></i></view>
        <i class="iconfont icon-saomiaoerweima"></i>
    </view>
    <view class="VIP">
        <view class="vinyl">
            <view class="vinylTitle">
                <image :src="img" mode="widthFix"/>
                <view>会员中心</view>
            </view>
            <view class="quest">
                <view>{{ quest.seqName }} | {{ quest.taskItems[0].action }}</view>
            </view>
            <view class="price">受邀专享，黑胶VIP仅￥0.03/天</view>
        </view>
        <view class="space">
            <view>双人空间</view>
            <view>超多人都在玩<i class="iconfont icon-jiantou"></i></view>
        </view>
    </view>
    <view class="oneList"></view>
    <view class="twoList"></view>
  </scroll-view>
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
    background: #fff;
    border-radius: 20px;
    margin: 15px 0;
    overflow: hidden;
    .vinyl{
        width: 100%;
        height: 300rpx;
        background: linear-gradient(-135deg,#1e1916, #5e4e4e, #1e1916);
        border-radius: 20px;
        padding: 15px;
        image{
            width: 100px;
        }
        .vinylTitle{
            display: flex;
            color: #debab4;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            view{
                border: 1px solid #debab4;
                padding: 5px 8px;
                border-radius: 15px;
            }
        }
        .quest{
            color: #debab4;
            font-size: 12px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            image{
                width: 18px;
            }
        }
        .price{
            color: #debab4;
            font-size: 12px;
            margin-top: 100rpx;
        }
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
.oneList{
    width: 100%;
    height: 200px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 15px;
}
.twoList{
    width: 100%;
    height: 200px;
    background: #fff;
    border-radius: 10px;
}
</style>