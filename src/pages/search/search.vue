<script setup lang="ts">
import { ref, reactive,watch} from 'vue'
import Historical from './components/historical.vue';
import HotList from './components/hotList.vue';
import GuessLike from './components/guessLike.vue'
import {searchApi,suggestApi} from '../serviceSearch/index'
import type {SearchResultItem,SearchSuggestItem} from '../serviceSearch/index'
import Suggest from './components/suggest.vue'
import SrhRes from './components/srhRes.vue';
import {useStore} from '../../store'

const searchValue=ref<string>()
const showList=ref<number>(0)
const isSearch=ref<boolean>(false)
const loading=ref<boolean>()
const resultList = ref<SearchResultItem[]>([])
const suggestList=ref<SearchSuggestItem[]>([])
const store=useStore()
let timer: number

const flag = ref(false)
enum ListType {
    DEFAULT = 0,
    relevant=1,
    search= 2
}

const getSuggestList= async ( val:string)=>{
    try{
        flag.value = true
        const res=await suggestApi(val)
        console.log(res)
        suggestList.value = res.result.allMatch
    }catch(e){
        console.log(e)
    }
}

const input = (val: string) => {
    if (val !== '' && !loading.value) {
        console.log('input 事件')
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            getSuggestList(val)
        }, 500)
    }
}





const search= async () => {
    isSearch.value=true
    loading.value = true
    console.log('search 事件', searchValue.value)
    const res = await searchApi(searchValue.value as string)
    resultList.value = res.result.songs
    loading.value = false
    let arr:string[]=JSON.parse(localStorage.getItem('historical')!) || []
    if(arr.indexOf(searchValue.value as string)<0){
        store.historical.push(searchValue.value!)
        localStorage.setItem('historical',JSON.stringify(store.historical))
    }
}

const clickSearch=()=>{
    search()
}

const tapSearch=(value: string)=>{
    searchValue.value=value
    search()
}

const goBack=()=>{
    uni.navigateBack({
	    delta: 1
    })
}

watch([searchValue,isSearch],()=>{
    if(searchValue.value){
        showList.value=1
        input(searchValue.value as string)
        if(isSearch.value){
            showList.value=2
        }
    }else{
        showList.value=0
        isSearch.value=false
        resultList.value=[]
        suggestList.value=[]
    }
})

</script>

<template>
    <view class="loading" v-if="flag">
        <uni-load-more status="loading" 
            iconType="circle" 
            color="#fff"
        ></uni-load-more>
    </view>
    <view class="head">
        <view class="iconfont icon-houtui" @click="goBack"></view>
        <view class="search">
            <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入搜索内容" clearButton="auto" cancelButton="none" v-model="searchValue" @confirm="search"  />
        </view>
        <view @click="clickSearch">搜索</view>
    </view>
    <view class="initial" v-show="showList===ListType.DEFAULT">
            <!-- 搜索框下列表 -->
        <view class="tabs">
            <view class="tab-item">
                <text class="iconfont icon-geshou"></text>
                <text>歌手</text>
            </view>
            |
            <view class="tab-item">
                <text class="iconfont icon-benshu"></text>
                <text>曲风</text>
            </view>
            |
            <view class="tab-item">
                <text class="iconfont icon-yinfuSVG-"></text>
                <text>专区</text>
            </view>
            |
            <view class="tab-item">
                <text class="iconfont icon-maikefeng"></text>
                <text>识曲</text>
            </view>
        </view>
        <!-- 搜索历史 -->
        <Historical   @changeVal="tapSearch"/>
        <!-- 猜你喜欢 -->
        <GuessLike   @changeVal="tapSearch"/>
        <!-- 榜单列表 -->
        <HotList   @changeVal="tapSearch"/>
    </view>
    <view class="rel" v-show="showList===ListType.relevant">
        <Suggest  :list="suggestList"   @changeVal="tapSearch" />
    </view>
    <view class="rel" v-show="showList===ListType.search">
        <SrhRes :list="resultList" />
    </view>

</template>

<style lang='scss' scoped>
    .loading{
        width: 250rpx;
        height: 100rpx;
        background: rgba(0,0,0,.2);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        z-index: 99;
    }
    .head{
        width: 100%;
        height: 40px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >.iconfont{
            font-size: 25px;
            font-weight: bold;
        }
        .search{
            flex: 1;
            border-radius: 15px;
        }
    }
    ::v-deep.uni-searchbar__box{
        border-radius: 18px!important;
    }
    .tabs{
        width: 100%;
        height: 20px;
        padding: 20px 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #ccc;
        .tab-item{
            text{
                font-size: 16px;
                font-weight: 600;
                color: #555;
            }
            .iconfont{
                color: #FC3B3B;
                font-weight: bold;
                margin: 0 5px;
                font-size: 18px;
            }
        }
    }
</style>
