import { defineStore } from 'pinia'

export const useWorkspaceStore = defineStore('counter', {
    state: () => ({
        pencil: {
            color: "a0efd",
            width: 2
        }, 
        tool: "pencil",
        canvas: null,
        strokes: []
    }),
    getters: {
    //   doubleCount: (state) => state.count * 2,
    },
    actions: {
      increment() {
        this.count++
      }
    }
});
