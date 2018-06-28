//CONSTANTS
var canvas = document.getElementById('brickgame'),
    ctx = canvas.getContext('2d'),
    outsideSquare = 12,
    insideSquare = 10,
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

    clear (){
        ctx.clearRect(0, 0, canvas.width, canvas.height); //down s' -11, +12
        ctx.clearRect(0, 0, canvas.width, canvas.height); //+2
    }
}

//motorbike
//Lanza bullets, muere cuando toca un Obstacle
class Motorbike {
    constructor(){
        //x of strokeRect of left square
        //y of strokeRect of left square
        //x of fillRect of left square
        //y of fillRect of left square

        //initial position
        this.left_xs = canvas.width/2-11;
        this.left_ys = canvas.height-22+10;
        this.left_xf = canvas.width/2-11+2;
        this.left_yf = canvas.height-22+12;

        this.top_xs = 128;
        this.top_ys = canvas.height-23;
        this.top_xf = canvas.width/2+2;
        this.top_yf = canvas.height-21;

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
        ctx.clearRect(this.bottom_xs, this.bottom_ys, 10, 10); //down s' -11, +12
        ctx.clearRect(this.bottom_xf, this.bottom_yf, 6, 6); //+2
    }

    goLeft (){
        this.left_xs -= insideSquare+2;
        this.left_xf -= outsideSquare;

        this.top_xs -= insideSquare+2;
        this.top_xf -= outsideSquare;

        this.right_xs -= insideSquare+2;
        this.right_xf -= outsideSquare;

        this.bottom_xs -= insideSquare+2;
        this.bottom_xf -= outsideSquare;

        this.clear();
        board.draw();
        o.draw();
        this.draw();
    }

    goRight (){
        this.left_xs += insideSquare+2;
        this.left_xf += outsideSquare;

        this.top_xs += insideSquare+2;
        this.top_xf += outsideSquare;

        this.right_xs += insideSquare+2;
        this.right_xf += outsideSquare;

        this.bottom_xs += insideSquare+2;
        this.bottom_xf += outsideSquare;
        
        this.clear();
        board.draw();
        o.draw();
        this.draw();
    }
    attack () {
        // alert("pium, pium");
        b.draw();
    }
}

//Cae desde arriba y cuando toca a Motorbike es game over
class Obstacle {
    constructor(){
        this.ys = 10;
        this.yf = 6;
    }

    draw () {
        //random initial position
        // ctx.fillRect(random, this.y+3, 10, 10);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeRect(random, this.ys, 10, 10); //outside
        ctx.fillRect(random+2, this.yf+6, 6, 6); //inside
        ctx.closePath();
    }

    falls () { // decrease Y
        setInterval(function(){
            this.ys -= insideSquare+2;
            this.yf -= outsideSquare;
        },1000/20);
    }
}

class Bullet {
    constructor(){}
    draw () {
        //random initial position
        // ctx.fillRect(random, this.y+3, 10, 10);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeRect(random, this.ys, 10, 10); //outside
        ctx.fillRect(random+2, this.yf+6, 6, 6); //inside
        ctx.closePath();
    }
}


//INSTANCES
var board = new Board();
var o = new Obstacle();
var m = new Motorbike();
var b = new Bullet();

//FUNCTIONS
function update(){
    board.draw();
    m.draw();
    o.draw();
    o.falls();
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
    case 38:
        m.attack();
        break;
    }
});

update();