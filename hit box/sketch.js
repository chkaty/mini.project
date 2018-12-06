// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 75;
let y = 150;
let w = 200;
let h = 100;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  let hitbox = collidePointRect(mouseX,mouseY,x,y,w,h);
  if(hitbox){
    fill(255,0,0);
  }
  else{
    fill(0,255,0);
  }
  rect(x,y,w,h);
}
