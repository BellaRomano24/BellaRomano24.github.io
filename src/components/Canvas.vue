<template>
    <div class="ma-3">
        <canvas ref="main_canvas"></canvas>
    </div>
</template>

<script setup>
import { useWorkspaceStore } from '@/stores/workspace';

const ws = useWorkspaceStore();

const canvas = useTemplateRef('main_canvas');
const pencil = computed(() => ws.pencil );

onMounted(() => {
    init();
    ws.canvas = canvas;
});

var ctx;
function init() {
    ctx = canvas.value.getContext("2d");

    canvas.value.addEventListener("mousemove", (e) => draw(e));
    canvas.value.addEventListener("mousedown", (e) => startDraw(e));
    canvas.value.addEventListener("mouseup",   (e) => stopDraw());
    canvas.value.addEventListener("mouseout",  (e) => stopDraw());

    //window.addEventListener('resize', resizeCanvas, false); //this will require the redraw() function
    resizeCanvas();
}

//https://excalidraw.com/
// localStorage.setItem('categories', JSON.stringify(state.categories));
// state.categories = JSON.parse(localStorage.categories)

function resizeCanvas() {
    canvas.value.width = window.innerWidth - 120;
    canvas.value.height = window.innerHeight * 0.9;
    //redraw(); 
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeDrawing() {
    if (!this.imageData) return;

    // Clear the canvas
    this.context.clearRect(0, 0, canvas.value.width, canvas.value.height);

    // Apply scaling transformation
    this.context.save(); // Save the current state
    this.context.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, 0, 0); // Scale the drawing
    this.context.putImageData(this.imageData, 0, 0); // Draw scaled image data
    this.context.restore(); // Restore the state to remove scaling for future drawing

    // Optionally: store the scaled image data back
    this.imageData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
}

var isDrawing = false;

function startDraw(e) {
    ctx.strokeStyle = pencil.value.color;
    ctx.lineWidth = pencil.value.width;
    let x = e.clientX - canvas.value.offsetLeft;
    let y = e.clientY - canvas.value.offsetTop;
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawing = true;
}

function stopDraw() {
    ctx.closePath();
    isDrawing = false;
}

function draw(e) {
    if (isDrawing) {
        let x = e.clientX - canvas.value.offsetLeft;
        let y = e.clientY - canvas.value.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
</script>


<style scoped>
canvas {
    background-color: white;
    border: 2px solid #b4b4b4;
    /* width: 100%;
    height: 100%; */
}
</style>