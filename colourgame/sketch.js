// Colour Game
// Katychen
// 2018/9/24
// Extra for Experts:add some sound to my project
// Added the background music and other sound affect, using for loop to draw rectangle.

let restart = false;
let timer = 60;
let score = 0;
let volume = 0.5;
let coordinateX = [];
let coordinateY = [];
let red, green, blue;
let addOrSubtract;
let r,g,b;
let changeRGB;
let nr,ng,nb;
let gameOver = false;
let backgroundMusic;
let sound;
let gameOverSound;
let correct;
let rectPlace;
let diff;
let size;

function preload() {
  backgroundMusic = loadSound("assets/back.mp3");
  sound = loadSound("assets/wrong.wav");
  correct = loadSound("assets/correct.wav");
  gameOverSound = loadSound("assets/gameover.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  backgroundMusic.loop();
}

function draw() {
  rectMode(CENTER);
  if (!gameOver){
    background(220);
    fill(red,green,blue);
    page();
    if (!restart){
      red = round(random(225));
      green = round(random(225));
      blue = round(random(225));
      r = round(random(30,35));
      g = round(random(30,35));
      b = round(random(30,35));
      changeRGB = round(random(1,3));
      addOrSubtract = round(random(1,2));
      rectPlace = round(random(0,coordinateX.length));
      addOrSub();
      restart = true;
    }
    fill(0);
    textSize(15/400*width);
    dscore();
    countDown();
    difColour();
    find();
    off();
  }
}

// change volume using up and down arrow
function keyPressed() {
  if (keyCode === 38) {
    volume = volume + 0.1;
    backgroundMusic.setVolume(volume);
  }
  else if(keyCode === 40){
    volume = volume - 0.1;
    backgroundMusic.setVolume(volume);
  }

}

// gameover when time equals 0
function off(){
  if(timer <= 0){
    gameOverSound.play();
    gameOver = true;
    backgroundMusic.pause();
    background(220);
    fill(0);
    textSize(32/400*width);
    textAlign(CENTER);
    text("You have scored:"+" "+ score,width/2,height/2);
  }
}

// draw rectangles using for loop depends on window size
function page() {
  noStroke();
  diff = 60/400* width/3;
  size = 55/400* width/3;
  for (let x = diff; x < width- size; x = x + diff) {
    for (let y = diff + 20/400*width; y < height- diff; y= y + diff) {
      rect(x, y, size, size, 10);
      if (restart){
        append(coordinateX, x);
        append(coordinateY, y);
      }
    }
  }
}

// get a random position and color it different
function find(){
  fill(nr,ng,nb);
  rect(coordinateX[rectPlace],coordinateY[rectPlace], size, size, 10);
  console.log(coordinateX[rectPlace],coordinateY[rectPlace]);
}

// when click on different color change to next stage
function mousePressed() {
  if (!gameOver){
    let currentColor = get(mouseX, mouseY);
    if(String(currentColor) !== "220,220,220,255"){
      if (mouseY > diff + 20){
        if(abs(red - currentColor[0])<= 35 && abs(red - currentColor[0])>= 30 || abs(green - currentColor[1])<= 35 && abs(green - currentColor[1])>= 30 || abs(blue - currentColor[2])<=35 && abs(blue - currentColor[2])>= 30){
          correct.play();
          score = score +1;
          restart = false;
        }
        else{
          sound.play();
          timer = timer -5;
        }
      }
    }
  }
}


function addOrSub(){
  if(addOrSubtract === 2 && red > 35){
    r = r * -1;
  }
}

function difColour(){
  if(changeRGB === 1){
    nr = red + r;
    nb = blue;
    ng = green;
  }
  else if(changeRGB === 2){
    nr = red;
    nb = blue + b;
    ng = green;
  }
  else {
    nr = red;
    nb = blue;
    ng = green + g;
  }
}

function dscore(){
  textAlign(LEFT);
  text("SCORE:"+" "+ score, 20/400*width, 40/400*height);

}

function countDown(){
  textAlign(RIGHT);
  text("TIME:"+" "+ timer, 380/400*width, 40/400*height);
  if (frameCount % 60 === 0 && timer > 0) {
    timer --;
  }
}
