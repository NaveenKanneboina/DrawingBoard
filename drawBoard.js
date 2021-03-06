const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = window.innerHeight - 200;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black"
let draw_width = "2"
let is_drawing = false;
let restore_array = [];


function changeColor(col) {
    draw_color = col;
}


canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);


canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
// canvas.addEventListener("mouseout", stop, false);

function start(event) {
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    event.preventDefault();

}

function draw(event) {
    if (is_drawing) {
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.strokeStyle = draw_color;
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }
}

function stop(event) {
    if (is_drawing) {
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    event.preventDefault();

    // if(event.type != "mouseout"){
    //     restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    //     index += 1;
    // }

    restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    
}
function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
}

function undo() {
    if (restore_array.length <= 1) {
        clearCanvas()
    }
    else {
        restore_array.pop();
        ctx.putImageData(restore_array[restore_array.length - 1], 0, 0)
    }
}