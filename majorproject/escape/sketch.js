// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let object;
let tools = [];
let frame;
let table,door,key,button;
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
  };

  key = createSprite(270,510);
  key.addAnimation("normal","assets/key.png");
  key.visible = false;
  key.setCollider("rectangle",0,0,0,0);
  key.onMousePressed = function() {
    tools.push("key");
  };

  button = createSprite(270,620);
  button.addAnimation("normal","assets/button.png");
  button.visible = false;
  button.setCollider("rectangle", 0, 0, 0, 0);
  button.onMousePressed = function() {
    backKeyPressed = true;
  };
}

function draw() {
  background(200);
  image(backgroundImage,50,50);
  image(door,900,230);
  movementTable();
  back();
  drawSprites();
  camera.off();
  image(frame, 0, 0);
  console.log(tableZoom);
}

function movementTable(){
  if(tableZoom > 1){
    button.visible = true;
    button.setCollider("rectangle",width/2-table.position.x,height/1.4-table.position.y,30,30);
    if(tableZoom === 2){
      tableZoom += 1;
      camera.zoom = 3.5;
      camera.position.x = table.position.x;
      camera.position.y = table.position.y;
      table.setCollider ("rectangle",width/2-table.position.x,height/3-table.position.y,table.width*3,table.height);
    }

    else if(tableZoom %2 === 0){
      table.changeAnimation("open");
      table.setCollider ("rectangle",width/2-table.position.x,height/2.25-table.position.y,table.width*3,table.height);
      if(tools.indexOf("key") < 0){
        key.visible = true;
        setTimeout(function() {
          key.setCollider("rectangle",width/2-key.position.x,height/3.2-key.position.y,30,30);
        }, 500);
      }
      else{
        key.setCollider("rectangle",0,0,0,0);
        key.visible = false;
      }
    }

    else if(tableZoom %2 !== 0){
      key.setCollider("rectangle",0,0,0,0);
      key.visible = false;
      table.setCollider ("rectangle",width/2-table.position.x,height/3-table.position.y,table.width*3,table.height);
      table.changeAnimation("normal");
    }
  }
}

// function toolBar(){
//   let boxHeight = height/6;
//   for(let i = 0; i < 6; i++){
//     rect(width -70,boxHeight*1,50,50);
//   }
// }

function back(){
  if(backKeyPressed === true){
    camera.position.x = windowWidth/2;
    camera.position.y = windowHeight/2;
    camera.zoom = 1;
    button.visible = false;
    backKeyPressed = false;
    tableZoom = 1;
    table.setDefaultCollider();
    table.changeAnimation("normal");
    key.setCollider("rectangle",0,0,0,0);
    key.visible = false;
    button.setCollider("rectangle",0,0,0,0);
  }
}
