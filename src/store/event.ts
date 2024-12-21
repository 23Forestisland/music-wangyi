import { ref, computed ,watch} from 'vue'
import { defineStore } from 'pinia'

export const useEvents = defineStore('indexr', () => {



    const goDetail=(id:number,name:string,url:string)=>{
        uni.navigateTo({
        url: `/pages/detail/detail?id=${id}&name=${name}&url=${url}`
        })
    }
    return {
        goDetail
    }

})
