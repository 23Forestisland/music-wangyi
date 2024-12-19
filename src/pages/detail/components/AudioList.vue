<script lang='ts' setup >
import { ref, reactive} from 'vue'

interface Props{
    list: any
}

const props = defineProps<Props>()

const goPlay = (id:number,albumId:number,name:string,art:string) => {
    uni.navigateTo({
        url: `/pages/player/player?id=${id}&albumId=${albumId}&name=${name}&art=${art}`
    })
}

</script>

<template>
	<view class="list">
		<view class="listItem" v-for="item in props.list" @click="goPlay(item.id,item.al.id,item.name,item.ar.map(v=>v.name))">
            <image :src="item.al.picUrl" mode="widthFix" />
            <view class="text">
                <view class="textItem">{{ item.name }}</view>
                <view class="play">内容</view>
            </view>
            <i class="iconfont icon-gengduo"></i>
        </view>
	</view>
</template>

<style lang='scss' scoped>
.listItem{
	width: 100%;
    height: 70px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    image{
        width: 60px;
        border-radius: 5px;
        margin-right: 10px;
    }
    .text{
        flex: 1;
        font-size: 14px;
        .play{
            margin-top: 5px;
            color: #bbb;
            font-size: 12px;
        }
    }
    i{
        width: 25px;
        font-size: 23px;
        color: #bbb;
    }
}
</style>