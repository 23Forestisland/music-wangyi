import { ref, computed ,watch} from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('indexr', () => {
    let  historical=ref<string[]>([])
    historical.value=localStorage.getItem('historical')?JSON.parse(localStorage.getItem('historical')!) :[]
    return { 
        historical
    }
})

