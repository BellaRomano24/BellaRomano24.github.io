import { defineStore } from 'pinia'

export const useWorkspaceStore = defineStore('counter', {
    state: () => ({
        tool: "pencil",
        layers: ['Layer 0'],
        currentLayer: 0,
        canvas: null,
        strokes: [] //Array<Object(path, layer)
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
        },
        addLayer() {
            this.layers.push('Layer ' + this.layers.length);
            this.currentLayer = this.layers.length -1;
        },
        removeLayer(index) {
            this.strokes.forEach(e => {
                if(e.layer === index) {
                    this.canvas.remove(e.path.path);
                }
            });
            this.strokes = this.strokes.filter(e => e.layer != index); //remove all strokes on this layer
            this.layers.splice(index, 1); //remove layer
            if(this.currentLayer === index) {
                this.currentLayer = this.layers.length - 1;
            }
        },
        recordStroke(path) {
            this.strokes.push({path, layer: this.currentLayer});
        }
    }
});
