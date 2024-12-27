import { defineStore } from 'pinia'

export const useWorkspaceStore = defineStore('counter', {
    state: () => ({
        tool: "pencil",
        canvas: null
    }),
    getters: {
        //   doubleCount: (state) => state.count * 2,
    },
    actions: {
        setTool(tool) {
            if(this.tool == "text") this.canvas.off("mouse:down", this.enterTextEdit);
            this.tool = tool;
            this.canvas.isDrawingMode = this.tool == "pencil";
            if(this.tool == "text") this.canvas.on("mouse:down", this.enterTextEdit);
        },
        enterTextEdit(event) {
            const pointer = this.canvas.getPointer(event.e);

            const text = new fabric.IText("", {
                left: pointer.x,
                top: pointer.y,
                fontSize: 20,
                fill: this.canvas.freeDrawingBrush.color,
                editable: true
            });

            this.canvas.add(text).setActiveObject(text);
            text.enterEditing(); 
        }
    }
});
