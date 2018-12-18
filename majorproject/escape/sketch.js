// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let object;
let time = 1;
let tools = [];
let frame;
let table, tableZoom;
let backKeyPressed;
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
  table.addAnimation("open","assets/table2.png");
  table.setDefaultCollider();
  table.onMousePressed = function() {
    tableZoom = true;
    time += 1;
    console.log(tableZoom)
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
  image(backgroundImage,50,50);
  image(door,900,230);
  myCamera(table);
  drawSprites();
  camera.off();
  image(frame, 0, 0);
}

function myCamera(sprite){
  if(tableZoom === true){
    camera.zoom = 3.5;
    camera.position.x = sprite.position.x;
    camera.position.y = sprite.position.y;
    table.setCollider ("rectangle",width/2-table.position.x,height/3-table.position.y,table.width*3,table.height);
    // button = createSprite(270,600);
    // button.addAnimation("normal","assets/button.png");
    // button.setCollider("rectangle", 0, 0, 36, 19);
    // button.onMousePressed = function() {
    //   backKeyPressed = true;
    // };
    // drawSprites(button);

    // table.changeAnimation("open");
    // key = createSprite(270,510);
    // key.addAnimation("normal","assets/key.png");
    // drawSprites(key);
  }
}

function toolBar(){
  let boxHeight = height/6;
  for(let i = 0; i < 6; i++){
    rect(width -70,boxHeight*1,50,50);
  }
}

function back(){
  if(backKeyPressed === true){
    camera.zoom = 1;
    camera.position.x = sprite.position.x;
    camera.position.y = sprite.position.y;
  }
}
