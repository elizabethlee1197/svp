var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

var obstcale1, obstacle2, obstacle;

var coin;

var obstacleGroup; var coinGroup;

var obstacle1_img, obstacle2_img;
var coin_img;

var count;
var lives;
var score;

var players;


function preload(){
  track = loadImage("../images/track.jpg");
  car1_img = loadImage("../images/car1.png");
  car2_img = loadImage("../images/car2.png");
  car3_img = loadImage("../images/car3.png");
  car4_img = loadImage("../images/car4.png");
  ground = loadImage("../images/ground.png");

  obstacle1_img=loadImage("../images/obstacle1.png");
  obstacle2_img=loadImage("../images/obstacle2.png");
  obstacleGroup= new Group();

  coin_img=loadImage("../images/coin.png");
  coinGroup=new Group();

  //carSound = loadSound("carsound.mp3");
  crashSound = loadSound("crashsound.mp3");
  coinSound  = loadSound("coinsound.mp3");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);

  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
