<script setup lang="ts">
import { ref, reactive,onMounted} from 'vue'
import Content from './components/content.vue'
const detPage=ref()
const pageTitle=ref<string>('歌单')
const handleScroll=(e)=>{
    // console.log('asf')
    // console.log(e.detail.scrollTop)
    if(e.detail.scrollTop>=40){
        pageTitle.value='我是滚动导航条'
    }else{
        pageTitle.value='歌单'
    }
}
</script>

<template>
<scroll-view scroll-y="true" @scroll="handleScroll" class="songListDetail" style="height: 100vh;">
            <view class="header">
            <view class="it L">
                <view class="iconfont icon-houtui"></view>
                <view>{{pageTitle}}</view>
            </view>
            <view class="it R">
                <view class="iconfont icon-sousuo"></view>
                <view class="iconfont icon-gengduo"></view>
            </view>
        </view>
        <Content  ref="detPage"/>
        <view class="Content1">
            <view class="tit" >我是滚动导航条</view>
        </view>
</scroll-view>

</template>

<style lang='scss' scoped>
.Content1{
    width: 100%;
    padding: 0 20px;
    height: 800px;
    background: gold;
    .tit{
        position: sticky;
        top: 40px;
        left: 0;
    }
}
.topContent{
    width: 100%;
    padding:40px 20px 0;
    height: 300px;
    background: #ccc;
}
.header{
    width: 100%;
    height: 40px;
    position: fixed;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    background: #fff;
    
    .it{
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