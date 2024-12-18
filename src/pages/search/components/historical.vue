<script setup >
import { ref, reactive} from 'vue'

</script>

<template>
    <view class="historical">
        <view class="tit">
            <uni-section title="搜索历史" type="line"></uni-section>
            <view class="iconfont icon-shanchu1"></view>
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
</style>