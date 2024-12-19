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
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
.discover-music-swiper-wrap {
  .uni-swiper-dots-horizontal {
    transform: none;
    left: 10%;
  }
}
body,html{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f8f9fd;
}
}
</style>
