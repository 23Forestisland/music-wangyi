<script setup lang="ts">
import { ref, reactive} from 'vue'
import type{SearchSuggestItem} from '../../serviceSearch'
interface Props {
    list: SearchSuggestItem[]

}
interface Emits {
    changeVal: [value: string]
}


const props=defineProps<Props>()

const emits=defineEmits<Emits>()

</script>

<template>
    <view class="suggestList" v-if="props.list">
        <view v-for="item in props.list" :key="item.keyword" class="lSitem" @click="emits('changeVal', item.keyword)">
            <view class="iconfont icon-sousuo"></view>
            <view>{{ item.keyword}}</view>
        </view>
    </view>
</template>

<style lang='scss' scoped>
.suggestList{
    width: 100%;
    margin: 10px 0 0;
    padding: 10px 20px;
    .lSitem{
        width: 100%;
        height: 30px;
        padding: 0 0 5px;
        line-height: 25px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
}
</style>