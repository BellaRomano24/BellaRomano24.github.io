import { defineStore } from 'pinia'

export const useWorkspaceStore = defineStore('workspace', {
    state: () => ({
        tool: "pencil",
        layers: [{
            name: 'Layer 0',
            strokes: [], //paths
            visible: true
        }],
        cLayIdx: 0, // current layer index
        canvas: null,
        shapes: []
    }),
    getters: {
        //   doubleCount: (state) => state.count * 2,
        currentLayer(state) { return this.layers[this.cLayIdx]}
    },
    actions: {
        setTool(tool) {
            if(this.tool == "text") this.canvas.off("mouse:down", this.enterTextEdit); // was
            this.tool = tool;
            this.canvas.isDrawingMode = this.tool == "pencil";
            if(this.tool == "text") this.canvas.on("mouse:down", this.enterTextEdit); // is
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
            this.currentLayer.strokes.push(text);

            this.canvas.add(text).setActiveObject(text);
            text.enterEditing(); 
        }
    }
});
