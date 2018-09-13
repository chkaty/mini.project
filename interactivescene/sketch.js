// interactive scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
}


function draw() {
  if(keyIsDown(87)){
    background(255);}
  if(keyIsDown(66)){
    background(0);}
}

function mousePressed() {
  let size = 10

  if(keyIsDown(82)){
    rect(mouseX, mouseY,size , size);}
  if(keyIsDown(69)){
    ellipse(mouseX, mouseY, size, size);}
}
