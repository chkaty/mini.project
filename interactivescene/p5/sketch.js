// interactive scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
    createCanvas(400, 400);
    background(255); 	
}


function draw() {
  let size = 50

  if(mouseIsPressed && keyIsDown(82)){
    rect(mouseX, mouseY,size , size);}
  if(mouseIsPressed && keyIsDown(69)){
    ellipse(mouseX, mouseY, size, size);}

  if(keyIsDown(87)){
    background(255);}
  if(keyIsDown(66)){
    background(0);}

}
