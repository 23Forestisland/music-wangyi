<script lang='ts' setup>
import { ref } from 'vue';
import { getSongListApi, getHomePageApi } from '../../service/index';
import type { SongListItem } from '../../service/index';
import DiscoverNav from './DiscoverNav/DiscoverNav.vue';
import DiscoverSwiper from './DiscoverSwiper/DiscoverSwiper.vue';
import SongList from './SongList/SongList.vue';
import NewSongNewAlbum from './NewSongNewAlbum/NewSongNewAlbum.vue';

const zhenXuanTitle = ref<string>("甄选歌单");
const yunCunTitle = ref<string>("云村新鲜事");
const newSongNewAlbumTitle = ref<string>("新歌新碟");
const blockList = ref([]);

getHomePageApi()
    .then((res) =>{
        const blocks = res.data.blocks.forEach(item => {
            if(item.showType === 'HOMEPAGE_SLIDE_SONGLIST_ALIGN') {
                blockList.value = item.creatives;
            }
        })
    })


</script>

<template>
    <scroll-view class="music-wrap" scroll-y>
        <!-- 发现导航 -->
        <!-- <DiscoverNav/> -->
        <!-- 轮播图 -->
        <DiscoverSwiper/>
        <!-- 甄选歌单 -->
        <SongList :title="zhenXuanTitle" :getApi="getSongListApi"/>
        <!-- 云村新鲜事 -->
        <SongList :title="yunCunTitle" :getApi="getSongListApi"/>
        <!-- 新歌新碟 -->
        <NewSongNewAlbum :title="newSongNewAlbumTitle" :list="blockList"/>
    </scroll-view>
</template>

<style lang='scss' scoped>
.music-wrap {
    width: 100%;
    height: 100%;
    padding-bottom: 20rpx;
}

</style>
