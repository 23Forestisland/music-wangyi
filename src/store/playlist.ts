import { ref, computed ,watch} from 'vue'
import { defineStore } from 'pinia'



export const useList = defineStore('ilist', () => {
    const aslist=ref()

    return {
        aslist
    }
})