<template>
    <div class="ma-3">
        <canvas ref="canvasEl" id="canvas-id-el" width="800" height="600"></canvas>
    </div>
</template>

<script setup>
import { fabric } from 'fabric'
import { useWorkspaceStore } from '@/stores/workspace';

const canvasEl = ref(null);
const ws = useWorkspaceStore();

//https://excalidraw.com/
// localStorage.setItem('categories', JSON.stringify(state.categories));
// state.categories = JSON.parse(localStorage.categories)

onMounted(() => {
    resizeCanvas();
    ws.canvas = markRaw(new fabric.Canvas(canvasEl.value, { 
        isDrawingMode: true,
        backgroundColor: 'white',
        
    }));

    // capture strokes when drawn
    ws.canvas.on('path:created', (e) => {
        ws.currentLayer.strokes.push(markRaw(e.path));
    });
});

function resizeCanvas() {
    canvasEl.value.width = window.innerWidth - 335;
    canvasEl.value.height = window.innerHeight * 0.92;
    //redraw(); 
}

</script>


<style scoped>
canvas {
    background-color: white;
    border: 2px solid #b4b4b4;
}
</style>