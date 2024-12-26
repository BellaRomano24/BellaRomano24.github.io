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
    // canvas = document.getElementById('main_canvas');
    // canvas = ws.canvas;
    ctx = canvas.value.getContext("2d");

    canvas.value.addEventListener("mousemove", (e) => draw(e));
    canvas.value.addEventListener("mousedown", (e) => startDraw(e));
    canvas.value.addEventListener("mouseup",   (e) => stopDraw());
    canvas.value.addEventListener("mouseout",  (e) => stopDraw());

    //window.addEventListener('resize', resizeCanvas, false); //this will require the redraw() function
    resizeCanvas();
    // changeColor()
}

//https://excalidraw.com/
// localStorage.setItem('categories', JSON.stringify(state.categories));
// state.categories = JSON.parse(localStorage.categories)

function resizeCanvas() {
    canvas.value.width = window.innerWidth - 120;
    canvas.value.height = window.innerHeight * 0.9;

    //redraw(); 
}

// function changeColor() {
//     pencilColor = document.querySelector("#color_picker").value;
// }

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var flag = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;

function startDraw(e) {
    currX = e.clientX - canvas.value.offsetLeft;
    currY = e.clientY - canvas.value.offsetTop;
    flag = true;
}

function stopDraw() {
    flag = false;
}

function draw(e) {
    if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.value.offsetLeft;
        currY = e.clientY - canvas.value.offsetTop;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = pencil.value.color;
        ctx.lineWidth = pencil.value.width;
        ctx.stroke();
        ctx.closePath();
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