
var canvas, ctx;

var pencilColor = "";
var pencilWidth = 2;

function init() {
    canvas = document.getElementById('main_canvas');
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", (e) => draw(e));
    canvas.addEventListener("mousedown", (e) => startDraw(e));
    canvas.addEventListener("mouseup",   (e) => stopDraw());
    canvas.addEventListener("mouseout",  (e) => stopDraw());

    //window.addEventListener('resize', resizeCanvas, false); //this will require the redraw() function
    resizeCanvas();
    changeColor()
}

function resizeCanvas() {
    canvas.width = window.innerWidth - 120;
    canvas.height = window.innerHeight * 0.9;

    //redraw(); 
}

function changeColor() {
    pencilColor = document.querySelector("#color_picker").value;
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function save() {
    var link = document.createElement("a");
    link.download = "MyDrawing.png";
    link.href = canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

var flag = false;
var prevX = currX = prevY = currY = 0;

function startDraw(e) {
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    flag = true;
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