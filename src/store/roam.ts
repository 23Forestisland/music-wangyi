import { ref, computed ,watch} from 'vue'
import { defineStore } from 'pinia'
import {guessSongsApi} from '../pages/serviceSearch/'






export const useRoam = defineStore('indexr', () => {
    let  historical=ref<string[]>([])
    let  memo=ref()
    let timer:any
    const curTm=ref<string>('0:00')
    const dotleft=ref<string>()
    let tm:number
    let   totalTime=ref<string>()
    const scroll=ref<boolean>(false)
    const play=ref<boolean>(false)
    const rot=ref<number>(0)
    const listchushi=ref()
    

    // const getintSlist=async ()=>{
    //     try{
    //         const res=await guessSongsApi ()
            
    //         console.log(res)
    //         listchushi.value=res.data.dailySongs

            
    //         // store.memo=songInfo.value[songnumb.value].url
    //         // store.memo=innerAudioContext.src
            
    //     }catch(e){
    //         console.log(e)
    //     }
    // }
    // getintSlist()

    historical.value=localStorage.getItem('historical')?JSON.parse(localStorage.getItem('historical')!) :[]

    let innerAudioContext:any=null  
    innerAudioContext=uni.createInnerAudioContext()
    innerAudioContext.autoplay = true;
    // 播放器
    innerAudioContext.onPlay(()=>{//监听播放事件
        scroll.value=false
        play.value=false
        timer=setInterval(()=>{
            let curtm=Math.floor(innerAudioContext.currentTime)
            // console.log(curtm)
            let cursec= curtm%60<10?'0'+ curtm%60: curtm%60
            curTm.value=Math.floor(curtm/60)+':'+cursec
            let a =Math.floor(curtm/(tm-1)*100) + '%'
            dotleft.value=a
            if(!scroll.value){
                rot.value!+=30
                // console.log(rot.value)
            }
            // console.log(dotleft.value)
        },500)
    })
    innerAudioContext.onStop(()=>{//监听停止事件
    })
    innerAudioContext.onPause(()=>{//监听暂停事件
        clearInterval(timer)
        scroll.value=true
        play.value=true
    })
    innerAudioContext.onEnded(()=>{
    if(timer){
            clearInterval(timer)
        }
        console.log('ass')
        scroll.value=true
        console.log(scroll.value)
        play.value=true
    })
    innerAudioContext.onCanplay(()=>{
    // console.log(innerAudioContext.duration)
        tm=parseInt(innerAudioContext.duration)
        let sec=tm%60<10?'0'+tm%60:tm%60
        totalTime.value=Math.floor(tm/60) + ':'+sec
    
    })
    



    watch(memo,()=>{
        
            innerAudioContext.src=memo.value
            console.log(memo.value)
        
    },{deep:true})
    return { 
        historical,
        memo,
        innerAudioContext,
        play,
        scroll,
        rot,
        dotleft,
        curTm,
        totalTime
    }
})