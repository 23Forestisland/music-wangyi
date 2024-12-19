import{r as e,o as s,b as a,w as l,e as t,n as c,f as i,g as r,h as n,i as o,j as u,d,k as _,c as f,F as p,l as m,m as h,t as w,a as y,p as v,S as g,q as k,s as x,u as b,v as T,x as D,y as S,z as C,A as I,B as U}from"./index-6-guE5ck.js";import{_ as j}from"./_plugin-vue_export-helper.BCo6x5W8.js";import{g as A,a as z,b as B}from"./index.BqiasgMC.js";const E=j({name:"UniDrawer",components:{keypress:{name:"Keypress",props:{disable:{type:Boolean,default:!1}},mounted(){const e={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]};document.addEventListener("keyup",(s=>{if(this.disable)return;const a=Object.keys(e).find((a=>{const l=s.key,t=e[a];return t===l||Array.isArray(t)&&t.includes(l)}));a&&setTimeout((()=>{this.$emit(a,{})}),0)}))},render:()=>{}}},emits:["change"],props:{mode:{type:String,default:""},mask:{type:Boolean,default:!0},maskClick:{type:Boolean,default:!0},width:{type:Number,default:220}},data:()=>({visibleSync:!1,showDrawer:!1,rightMode:!1,watchTimer:null,drawerWidth:220}),created(){this.drawerWidth=this.width,this.rightMode="right"===this.mode},methods:{clear(){},close(e){("mask"!==e||this.maskClick)&&this.visibleSync&&this._change("showDrawer","visibleSync",!1)},open(){this.visibleSync||this._change("visibleSync","showDrawer",!0)},_change(e,s,a){this[e]=a,this.watchTimer&&clearTimeout(this.watchTimer),this.watchTimer=setTimeout((()=>{this[s]=a,this.$emit("change",a)}),a?50:300)}}},[["render",function(d,_,f,p,m,h){const w=u,y=e("keypress");return m.visibleSync?(s(),a(w,{key:0,class:c([{"uni-drawer--visible":m.showDrawer},"uni-drawer"]),onTouchmove:n(h.clear,["stop","prevent"])},{default:l((()=>[t(w,{class:c(["uni-drawer__mask",{"uni-drawer__mask--visible":m.showDrawer&&f.mask}]),onClick:_[0]||(_[0]=e=>h.close("mask"))},null,8,["class"]),t(w,{class:c(["uni-drawer__content",{"uni-drawer--right":m.rightMode,"uni-drawer--left":!m.rightMode,"uni-drawer__content--visible":m.showDrawer}]),style:i({width:m.drawerWidth+"px"})},{default:l((()=>[r(d.$slots,"default",{},void 0,!0)])),_:3},8,["class","style"]),t(y,{onEsc:_[1]||(_[1]=e=>h.close("mask"))})])),_:3},8,["class","onTouchmove"])):o("",!0)}],["__scopeId","data-v-0522f2c7"]]),F=j(d({__name:"podcast",setup(e){const c=_([]);(async()=>{try{const e=await A();c.value=e.djRadios}catch(e){console.log(e)}})();const i=_([]);(async()=>{try{const e=await z();i.value=e.recommend}catch(e){console.log(e)}})();const r=_([]);(async()=>{try{const e=await B();r.value=e.djRadios}catch(e){console.log(e)}})();const n=_(["我的播客","全部分类","排行榜","音乐百科","助眠解压","广播电台"]);return(e,o)=>{const d=u,_=g,T=k,D=x,S=b;return s(),a(d,null,{default:l((()=>[t(_,{class:"header","scroll-x":""},{default:l((()=>[t(d,{class:"headItem"},{default:l((()=>[(s(!0),f(p,null,m(n.value,(e=>(s(),a(d,{class:"tags",key:e},{default:l((()=>[h(w(e),1)])),_:2},1024)))),128))])),_:1})])),_:1}),t(S,{class:"swiperBox","next-margin":"15px","previous-margin":"10px"},{default:l((()=>[(s(!0),f(p,null,m(c.value,(e=>(s(),a(D,{class:"swiperItem",key:e.id},{default:l((()=>[t(d,{class:"swiCount"},{default:l((()=>[t(T,{src:e.picUrl,mode:"heightFix",class:""},null,8,["src"]),t(d,{class:"swiText"},{default:l((()=>[t(d,{class:"iteTitle"},{default:l((()=>[h(w(e.name),1)])),_:2},1024),t(d,{class:"play"},{default:l((()=>[h(w(e.playCount/1e4)+"万次播放",1)])),_:2},1024),t(d,{class:"count"},{default:l((()=>[h(w(e.copywriter),1)])),_:2},1024)])),_:2},1024),y("i",{class:"iconfont icon-bofang"})])),_:2},1024)])),_:2},1024)))),128))])),_:1}),t(d,{class:"exclusive"},{default:l((()=>[t(d,{class:"excTitle"},{default:l((()=>[t(d,null,{default:l((()=>[h("为你推荐专属播客")])),_:1}),t(d,{class:"like"},{default:l((()=>[h("兴趣定制")])),_:1})])),_:1}),t(d,{class:"excItem"},{default:l((()=>[(s(!0),f(p,null,m(i.value,(e=>(s(),a(d,{key:e.id,class:"picitem",onClick:s=>{return a=e.id,console.log(a),void v({url:`/pages/detail/detail?id=${a}`,data:{id:a}});var a}},{default:l((()=>[t(T,{src:e.picUrl,mode:"widthFix"},null,8,["src"]),t(d,{class:"picText"},{default:l((()=>[h(w(e.name),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),t(d,{class:"constant"},{default:l((()=>[t(d,null,{default:l((()=>[h("你常听的创作翻唱")])),_:1}),t(S,{class:"contSwiper","display-multiple-items":"3"},{default:l((()=>[(s(!0),f(p,null,m(r.value,(e=>(s(),a(D,{key:e.id},{default:l((()=>[t(d,null,{default:l((()=>[t(T,{src:e.picUrl,mode:"widthFix"},null,8,["src"]),t(d,{class:"picText"},{default:l((()=>[h(w(e.name),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1})}}}),[["__scopeId","data-v-67f2482c"]]),L=()=>(({url:e})=>new Promise(((s,a)=>{T({url:e,success:e=>{s(e.data)},fail:a})})))({url:"https://zyxcl.xyz/music/api/banner"}),M=j(d({__name:"DiscoverSwiper",setup(e){const c=_([]);return L().then((e=>{c.value=e.banners})),(e,i)=>{const r=k,n=x,o=b,d=u;return s(),a(d,{class:"discover-music-swiper-wrap"},{default:l((()=>[t(o,{class:"swiper","indicator-dots":"","indicator-color":"#859c96","indicator-active-color":"#ffffff",autoplay:"",circular:""},{default:l((()=>[(s(!0),f(p,null,m(c.value,(e=>(s(),a(n,{class:"swiper-item",key:e.targetId},{default:l((()=>[t(r,{mode:"widthFix",src:e.imageUrl},null,8,["src"])])),_:2},1024)))),128))])),_:1})])),_:1})}}}),[["__scopeId","data-v-e2a72acb"]]),R=j(d({__name:"SongList",setup(c){const i=_([]);return T({url:"https://zyxcl.xyz/music/api/personalized",success:e=>{console.log("res===",e.data.result),i.value=e.data.result}}),(c,r)=>{const n=u,o=k,d=D,_=e("scroll_view");return s(),a(n,{class:"song_list_wrap"},{default:l((()=>[t(n,{class:"title"},{default:l((()=>[t(n,{class:"h1"},{default:l((()=>[h(" 甄选歌单 ")])),_:1})])),_:1}),t(n,{class:"song_scroll_view_wrap"},{default:l((()=>[t(_,{class:"song_scroll_view",scroll_x:""},{default:l((()=>[t(n,{class:"items"},{default:l((()=>[(s(!0),f(p,null,m(i.value,(e=>(s(),a(n,{class:"song_scroll_view_item",id:"item.id",key:e.id},{default:l((()=>[t(o,{src:e.picUrl},null,8,["src"]),t(n,{class:"music_list_desc"},{default:l((()=>[t(d,{class:"text-desc"},{default:l((()=>[h(w(e.name),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])),_:1})])),_:1}),t(n,{class:"uni-common-pb"})])),_:1})}}}),[["__scopeId","data-v-c6c5a7ad"]]),$=d({__name:"Music",setup:e=>(e,a)=>(s(),f(p,null,[t(M),t(R)],64))}),W=j(d({__name:"discover",setup(e){const i=_(),r=_(0),n=_(["音乐","播客","听书"]),d=()=>{i.value.open()},k=()=>{v({url:"/pages/search/search"})};return(e,_)=>{const v=u,x=g,b=S(C("uni-drawer"),E);return s(),a(v,{class:"box"},{default:l((()=>[t(v,{class:"header"},{default:l((()=>[y("i",{class:"iconfont icon-gengduo1",onClick:d}),t(v,{class:"tab"},{default:l((()=>[(s(!0),f(p,null,m(n.value,((e,t)=>(s(),a(v,{key:e,class:c({active:t===r.value}),onClick:e=>r.value=t},{default:l((()=>[h(w(e),1)])),_:2},1032,["class","onClick"])))),128))])),_:1}),y("i",{class:"iconfont icon-sousuo",onClick:k})])),_:1}),t(x,{"scroll-y":"",class:"scroll"},{default:l((()=>[(s(),f(p,null,m(3,((e,c)=>t(v,{class:"content",key:e},{default:l((()=>[I(t(v,null,{default:l((()=>[0===c?(s(),a(v,{key:0},{default:l((()=>[t($)])),_:1})):1===c?(s(),a(v,{key:1},{default:l((()=>[t(F)])),_:1})):2===c?(s(),a(v,{key:2},{default:l((()=>[h(w(e),1)])),_:2},1024)):o("",!0)])),_:2},1536),[[U,r.value===c]])])),_:2},1024))),64))])),_:1}),t(b,{ref_key:"showLeft",ref:i,mode:"left",width:320},null,512)])),_:1})}}}),[["__scopeId","data-v-113d0c98"]]);export{W as default};