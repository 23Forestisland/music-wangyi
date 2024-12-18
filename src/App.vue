<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
.discover-music-swiper-wrap{
  .uni-swiper-dots-horizontal {
    transform: none;
    left: 10%;
  }
}
</style>
