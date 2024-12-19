<script setup  lang="ts">
import { ref, reactive,onMounted} from 'vue'
import {guessSongsApi} from '../../serviceSearch'
import type {Dailys} from '../../serviceSearch'

interface Emits {
    changeVal: [value: string]
}

const emits=defineEmits<Emits>()
const guessList=ref<Dailys[]>()

const getGusList= async ()=>{
  try{
    const res=await guessSongsApi()
    // console.log(res)
    const idx=Math.floor(Math.random()*res.data.dailySongs.length)
    guessList.value=res.data.dailySongs.slice(idx)
  }catch(e){
    console.log(e)
  }
}
onMounted(()=>{
  getGusList()
})


</script>

<template>
  <view class="guessLike">
    <view class="tit">
        <uni-section title="猜你喜欢" type="line"></uni-section>
        <view class="iconfont icon-shuaxin" @click="getGusList"></view>
    </view>
    <view class="content">
      <view class="dateList">
        <view class="List-it" v-for="item in guessList" :key="item.id" @click="emits('changeVal',item.name)">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.guessLike{
  margin-bottom: 20px;
}
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
.content{
  width: 100%;
  height: 30px;
  .dateList{
    width: 100%;
    height: 30px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    .List-it{
      flex-shrink: 0;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      background: #ccc;
      margin: 0 5px;  
    }
  }
}
</style>