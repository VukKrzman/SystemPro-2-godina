var canvas = document.getElementById("bganimacija");
var brush = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var circleCount = 1000;
var circles = [];
var maxDistance = 100;

for (var i = 0; i < circleCount; i++) {
    circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        r: Math.random() * 5 + 1,
        color: "#FFFFFF"
    });
}

canvas.addEventListener("mousemove", input);
var m = { x: 0, y: 0 };
function input(e) {
    m.x = e.layerX;
    m.y = e.layerY;
}

function update() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].x += circles[i].vx;
        circles[i].y += circles[i].vy;
        if (circles[i].x < 0) {
            circles[i].x = 0;
            circles[i].vx *= -1;
        }
        if (circles[i].y < 0) {
            circles[i].y = 0;
            circles[i].vy *= -1;
        }
        if (circles[i].x > canvas.width) {
            circles[i].x = canvas.width;
            circles[i].vx *= -1;
        }
        if (circles[i].y > canvas.height) {
            circles[i].y = canvas.height;
            circles[i].vy *= -1;
        }
    }
}

function draw() {
    for (var i = 0; i < circles.length; i++) {
        var x = circles[i].x;
        var y = circles[i].y;
        var r = circles[i].r;
        brush.beginPath();
        brush.arc(x, y, r, 0, 2 * Math.PI);
        brush.fillStyle = circles[i].color;
        brush.fill();
    }
    connectParticles();
}

function connectParticles() {
    for (var i = 0; i < circles.length; i++) {
        for (var j = i + 1; j < circles.length; j++) {
            var distance = Math.sqrt(
                (circles[i].x - circles[j].x) ** 2 +
                (circles[i].y - circles[j].y) ** 2
            );

            if (distance < maxDistance) {
                var opacity = 1 - (distance / maxDistance);
                brush.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                brush.lineWidth = 2 * (1 - distance / maxDistance);
                brush.beginPath();
                brush.moveTo(circles[i].x, circles[i].y);
                brush.lineTo(circles[j].x, circles[j].y);
                brush.stroke();
            }
        }
    }
}

setInterval(() => {
    brush.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
}, 16);
