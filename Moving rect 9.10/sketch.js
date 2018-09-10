// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let x;
let dx;
let rectWidth;


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  dx = 5;
  rectWidth= 50;
}

function draw() {
  background(0,100,100);
  //move rect
  x += dx;

  //check if hit the wall
  if (x > width - rectWidth || x<0){
    dx = dx * -1
  }

  //display ract
  fill(0,255,0);
  rect(x,400,200,150);

}
