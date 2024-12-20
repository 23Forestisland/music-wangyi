<script setup lang="ts">
import { ref, reactive,onMounted} from 'vue'
import Content from './components/content.vue'
import{onPageScroll} from "@dcloudio/uni-app";
const detPage=ref()
const pageTitle=ref<string>('歌单')

onPageScroll((res)=> {
			// console.log("页面滚动了",console.log(res))
            if(res.scrollTop>=40){
                pageTitle.value='迷雾之声'
            }else{
                pageTitle.value='歌单'
            }
})
</script>

<template>

    <view   class="songListDetail" style="height: 100%;">
        <view class="rongqi">
            <view class="header">
                <view class="it L">
                    <view class="iconfont icon-houtui"></view>
                    <view class="scrolling-text" >
                        <view class="text">{{pageTitle}}</view>

                    </view>
                </view>
                <view class="it R">
                    <view class="iconfont icon-sousuo"></view>
                    <view class="iconfont icon-gengduo"></view>
                </view>
            </view>
            <Content  ref="detPage"/>
            
            <view class="Content1">
                <view class="tit" >我是滚动导航条</view>
                <view class="content2"></view>
            </view>
            
        </view> 
    </view>


</template>

<style lang='scss' scoped>

// 滚动播放文字
.scrolling-text {
    position: relative;
    white-space: nowrap; /* 保持文本为单行 */
    overflow: hidden; /* 隐藏溢出的内容 */
    width: 100%; /* 容器宽度 */
    height: 30px; /* 容器高度 */
    padding:0 5px;
    margin-right: 0!important;
}
.scrolling-text .text {
    display: inline-block;
    padding-left: 100%; /* 初始位置 */
    animation: scrollText 5s linear infinite; /* 动画 */
    animation-fill-mode: forwards;
}
.scrolling-text:hover .text {
  animation-play-state: paused; /* 暂停动画 */
}
@keyframes scrollText {
    0% { transform: translateX(0); }
    100%  { transform: translateX(-100%); }
}



.songListDetail{
    position: relative;
}
.content2{
    height: 1000px;
}

.Content1{
    width: 100%;
    padding: 0 20px;
    background: gold;
    .tit{
        width: 100%;
        height: 40px;
        position: sticky;
        top: 84px;
        left: 0;
        z-index: 1;
        
    }
    
}
.header{
    width: 100%;
    height: 40px;
    position: fixed;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.2);
    z-index: 2;
    
    .it{
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 18px;    
        font-weight: 600;
        .iconfont{
            font-size: 25px;
        }
        }
    }
.L{
    flex: 1;
    margin-right: 100px;
    >view{
        
        margin-right: 20px;
    }
}
.R{
    >view{
        margin-left: 20px;
    }
}
</style>