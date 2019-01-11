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

  backButtonDisplay(x,y,posX,posY){
    button.visible = true;
    button.setCollider("rectangle",posX, posY, 30, 30);
    button.position.x = x;
    button.position.y = y;
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

  appendIntoToolsBar(object){
    for(let i = 0; i<tools.length; i++){
      if(tools[i] === 0){
        tools[i] = object;
        break;
      }
    }
  }
}




let tools = [0,0,0,0,0,0];
let myTable,myBookshelfDoor;
let tableKeyChoosed,choosed;
let frame,tableKey;
let table,door,key,button,bookshelf,bookshelfDoor;
let tableZoom = 1;
let bookshelfDoorOpened = 1;
let backKeyPressed;
let backgroundImage;



function preload() {
  backgroundImage = loadImage("assets/background.png");
}




function setup() {
  myTable = new Movement(413,-294,351,139);
  myBookshelfDoor = new Movement(240,30,525,250);

  createCanvas(1366, 768);
  tableKey = loadImage("assets/key.png");
  tableKey.visible = true;
  frame = loadImage("assets/frame.png");
  door = loadImage("assets/door.png");
  bookshelf = loadImage("assets/bookshelf.png");

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
    tableKey.name = "tableKey";
    myTable.appendIntoToolsBar(tableKey);
  };

  button = createSprite(270,620);
  button.addAnimation("normal","assets/button.png");
  button.visible = false;
  button.setCollider("rectangle", 0, 0, 0, 0);
  button.onMousePressed = function() {
    backKeyPressed = true;
  };

  bookshelfDoor = createSprite(438,353);
  bookshelfDoor.addAnimation("normal","assets/bookshelfDoor.png");
  bookshelfDoor.addAnimation("open","assets/bookshelfDoor1.png");
  bookshelfDoor.setDefaultCollider();
  bookshelfDoor.onMousePressed = function() {
    bookshelfDoorOpened += 1;
  };

}

function draw() {
  background(200);
  image(backgroundImage,50,50);
  image(door,900,230);
  image(bookshelf,350,290);
  movementTable();
  movementBookshelfDoor();
  back();
  drawSprites();
  camera.off();
  image(frame, 0, 0);
  toolBar();
  mouseOnTop();
}

function movementBookshelfDoor(){
  if(bookshelfDoorOpened > 1){
    myBookshelfDoor.backButtonDisplay(434,425,230,210);
    table.setCollider("rectangle", 0, 0, 0, 0);
    if(bookshelfDoorOpened === 2){
      myBookshelfDoor.zoomedIn(bookshelfDoor);
      bookshelfDoorOpened += 1;
    }
    if(tableKeyChoosed === true){
      if(bookshelfDoorOpened %2 === 0){
        myBookshelfDoor.x = 610;
        bookshelfDoor.position.x = 590;
        myBookshelfDoor.changed(bookshelfDoor);
        tableKey.visible = false;
        choosed = false;
      }
      else{
        myBookshelfDoor.x = 240;
        bookshelfDoor.position.x = 438;
        myBookshelfDoor.normal(bookshelfDoor);
      }
    }
  }
}

function movementTable(){
  if(tableZoom > 1){
    myTable.backButtonDisplay(270,620,413,-1.4);
    if(tableZoom === 2){
      myTable.zoomedIn(table);
      tableZoom += 1;
    }

    else if(tableZoom %2 === 0){
      myTable.y = -208.6;
      myTable.changed(table);
      if(tools.indexOf(tableKey) < 0){
        myTable.containOther(key,413,-270,32,32);
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

function toolBar(){
  for(let i=0; i<tools.length; i++){
    if(tools[i] !== 0 && tableKey.visible === true){
      image(tools[i], 1290, 120);
    }
  }
}

function mouseOnTop(){
  if(mouseX > 1260 && mouseX < 1335 &&  mouseY > 90 && mouseY <170 && tools[0] !== 0){
    rectMode(CENTER);
    fill(0,0,0,50);
    rect(1298,128.5,70,70,10);
    if(mouseIsPressed && tools[0] === tableKey){
      tableKeyChoosed = true;
      choosed = true;
      if(bookshelfDoorOpened>3){
        bookshelfDoorOpened = 3;
      }
    }
  }
  if(choosed === true){
    rect(1298,128.5,70,70,10);
  }
}


function back(){
  if(backKeyPressed === true){
    camera.position.x = width/2;
    camera.position.y = height/2;
    camera.zoom = 1;

    button.visible = false;
    backKeyPressed = false;
    button.setCollider("rectangle",0,0,0,0);

    bookshelfDoorOpened = 1;
    bookshelfDoor.setDefaultCollider();
    bookshelfDoor.changeAnimation("normal");
    bookshelfDoor.position.x = 438;

    tableZoom = 1;
    table.setDefaultCollider();
    table.changeAnimation("normal");

    key.setCollider("rectangle",0,0,0,0);
    key.visible = false;
  }
}
