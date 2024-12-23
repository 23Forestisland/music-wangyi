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
/* 隐藏scroll-view滚动条 */
::-webkit-scrollbar{
  display: none;
}
.new-song-swiper {
  .uni-list-chat__content-title {
    font-size: 24rpx;
    font-weight: bolder;
    color: #674f56;
  }
  .uni-list-chat__content-note {
    font-size: 20rpx;
    color: #8F7C82;
  }
}
.content {
  .uni-scroll-view-content {
    height: initial;
  }
}
.play-all-list {
  .uni-list-item__content-note {
    width: 584rpx; /*设置宽度*/
    white-space: nowrap; /*文本不折行显示*/
    overflow: hidden; /*溢出隐藏*/
    text-overflow: ellipsis; /*显示省略号*/
  }
}
</style>
