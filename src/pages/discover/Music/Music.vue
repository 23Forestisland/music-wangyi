<script lang='ts' setup>
import { ref } from 'vue';
import DiscoverSwiper from './DiscoverSwiper/DiscoverSwiper.vue';
import SongList from './SongList/SongList.vue';

interface Emits{
    "golist":[
        id:number,name:string,url:string
]
}
const emits=defineEmits<{(e: 'golist', ...args: any[]): void}>()
</script>

<template>
    <!-- 轮播图 -->
    <DiscoverSwiper/>
    <!-- 甄选歌单 -->
    <SongList  />
</template>

<style lang='scss' scoped>


</style>
