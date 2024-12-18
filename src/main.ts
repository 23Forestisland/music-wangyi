import { createSSRApp } from "vue";
<<<<<<< HEAD
import { createPinia } from 'pinia'
import './common/icon/font_4781276_vaj6ayh9ur/iconfont.css'
import './common/scss/common.scss'
=======
>>>>>>> bdcd9615e3fd3b3304f3b6fc58379b0c739d6fd7
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia())
  return {
    app,
  };
}