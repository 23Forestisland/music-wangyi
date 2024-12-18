import { createSSRApp } from "vue";
import './fonts/iconfont.css'
import App from "./App.vue"
import 'uview-ui/theme.scss';


export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}