
var canvas, ctx;

var pencilColor = "rgb(5,100,25)";
var pencilWidth = 2;

function init() {
    canvas = document.getElementById('main_canvas');
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", (e) => draw(e), false);
    canvas.addEventListener("mousedown", (e) => startDraw(e), false);
    canvas.addEventListener("mouseup", (e) => stopDraw(), false);
    canvas.addEventListener("mouseout", (e) => stopDraw(), false);

    //window.addEventListener('resize', resizeCanvas, false); //this will require the redraw() function
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;

    //redraw(); 
}

function changeColor() {
    pencilColor = document.querySelector("#color_picker").value;
}

function erase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("canvasimg").style.display = "none";
}


function save() {
    document.getElementById("canvasimg").style.border = "2px solid";

    var link = document.createElement("a");
    link.download = "MyDrawing.jpeg";
    link.href = canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

var flag = false;
var prevX = currX = prevY = currY = 0;

function startDraw(e) {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;

    ctx.beginPath();
    ctx.fillStyle = pencilcolor;
    ctx.fillRect(currX, currY, 2, 2);
    ctx.closePath();
}

function stopDraw() {
    flag = false;
}

function draw(e) {
    if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = pencilColor;
        ctx.lineWidth = pencilWidth;
        ctx.stroke();
        ctx.closePath();
    }
}