<script lang='ts' setup >
import { ref, reactive} from 'vue'

const goSearch = () => {
    uni.navigateTo({
        url: '/pages/search/search'
    })
}

</script>

<template>
  <view>
    <view class="header">
        <uni-badge class="uni-badge-left-margin" text="3" absolute="rightTop" size="small" radius="100">
			<i class="iconfont icon-gengduo1"></i>
		</uni-badge>
        <uni-search-bar class="uni-mt-10" radius="100" bgColor="#EEEEEE" placeholder="搜索歌曲" 
            clearButton="none" cancelButton="none" @click="goSearch"
        />
        <i class="iconfont icon-maikefeng"></i>
    </view>
  </view>
</template>

<style lang='scss' scoped >
.header{
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    .icon-gengduo1{
        font-size: 18px;
    }
    .icon-maikefeng{
        font-size: 25px;
    }
}
.uni-searchbar{
    flex: 1;
    border-radius: 20px;
    margin: 0 8px;
}
</style>
