// DVD Bounce
// Katy Chen
// 2018/9/18
//

let dvd;
let x, y;
let dx, dy;

function preload(){
  dvd = loadImage("assets/dvdlogo.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2 - dvd.width/2;
  y = height/2 - dvd.height/2;
  dx = random(1,5);
  dy = random(1,5);
}

function draw() {
  moveDVD();
  displayDVD();
}

function moveDVD() {
  x += dx;
  y += dy;
  if (x >= width - dvd.width || x <= 0){
    dx = dx*-1
    tint(random(255));
  }

  if (y >= height- dvd.height || y <= 0){
    dy = dy *-1
    tint(random(255));
  }
}

function displayDVD(){
  background(50);
  image(dvd,x,y);
}
