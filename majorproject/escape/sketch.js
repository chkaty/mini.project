// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let object;
let time = 0;
let tools = [];
let frame;
let table, tableZoom;
let backgroundImage;
function preload() {
  backgroundImage = loadImage("assets/background.png");
}

function setup() {
  createCanvas(1366, 768);
  frame = loadImage("assets/frame.png");
  door = loadImage("assets/door.png");

  table = createSprite(270,550);
  table.addAnimation("normal","assets/table.png");
  table.setCollider("rectangle", 0, 0, 100, 120);
  table.onMousePressed = function() {
    tableZoom = true;
  };

  // object = createSprite(width/2, height/2);
  // object.addAnimation("normal","assets/object.png");
  // object.addAnimation("turn","assets/triangle.png");
  // object.setCollider("rectangle", 0, 0, 200, 200);
  // object.onMousePressed = function() {
  //   this.changeAnimation("turn");
  //   time += 1;
  // };
}

function draw() {
  background(200);
  image(backgroundImage,50,50)
  image(door,900,230)
  myCamera(table);
  drawSprites();
  // if(time %2 !== 0){
  //   object.addAnimation("turn","assets/triangle.png");
  // }
  // else{
  //   object.addAnimation("turn","assets/object.png");
  // }
  camera.off();
  image(frame, 0, 0);
}

function myCamera(sprite){
  if(tableZoom === true){
    camera.zoom = 3.5;
    camera.position.x = sprite.position.x;
    camera.position.y = sprite.position.y;
    
  }
}

function toolBar(){
  let boxHeight = height/6;
  for(let i = 0; i < 6; i++){
    rect(width -70,boxHeight*1,50,50);
  }
}
