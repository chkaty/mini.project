// bouncing balls
// Katy Chen
// 22018/10/22
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let ballArray = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  fill(0);

for(let i = 0; i < ballArray.length; i++){
    ballArray[i].x += ballArray[i].dx;
    ballArray[i].y += ballArray[i].dy;

    if(ballArray[i].x >= width - ballArray[i].radius  || ballArray[i].x <= 0 + ballArray[i].radius){
      ballArray[i].dx *= -1;
    }
    if(ballArray[i].y >= height - ballArray[i].radius  || ballArray[i].y <= 0 + ballArray[i].radius){
      ballArray[i].dy *= -1;
    }
    ellipse(ballArray[i].x,ballArray[i].y,ballArray[i].radius*2,ballArray[i].radius*2);
  }
}

function mouseClicked(){
  let ball = {
    x: mouseX,
    y: mouseY,
    radius: 25,
    dx: random(-5,5),
    dy: random(-5,5),
  };
  ballArray.push(ball);
}
