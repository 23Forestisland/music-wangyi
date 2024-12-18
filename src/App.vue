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
}
body,html{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
