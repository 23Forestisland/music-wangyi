<script lang='ts' setup >
import { ref, reactive} from 'vue'
import podcast from './components/podcast.vue';

const showLeft = ref()
const tab = ref(0)
const tabs = ref(['音乐','播客','听书'])

const showLeftFn = () => {
    showLeft.value.open()
}

const goSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}

</script>

<template>
    <view class="box">
        <!-- tabs切换 -->
        <view class="header">
            <i class="iconfont icon-gengduo" @click="showLeftFn"></i>
            <view class="tab">
                <view v-for="(item, idx) in tabs" :key="item"
                    :class="{'active': idx === tab}"
                    @click="tab = idx"
                >{{ item }}</view>
            </view>
            <i class="iconfont icon-sousuo" @click="goSearch"></i>
        </view>
        <!-- 内容 -->
        <scroll-view class="scroll" scroll-y>
             <view class="content" v-for="(item,idx) in 3" :key="item">
                <view v-show="tab === idx">
                    <!-- 音乐 -->
                    <view v-if="idx === 0">{{ item }}</view>
                    <!-- 博客 -->
                    <view v-else-if="idx === 1">
                        <podcast />
                    </view>
                    <!-- 听书 -->
                    <view v-else-if="idx === 2">{{ item }}</view>
                </view>
            </view>
        </scroll-view>
       

        <!-- 左侧抽屉 -->
        <uni-drawer ref="showLeft" mode="left" :width="320" >
		</uni-drawer>
    </view>
</template>

<style lang='scss' scoped>
.box{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.header{
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
    i{
        font-size: 20px;
    }
    .tab{
        width: 180px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        .active{
            font-weight: bold;
            position: relative;
            &:after{
                content: '';
                position: absolute;
                width: 50%;
                height: 2px;
                background: #c84343;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
}
.scroll{
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
}
</style>