import { createSSRApp } from "vue";
import { createPinia } from 'pinia'
import './common/icon/font_4781276_vaj6ayh9ur/iconfont.css'
import './common/scss/common.scss'
import './fonts/iconfont.css'
import App from "./App.vue"
// import ad from './interceptor/addInterceptor'



export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia())
  return {
    app,
  };
}
