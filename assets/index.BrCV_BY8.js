import{I as a}from"./index-DlNOth4X.js";const e=({url:e,method:t="GET",data:l={},header:s={}})=>new Promise(((d,i)=>{a({url:"http://121.89.213.194:5001"+e,method:t,data:l,header:s,success:a=>{d(a)},fail:i})})),t="https://zyxcl.xyz/music/api",l=({url:e,data:t})=>new Promise(((l,s)=>{a({url:e,data:t,success:a=>{l(a.data)},fail:s})})),s=()=>l({url:`${t}/banner`}),d=()=>e({url:"/topic/detail/event/hot?actid=111551188"}),i=()=>e({url:"/user/followeds?uid=416608258"}),r=()=>l({url:`${t}/personalized`,data:{limit:6}}),o=()=>l({url:`${t}/homepage/block/page`}),u=()=>l({url:`${t}/toplist/detail`}),c=({id:a})=>l({url:`${t}/playlist/detail`,data:{id:a}});export{o as a,r as b,u as c,d,i as e,c as f,s as g};
