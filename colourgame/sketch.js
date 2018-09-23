// Project Title
// Your Name
// Date
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let restart = 0;
let hap =0;
let timer = 60;
let score = 0;
let squ = ["a","b","c","d","e","f","a1","b1","c1","d1","e1","f1","a2","b2","c2","d2","e2","f2","a3","b3","c3","d3","e3","f3","a4","b4","c4","d4","e4","f4"];
let coordinateX = [];
let coordinateY = [];
let red, green, blue;
let aors;
let r,g,b;
let crgb;
let nr,ng,nb;
let gameOver = 0;
let backgroundMusic;
let sound;
let gameOverSound;
let correct;
let i;
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
  backgroundMusic.play();
}

function draw() {
  if (gameOver === 0){
    background(220);
    fill(red,green,blue);
    page();
    if (restart === 0){
      i = round(random(0,29));
      red = round(random(225));
      green = round(random(225));
      blue = round(random(225));
      r = round(random(30,35));
      g = round(random(30,35));
      b = round(random(30,35));
      crgb = round(random(1,3));
      aors = round(random(1,2));
      addOrSub();
      restart = 1;
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

function keyPressed() {
  let volume = 1;
  if (keyCode === 38) {
    volume = volume + 0.1;
    backgroundMusic.setVolume(volume);
  }
  else if(keyCode === 40){
    volume = volume - 0.1;
    backgroundMusic.setVolume(volume);
  }
  console.log(volume);
}
function off(){
  if(timer <= 0){
    gameOverSound.play();
    gameOver = 1;
    backgroundMusic.pause();
    background(220);
    fill(0);
    textSize(32/400*width);
    textAlign(CENTER);
    text("You have scored:"+" "+ score,width/2,height/2);
  }
}

function page() {
  noStroke();
  diff = 60/400* width/2;
  size = 55/400* width/2;
  for (let x = diff - 20; x < width- diff; x = x + diff) {
    for (let y = diff + 20; y < height- diff; y= y + diff) {
      rect(x, y, size, size, 10);
      if (restart === 0){
        append(coordinateX, x);
        append(coordinateY, y);
      }
    }
  }
}

function find(){
  fill(nr,ng,nb);
  rect(coordinateX[i],coordinateY[i], size, size, 10);
}

function mousePressed() {
  if (gameOver === 0){
    let currentColor = get(mouseX, mouseY);
    if(String(currentColor) !== "220,220,220,255"){
      if (mouseY > diff + 20){
        if(abs(red - currentColor[0])<= 35 && abs(red - currentColor[0])>= 30 || abs(green - currentColor[1])<= 35 && abs(green - currentColor[1])>= 30 || abs(blue - currentColor[2])<=35 && abs(blue - currentColor[2])>= 30){
          correct.play();
          score = score +1;
          timer = timer +1;
          restart = 0;
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
  if(aors === 2 && red > 35){
    r = r * -1;
  }
}

function difColour(){
  if(crgb === 1){
    nr = red + r;
    nb = blue;
    ng = green;
  }
  else if(crgb === 2){
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
  text("SCORE:"+" "+ score, 20/400*width, 30/400*height);

}

function countDown(){
  textAlign(RIGHT);
  text("TIME:"+" "+ timer, 380/400*width, 30/400*height);
  if (frameCount % 60 === 0 && timer > 0) {
    timer --;
  }
}
