<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { getDetailApi } from '../../serviceDiscover'
import { onLoad } from '@dcloudio/uni-app';

const id = ref()
onLoad((options:any) => {
    id.value = Number(options.id)
    console.log(options.id)
})
const getDetail = async() =>{
    try{
        const res = await getDetailApi(id.value)
        console.log(res)
    }catch(e){
        console.log(e)
    }
}
getDetail()

</script>

<template>
  <view class="box">
    <view class="bg">
        <view class="header">
            <i class="iconfont icon-fanhui"></i>
            <i class="iconfont icon-sousuo"></i>
            <i class="iconfont icon-gengduo"></i>
        </view>
    </view>
    <view class="content">

    </view>
  </view>
</template>

<style lang='scss' scoped>
.box{
    width: 100vw;
    height: 100vh;
    position: relative;
}
.bg{
    width: 100%;
    height: 300px;
    background: linear-gradient(#444438,#161711);
}
.header{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 15px;
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
}
.content{
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    position: absolute;
    top: 270px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
</style>