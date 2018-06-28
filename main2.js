//CONSTANTS
var canvas = document.getElementById('brickgame'),
    ctx = canvas.getContext('2d'),
    score = 0,
    level = 0,
    max = canvas.width - 20,
    random = Math.floor(Math.random() * (max));

//CLASSES
class Board {
    constructor(){
    }

    draw () {
        //draws canvas with background color #a4b6ad
        ctx.fillStyle = "#a4b6ad";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var x = 0; x < canvas.width; x++){
            for (var y = 0; y < canvas.height; y++){
            //draws grid
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(x * 20, y * 20, 18, 18);
            //draws squares as borders
            ctx.fillStyle = "#a4b6ad";
            ctx.fillRect(x * 20 + 2, y * 20 + 2, 14, 14);
            //draws squares inside the borders, the filling squares
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(x * 20 + 4, y * 20 + 4, 10, 10);
            }
        }
    }
}

//Cae desde arriba y cuando toca a Motorbike es game over
class Obstacle {
    constructor(y){
        this.y = y;
    }

    draw () {
        ctx.fillStyle = "black";
        ctx.fillRect(random, this.y+3, 12, 12);
    }

    falls () {
        setInterval(function(){
            if(aux%2 === 0) ctx.fillRect(random, this.y+3, 12, 12);
            else ctx.clearRect(0,0,50,50);
            aux++;
          },1000/20);
    }
}

//bullet
//Motorbike avienta bullets que cuando tocan a Obstacle este desaparece
class Bullet {
    constructor() { //strokex,strokey,fillx,filly(?
        this.xs = 6;
        this.ys = 6;
        this.xf = 8;
        this.yf = 8;
    }

    draw (){
        ctx.strokeRect(this.xs, this.ys, 10, 10); //outside
        ctx.fillRect(this.xf, this.yf, 6, 6); //inside
    }

}

//motorbike
//Lanza bullets, muere cuando toca un Obstacle
class Motorbike {
    constructor(){
        this.left_xs = canvas.width/2-11;
        this.left_ys = canvas.height-22+10;
        this.left_xf = canvas.width/2-11+2;
        this.left_yf = canvas.height-22+12;

        this.top_xs = canvas.width/2;
        this.top_ys = canvas.height-33+10;
        this.top_xf = canvas.width/2+2;
        this.top_yf = canvas.height-33+12;

        this.right_xs = canvas.width/2+11;
        this.right_ys = canvas.height-22+10;
        this.right_xf = canvas.width/2-11+24;
        this.right_yf = canvas.height-22+12;

        this.bottom_xs = canvas.width/2;
        this.bottom_ys = canvas.height-33+21;
        this.bottom_xf = canvas.width/2+2;
        this.bottom_yf = canvas.height-33+23;
    }

    draw () {
        ctx.beginPath();
        ctx.fillStyle = "black";
        //left
        ctx.strokeRect(this.left_xs, this.left_ys, 10, 10); //left s' -11, -22
        ctx.fillRect(this.left_xf, this.left_yf, 6, 6); //+2
        //top
        ctx.strokeRect(this.top_xs, this.top_ys, 10, 10); //top s' -11, +12
        ctx.fillRect(this.top_xf, this.top_yf, 6, 6); //+2
        //right
        ctx.strokeRect(this.right_xs, this.right_ys, 10, 10); //right s' -11, +12
        ctx.fillRect(this.right_xf, this.right_yf, 6, 6); //+2
        //bottom
        ctx.strokeRect(this.bottom_xs, this.bottom_ys, 10, 10); //down s' -11, +12
        ctx.fillRect(this.bottom_xf, this.bottom_yf, 6, 6); //+2
        ctx.closePath();
    }

    clear (){
        // //left
        // ctx.clearRect(this.left_xs, this.left_ys, 10, 10); //left s' -11, -22
        // ctx.fillRect(this.left_xf, this.left_yf, 6, 6); //+2
        // //top
        // ctx.clearRect(this.top_xs, this.top_ys, 10, 10); //top s' -11, +12
        // ctx.fillRect(this.top_xf, this.top_yf, 6, 6); //+2
        // //right
        // ctx.clearRect(this.right_xs, this.right_ys, 10, 10); //right s' -11, +12
        // ctx.fillRect(this.right_xf, this.right_yf, 6, 6); //+2
        // //bottom
        // ctx.clearRect(this.bottom_xs, this.bottom_ys, 10, 10); //down s' -11, +12
        // ctx.fillRect(this.bottom_xf, this.bottom_yf, 6, 6); //+2
    }

    goLeft (){
        console.log("LEFT!");
        // this.left_xs = this.left_xs -11;
        // this.left_ys = this.left_ys -22+10;
        // this.left_xf = this.left_xf -11+2;
        // this.left_yf = this.left_yf -22+12;

        // this.top_xs = this.top_xs;
        // this.top_ys = this.top_ys;
        // this.top_xf = this.top_xs;
        // this.top_yf = this.top_yf;

        // this.right_xs = canvas.width/2+11;
        // this.right_ys = canvas.height-22+10;
        // this.right_xf = canvas.width/2-11+24;
        // this.right_yf = canvas.height-22+12;

        // this.bottom_xs = canvas.width/2;
        // this.bottom_ys = canvas.height-33+21;
        // this.bottom_xf = canvas.width/2+2;
        // this.bottom_yf = canvas.height-33+23;
        this.draw();
        // this.clear();
    }
    goRight (){
        console.log("RIGHT!");
    }
    attack () {
        console.log("ATTACK!");
    }
}

//INSTANCES
var board = new Board();
var o = new Obstacle(0);
var m = new Motorbike();

//FUNCTIONS
function update(){
    board.draw();
    o.draw();
    m.draw();
}

//LISTENERS
addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 37:
        m.goLeft();
        break;
    case 39:
        m.goRight();
        break;
    }
});

update();