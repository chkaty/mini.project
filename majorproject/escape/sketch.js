// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let object;
let tools = [];
let frame;
let table;
let key;
let tableZoom = 1;
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
    tableZoom += 1;
    console.log(tableZoom)
  };

  key = createSprite(270,510);
  key.addAnimation("normal","assets/key.png");
  key.visible = false;
  key.onMousePressed = function() {
    tools.push("key");
  };
}

function draw() {
  background(200);
  image(backgroundImage,50,50);
  image(door,900,230);
  myCamera(table);
  drawSprites();
  camera.off();
  image(frame, 0, 0);
  console.log(tools)
}

function myCamera(sprite){
  if(tableZoom === 2){
    tableZoom += 1;
    camera.zoom = 3.5;
    camera.position.x = sprite.position.x;
    camera.position.y = sprite.position.y;
    table.setCollider ("rectangle",width/2-table.position.x,height/3-table.position.y,table.width*3,table.height);
  }
  else if(tableZoom %2 === 0){
    table.changeAnimation("open");
    if(tools.indexOf('key') < 0){
      key.visible = true;
      key.setCollider("rectangle",width/2-key.position.x,height/3-key.position.y,30,30);
    }
    else{
      key.setCollider("rectangle",0,0,0,0);
      key.visible = false;
    }
  }
  else{
    key.setCollider("rectangle",0,0,0,0);
    key.visible = false;
    table.changeAnimation("normal");
  }
  // button = createSprite(270,600);
  // button.addAnimation("normal","assets/button.png");
  // button.setCollider("rectangle", 0, 0, 10, 5);
  // button.onMousePressed = function() {
  //   backKeyPressed = true;
  // };
  // drawSprites(button);

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
