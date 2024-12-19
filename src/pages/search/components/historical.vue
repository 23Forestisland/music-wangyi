<script setup lang="ts">
import { ref, reactive, watch} from 'vue'
import {useStore} from '../../../store' 

interface Emits {
    changeVal: [value: string]
}

const emits=defineEmits<Emits>()

const isOpen=ref<boolean>(false)
const store=useStore()
const dateArr=ref<string[]>([])

// dateArr.value=dateArr.value.reverse()
const del=()=>{
    localStorage.removeItem('historical')
    store.historical=[]
}


watch(()=>store.historical.length,()=>{
    dateArr.value=store.historical
    dateArr.value=dateArr.value.reverse()
    console.log(dateArr.value)
},{immediate:true})
</script>

<template>
    <view class="historical">
        <view class="tit">
            <uni-section title="搜索历史" type="line"></uni-section>
            <view class="iconfont icon-shanchu1" @click="del"></view>
        </view>
        <view v-show="dateArr.length>0">
            <view class="content1" v-show="!isOpen">
                <view v-for="item in dateArr.slice(0,2)" class="item-con">{{ item }}</view>
                <view class="open iconfont icon-xiajiantou" @click="isOpen=!isOpen"></view>
            </view>
            <view class="content2" v-show="isOpen">
                <view v-for="item in dateArr" class="item-con">{{ item }}</view>
                <view class="open iconfont icon-xiangshangjiantou1" @click="isOpen=!isOpen"></view>
            </view>
        </view>

    </view>
</template>

<style lang='scss' scoped>
.tit{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .iconfont{
        margin-right: 10px;
        cursor: pointer;
        font-weight: normal;
    }
}
::v-deep .uni-section__content-title{
    font-weight: 600;
    font-size: 16px;
}

.content1{
    width: 100%;
    height: 20px;
    padding: 0 20px;
    display: flex;
    .item-con{
        height: 20px;
        line-height: 20px;
        padding: 0 10px;
        background: #ccc;
        border-radius: 10px;
        margin-right: 10px;
    }
}
.content2{
    width: 100%;
    min-height: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .item-con{
        height: 20px;
        line-height: 20px;
        padding: 0 10px;
        background: #ccc;
        border-radius: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
.open{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-weight: 600;
    background: #ccc;
}
</style>