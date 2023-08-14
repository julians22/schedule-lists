import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dummygroupings from '@/dummy/grouping.json'



export const useGroupingsStore = defineStore('groupings', {
  state: () => ({
    groupings : dummygroupings,
    selected: {
      group: null,
    }
  }),
})