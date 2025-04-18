canvas = document.getElementById("canvas")
ctx = canvas.getContext('2d')

var spacepressed = false

document.body.onkeydown = function(e) { //checks for pressed keys
    switch(e.keyCode) {
        case 32: // S 
            spacepressed = true;
            break;
    }
}

var ball = {
    x: 250,
    y: 250,
    w: 25,
    h: 25,

    update() {
        ctx.fillStyle = "green";
        ctx.fillRect(ball.x, ball.y, ball.w, ball.h);
    },
}

var hole = {
    x: Math.floor(Math.random() * 476),
    y: Math.floor(Math.random() * 476),
    w: 5,
    h: 5,

    update(){
        ctx.fillStyle = "black";
        ctx.fillRect(hole.x - 10, hole.y - 10, hole.w + 20, hole.h + 20);
    },
}

var RRcollide = function(x1, x2, y1, y2, w1, w2, h1, h2){ //rect-rect colliding
    if (x1 + w1>= x2 && x1<= x2 + w2 && y1 + h1>= y2 && y1<= y2 + h2) {
        return true;
    }
}

var shots = 0;

var update = function(){
    ctx.clearRect(0, 0, 500, 500);
    ball.update();
    hole.update();

    if (spacepressed == true) {
        shots++;
        spacepressed = false;
        ball.x = Math.floor(Math.random() * 476);
        ball.y = Math.floor(Math.random() * 476);
        if (RRcollide(ball.x, hole.x, ball.y, hole.y, ball.w, hole.w, ball.h, hole.h)) {
            ctx.clearRect(0, 0, 500, 500);
            ball.update();
            hole.update();
            alert("YOU WIN!!! You took " + shots + " shots!");
            throw new Error("Stopped here");
        }
    }

    window.requestAnimationFrame(update);
};

window.requestAnimationFrame(update);