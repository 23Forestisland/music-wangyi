<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { getGrowupApi } from '../../serviceDiscover'

const goSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}

const img = ref()
const getGrowup = async() =>{
    try{
        const res = await getGrowupApi()
        console.log(res)
        img.value = res.data.levelCard.redVipImageUrl
    }catch(e){
        console.log(e)
    }
}
getGrowup()

const tab = ref<number>(0)
const tags = ref<string[]>(['音乐','播客','动态'])
const height = ref<number>(0)
const windowHeight = ref<number>(0)
const anchors = ref<number[]>([])


const handleHeightChange = ({ height }: { height: number }) => {
  console.log(height)
}

onLoad(() => {
  windowHeight.value = uni.getSystemInfoSync().windowHeight
  anchors.value = [100, Math.round(0.6 * windowHeight.value), Math.round(1 * windowHeight.value)]
  height.value = anchors.value[1]
})
const showLeft = ref()
const showLeftFn = () => {
    showLeft.value.open()
}
</script>

<template>
 <view class="wrap">
    <view class="header">
        <uni-badge class="uni-badge-left-margin" text="3" absolute="rightTop" size="small" radius="100">
			<i class="iconfont icon-gengduo" @click="showLeftFn"></i>
		</uni-badge>
        <i class="iconfont icon-sousuo" @click="goSearch"></i>
        <i class="iconfont icon-gengduoxiao"></i>
    </view>
    <view class="user">
        <view class="avatar">
            <image src="" mode="widthFix"/>
        </view>
        <view class="username">
            <view>啊范德萨发</view>
            <image :src="img" mode="widthFix"/>
        </view>
        <view class="item">0枚徽章  |  北京  海淀  ·  村龄215天</view>
    </view>
    <wd-floating-panel v-model:height="height" :anchors="anchors" @heightChange="handleHeightChange">
        <wd-tabs v-model="tab" sticky>
            <block v-for="item in tags" :key="item">
                <wd-tab :title="item">
                <view class="content">{{ item}}内容</view>
                </wd-tab>
            </block>
        </wd-tabs>
    </wd-floating-panel>
 </view>
 <!-- 左侧抽屉 -->
 <uni-drawer ref="showLeft" mode="left" :width="320" >
        <More />
    </uni-drawer>
</template>

<style lang='scss' scoped>
.wrap{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#85432d,#87452d 50%);
}
.box{
    background: #f8f9fd;
}
.header{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 15px;
    i{
        font-size: 25px;
        color: #fff;
    }
    .icon-sousuo{
        flex: 1;
        text-align: right;
        margin: 0 10px;
        font-size: 20px;
    }
    .icon-gengduo{
        font-size: 20px;
    }
}
.user{
    width: 100%;
    height: 400rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar{
        height: 75px;
        width: 75px;
        background: #fff;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    .username{
        display: flex;
        align-items: center;
        margin: 10px 0;
        view{
            font-size: 18px;
            color: rgba(255,255,255,.8);
        }
        image{
            width: 50px;
            margin-left: 5px;
        }
    }
    .item{
        font-size: 12px;
        color: rgba(255,255,255,.8);
    }
}
.inner-content {
  padding: 1rem;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
::v-deep .wd-floating-panel__header{
    background: #f8f9fd;
    border-radius: 20px;
    position: relative;
}
::v-deep .wd-floating-panel__content{
    position: relative;
}
::v-deep .wd-floating-panel__content,::v-deep .wd-sticky__container,::v-deep .wd-tabs__nav,::v-deep .wd-tabs__nav--sticky,::v-deep .wd-sticky{
    background: #f8f9fd;
}
::v-deep .wd-sticky__container{
    top: 30px !important;
    background-color: #f8f9fd;//#fa2b4f
}
::v-deep .wd-tabs__line{
    background-color: #fa2b4f;
}
::v-deep .wd-sticky__container{

}
.content {
  height: 100vh;
  width: 100vw;
  text-align: center;
  background: #f8f9fd;
}
</style>