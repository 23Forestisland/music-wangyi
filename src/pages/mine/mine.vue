<script lang='ts' setup >
import { ref, reactive} from 'vue'
import Mini from '@/components/mini-player.vue'
import { useStore } from '@/store';
const store=useStore()
</script>

<template>
 <div>
<h1>我的</h1>
<Mini v-if="store.onactive"/>
 </div>
</template>

<style lang='scss' scoped>

</style>