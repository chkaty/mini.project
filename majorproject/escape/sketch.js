// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Movement{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  backButtonDisplay(){
    button.visible = true;
    button.setCollider("rectangle",width/2-table.position.x,height/1.4-table.position.y,30,30);
  }

  zoomedIn(object){
    camera.zoom = 3.5;
    camera.position.x = object.position.x;
    camera.position.y = object.position.y;
  }

  normal(object){
    object.setCollider ("rectangle",this.x,this.y,this.w,this.h);
    object.changeAnimation("normal");
  }

  changed(object){
    object.changeAnimation("open");
    object.setCollider ("rectangle",this.x,this.y,this.w,this.h);
  }

  containOther(object,x,y,w,h){
    object.visible = true;
    setTimeout(function() {
      object.setCollider("rectangle",x,y,w,h);
    }, 500);
  }

  hideObject(object){
    object.setCollider("rectangle",0,0,0,0);
    object.visible = false;
  }
}

let tools = [];
let myTable;
let frame;
let table,door,key,button;
let tableZoom = 1;
let backKeyPressed;
let backgroundImage;

function preload() {
  backgroundImage = loadImage("assets/background.png");
}

function setup() {
  myTable = new Movement(413,-294,351,139);
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
  console.log(width/2-key.position.x,height/3.2-key.position.y,30,30);
}

function movementTable(){
  if(tableZoom > 1){
    myTable.backButtonDisplay();
    if(tableZoom === 2){
      myTable.zoomedIn(table);
      tableZoom += 1;
    }

    else if(tableZoom %2 === 0){
      myTable.y = -208.6;
      myTable.changed(table);
      if(tools.indexOf("key") < 0){
        myTable.containOther(key,413,-270,30,30);
      }
      else{
        myTable.hideObject(key);
      }
    }

    else{
      myTable.y = -294;
      myTable.hideObject(key);
      myTable.normal(table);
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
    camera.position.x = width/2;
    camera.position.y = height/2;
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
