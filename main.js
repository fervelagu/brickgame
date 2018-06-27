//CONSTANTS
var canvas = document.getElementById('brickgame'),
    ctx = canvas.getContext('2d'),
    x = 0,
    y = 0,
    score = 0,
    level = 0,
    input = true,
    dir = 'LR';

//CLASSES
//board
function Board () {
    //draws all board with background color #a4b6ad
    ctx.fillStyle = "#a4b6ad";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
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
//Cae desde arriba y cuando toca a Motorbike es game over
function Obstacle () {
    this.strokey = 4;
    this.filly = 8;
    this.max = canvas.width - 20;
    var random = Math.floor(Math.random() * (max));
    ctx.strokeRect(random, strokey, 10, 10); //outside s'
    ctx.fillRect(random+2, filly, 6, 6); //inside s'
}

//bullet
//Motorbike avienta bullets que cuando tocan a Obstacle este desaparece
function Bullet (strokex,strokey,fillx,filly) {
    this.strokex = strokex ? strokex : 6;
    this.strokey = strokey ? strokey : 6;
    this.fillx = fillx ? fillx : 8;
    this.filly = filly ? filly : 8;
    ctx.strokeRect(this.strokex, this.strokey, 10, 10); //outside
    ctx.fillRect(this.fillx, this.filly, 6, 6); //inside
}

//motorbike
//Lanza bullets, muere cuando toca un Obstacle
function Motorbike () {
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

    this.attack = function(){}
    this.goLeft = function(){}
    this.goRight = function(){}
}

//INSTANCES

//MAIN FUNCTIONS
function update(){
    Board();
    Obstacle();
    Motorbike();
    //Bullet(650,150,652,152);
}

//AUX FUNCTIONS

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