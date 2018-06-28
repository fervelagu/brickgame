//CONSTANTS
var canvas = document.getElementById('brickgame'),
    ctx = canvas.getContext('2d'),
    x = 0,
    y = 0,
    score = 0,
    level = 0,
    input = true,
    dir = 'LR';
    // images = {
    //     moti: url('./moti.png'),
    // }

//CLASSES
//board
function Board(){
    //draws canvas with background color #a4b6ad
    ctx.fillStyle = "#a4b6ad";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (x = 0; x < canvas.width; x++){
        for (y = 0; y < canvas.height; y++){
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

//obstacle
var max = canvas.width - 20;
var aux = 0;
var random = Math.floor(Math.random() * (max));
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
        
    // touches () {
    //     if () {
    //         ctx.clearRect(random, this.y+3, 12, 12);
    //     }
    // }
        //var random = Math.floor(Math.random() * (this.max));
        //     ctx.fillStyle = "black";
        //     ctx.fillRect(random, this.y+3, 12, 12);
        //     ctx.clearRect(random, this.y+3, 12, 12);
        //     random+=1;
        // }, 1000/60);


}

//bullet
//Motorbike avienta bullets que cuando tocan a Obstacle este desaparece
function Bullet(strokex,strokey,fillx,filly) {
    this.strokex = strokex ? strokex : 6;
    this.strokey = strokey ? strokey : 6;
    this.fillx = fillx ? fillx : 8;
    this.filly = filly ? filly : 8;
    ctx.strokeRect(this.strokex, this.strokey, 10, 10); //outside
    ctx.fillRect(this.fillx, this.filly, 6, 6); //inside
}

class Ball{
    constructor(){
        this.x = 100;
        this.y = 100;
        this.radius = 10;
        this.color = "yellow";
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
        ctx.closePath();
    }
}

//motorbike
//Lanza bullets, muere cuando toca un Obstacle
function Motorbike(){
    //this.strokex=canvas.width/2;
    //this.strokey=canvas.height +12;
    //this.fillx=;
    //this.filly=;
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.strokeRect(canvas.width/2, canvas.height-33+10, 10, 10); //top s' -11, +12
    ctx.fillRect(canvas.width/2+2, canvas.height-33+12, 6, 6); //+2
    ctx.strokeRect(canvas.width/2-11, canvas.height-22+10, 10, 10); //left s' -11, -22
    ctx.fillRect(canvas.width/2-11+2, canvas.height-22+12, 6, 6); //+2
    ctx.strokeRect(canvas.width/2+11, canvas.height-22+10, 10, 10); //right s' -11, +12
    ctx.fillRect(canvas.width/2-11+24, canvas.height-22+12, 6, 6); //+2
    ctx.closePath();

    this.attack = function(){};
    this.goLeft = function(){};
    this.goRight = function(){};
}

// function Moto(){
//     this.x = 100;
//     this.y = 100;
//     this.width = 70;
//     this.height = 50;
//     this.img = new Image()
//     this.img.src = images.moti;
//     this.img.onload = function(){
//       this.draw();
//     }.bind(this);
//     this.draw = function(){
//       ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
//     }
//   }

//INSTANCES
var o = new Obstacle(20);
var b = new Ball();

//FUNCTIONS
function update(){
    Board();
    //o.falls();
    o.draw();
    Motorbike();
}

//LISTENERS
// addEventListener("keydown", function (e) {
//   switch (e.keyCode) {
//     case 37:
//       this.goLeft();
//       break;
//     case 39:
//       this.goRight();
//       break;
//   }
// });

update();