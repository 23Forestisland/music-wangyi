import { createSSRApp } from "vue";
import './fonts/iconfont.css'
import App from "./App.vue"
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}