// Traffic Light Starter Code
// Dan Schellenberg
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

let duration = 1000;
let time;
let state;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  let time = millis();
  background(255);
  drawOutlineOfLights();
  determineState();
  if (state === 1){
    ellipse(width/2, height/2 - 65, 50, 50);
  }
  else if (state === 2){
    ellipse(width/2, height/2, 50, 50);
  }
  else{
    ellipse(width/2, height/2 + 65, 50, 50);
  }
  console.log(time);
  console.log(state);

}

function determineState(){
  let state = 0;
  if(state === 0 && time%1000 === 0){
    fill(225, 0, 0);
    let state = 1;
  }
  else if (state === 1 && time%2000 === 0){
    fill(0, 225, 0);
    let state = 2;
  }
  else if (state === 2 && time%3000 === 0){
    fill(255, 204, 0);
    let state = 0;
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
