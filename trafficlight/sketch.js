// Traffic Light Starter Code
// Dan Schellenberg
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

let time;
let duration = 2;
let state = 1;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  determineState();
  colour();
}


function colour(){
  if (state === 1){
    fill(225,0,0);
    ellipse(width/2, height/2 - 65, 50, 50);
  }
  else if (state === 2){
    fill(0,225,0);
    ellipse(width/2, height/2, 50, 50);
  }
  else if (state === 3){
    fill(255,204,0);
    ellipse(width/2, height/2 + 65, 50, 50);
  }
}


function determineState(){
  let time = round(millis()/1000);
  console.log(time);
  if (time % 6 === 0){
    state = 3;
  }
  else if (time % 4 === 0){
    state = 2;
  }
  else if (time % 2 === 0){
    state = 1;
  }
}


function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}
