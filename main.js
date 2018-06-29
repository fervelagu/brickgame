//CONSTANTS
var canvas = document.getElementById('brickgame'),
    ctx = canvas.getContext('2d'),
    obstacles = [];
    // bullets = [];
    frames = 0,
    outsideSquare = 12,
    insideSquare = 10,
    score = 0,
    level = 0,
    max = canvas.width - 20,
    interval = 0;

//CLASSES
class Board {
    constructor(){
    }

    draw () {
        //draws score and speed texts
        // ctx.font = '18px white VT323';
        // ctx.fillText('Hello world', 5, 5);
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

//motorbike
//Lanza bullets, muere cuando toca un Obstacle
class Motorbike {
    constructor(){
        this.bullets = [];
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

        //another bliss fu... hack
        this.width = 30;
        this.height = 10;

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

    goLeft (){
        this.left_xs -= insideSquare+2;
        this.left_xf -= outsideSquare;

        this.top_xs -= insideSquare+2;
        this.top_xf -= outsideSquare;

        this.right_xs -= insideSquare+2;
        this.right_xf -= outsideSquare;

        this.bottom_xs -= insideSquare+2;
        this.bottom_xf -= outsideSquare;
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
    }

    checkIfTouch(item){
        this.x = this.left_xs;
        this.y = this.left_ys;
        item.x = item.ran;
        item.y = item.ys;
        //console.log(this.x,this.y);
        var collition = (this.x < item.x + item.width) && 
                        (this.x + this.width > item.x) && 
                        (this.y < item.y + item.height) && 
                        (this.y + this.height > item.y);
        console.log(collition);
        return  collition;
    }
}

//Cae desde arriba y cuando toca a Motorbike es game over
class Obstacle {
    constructor(){
        this.ys = 10;
        this.ran = random();
        this.yf = 12;
        //bliss hack
        this.width = 10;
        this.height = 10;
    }

    draw () {
        //random initial position
        // ctx.fillRect(random, this.y+3, 10, 10);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeRect(this.ran, this.ys, 10, 10); //outside
        ctx.fillRect(this.ran+2, this.ys+2, 6, 6); //inside
        ctx.closePath();

        this.ys += insideSquare;
        this.yf += outsideSquare-2;
    }
}

class Bullet {
    constructor(character){
        this.width = 10;
        this.height = 10;
        this.x = character.x + character.width/2 - this.width/2;
        this.y = character.y - this.height;
        this.speed = -10;
    }

    draw () {
        this.y += this.speed;
        //random initial position
        // ctx.fillRect(random, this.y+3, 10, 10);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.strokeRect(this.x, this.y, 10, 10); //outside
        ctx.fillRect(this.x+2, this.y+2, 6, 6); //inside
        ctx.closePath();

        // this.ys += insideSquare;
        // this.yf += outsideSquare-2;
    }
    isTouching(item){
        item.x = item.ran;
        item.y = item.ys;
        return (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.width > item.y);
    }
}

//INSTANCES
var board = new Board();
var m = new Motorbike();

//FUNCTIONS
function startGame(){
    frames = 0;
    obstacles = [];
    board = new Board();
    m = new Motorbike();
    interval = setInterval(update, 1000/60)
}

function random () {
    return Math.floor(Math.random() * (max));
}

function generateObstacles () {
    var o = new Obstacle();
    obstacles.push(o);
}

function generateBullets (){
    var b = new Bullet(m);
    m.bullets.push(b);
}

function drawObstacles () {
    obstacles.forEach(function(o){
        o.draw();
    });
}

function drawBullets () {
    m.bullets.forEach(function(b){
        b.draw();
    });
}

function checkObstacleCollitionWithBike(){
    obstacles.forEach(function(o){
        if(m.checkIfTouch(o)){
            gameOver();
        }
    })
}

function checkObstacleWithBullets(){
    m.bullets.forEach(function(b){
        obstacles.forEach(function(o){
            if(b.isTouching(o)){
                obstacles.splice(obstacles.indexOf(o),1)
                m.bullets.splice(m.bullets.indexOf(b),1)
                // document.getElementById('score').innerHTML = 'score: ' + score++;
                document.getElementById('score').innerHTML = 'score: ' + ++score;
        }  
        })
    })
}

function update(){
    frames++;
    checkObstacleWithBullets();
    checkObstacleCollitionWithBike();
    random();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    m.draw();
    if (frames%10 === 0){
        generateObstacles();
    }
    drawObstacles();
    drawBullets();

}

function gameOver(){
    clearInterval(interval);
    document.getElementById('start').innerHTML = '..::GAME OVER::.. <br> ..::ESC to restart::..';
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
        generateBullets();
        break;
    }
});

addEventListener("keydown", function(e){
    if(e.keyCode === 27){
      startGame();
    }
});

startGame();