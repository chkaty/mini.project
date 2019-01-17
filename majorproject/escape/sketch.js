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

  appendIntoTools(object){
    for(let i = 0; i<toolbar.length; i++){
      if(toolbar[i] === 0){
        toolbar[i] = object;
        break;
      }
    }
  }

  deleteFromTools(object){
    for(let i = 0; i<toolbar.length; i++){
      if(toolbar[i] === object){
        toolbar[i] = 0;
        break;
      }
    }
  }

  checkRepeat(object){
    let counter = 0;
    for(let i = 0; i<toolbar.length; i++){
      if(toolbar[i] === object){
        counter++;
      }
      if(counter > 1){
        toolbar[i] = 0;
      }
    }
  }
}




let tools = [];
let books = [];
let scene = 1;
let toolbar = [0,0,0,0,0,0];
let myTable,myBookshelfDoor,myMirror,mySwitch;
let choosed;
let frame,tableKey,picture,sofa,bookPile,screwdriver1,hint,clock,wood,glass,number,mouse,safeKey1;
let table,door,key,button,bookshelf,bookshelfDoor,lowerBookshelfDoor,note,screwdriver,leftButton,rightButton,mirror,cover,screw1,screw2,lightSwitch,lightOff,filter1,filter2,eye,bag,safeKey;
let book1,book2,book3,book4,book5,book6,bookOpened = false;
let counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0, counter5 = 0, counter6 = 0;
let tableZoom = 1, bookshelfDoorOpened = 1, noteOpened = 1, mirrorZoom = 1, screwOn = 2, lightSwitchOpened = 1, rightCounter = 0;
let backKeyPressed;
let backgroundImage;
let backgroundMusic,glassBreak;
let glassBreakPlayed = 0;
let lightOffed = false, start = false, bagOpened = false;



function preload() {
  backgroundMusic = loadSound("assets/back.mp3");
  glassBreak = loadSound("assets/glass.wav");
  backgroundImage = loadImage("assets/background.png");
  eye = loadAnimation("assets/eye1.png","assets/eye2.png","assets/eye3.png","assets/eye4.png");
}




function setup() {
  myTable = new Movement(413,-294,351,139);
  myBookshelfDoor = new Movement(240,30,525,250);
  myMirror = new Movement(240,30,525,250);
  mySwitch = new Movement(-50,10,100,100);

  createCanvas(1366, 768);
  hint = loadImage("assets/hint.png");
  wood = loadImage("assets/wood.png");
  safeKey1 = loadImage("assets/safeKey.png");
  mouse = loadImage("assets/mouse.png");
  number = loadImage("assets/number.png");
  clock = loadImage("assets/clock.png");
  tableKey = loadImage("assets/tableKey.png");
  glass = loadImage("assets/glass.png");
  tableKey.choosed = false;
  glass.choosed = false;
  screwdriver1 = loadImage("assets/screwdriver1.png");
  screwdriver1.choosed = false;
  tableKey.visible = true;
  frame = loadImage("assets/frame.png");

  sofa = loadImage("assets/sofa.png");
  bookPile = loadImage("assets/bookPile.png");
  picture = loadImage("assets/picture.png");
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
    tableKey.name = "Bookshelf Key";
    tools.push(tableKey);
    myTable.appendIntoTools(tableKey);
  };


  book1 = createSprite(375,363);
  book1.addAnimation("normal","assets/book1.png");
  book1.addAnimation("choose","assets/book1g.png");
  book1.setCollider("rectangle",0,0,0,0);
  book1.onMousePressed = function() {
    book1.changeAnimation("choose");
    counter1 ++;
    if(counter1 <2){
      books.push(3);
    }
  };

  book2 = createSprite(395,356);
  book2.addAnimation("normal","assets/book2.png");
  book2.addAnimation("choose","assets/book2g.png");
  book2.setCollider("rectangle",0,0,0,0);
  book2.onMousePressed = function() {
    book2.changeAnimation("choose");
    counter2 ++;
    if(counter2 <2){
      books.push(6);
    }
  };

  book3 = createSprite(411,366);
  book3.addAnimation("normal","assets/book3.png");
  book3.addAnimation("choose","assets/book3g.png");
  book3.setCollider("rectangle",0,0,0,0);
  book3.onMousePressed = function() {
    book3.changeAnimation("choose");
    counter3 ++;
    if(counter3 <2){
      books.push(2);
    }
  };

  book4 = createSprite(433,361);
  book4.addAnimation("normal","assets/book4.png");
  book4.addAnimation("choose","assets/book4g.png");
  book4.setCollider("rectangle",0,0,0,0);
  book4.onMousePressed = function() {
    book4.changeAnimation("choose");
    counter4 ++;
    if(counter4 <2){
      books.push(4);
    }
  };

  book5 = createSprite(449,373);
  book5.addAnimation("normal","assets/book5.png");
  book5.addAnimation("choose","assets/book5g.png");
  book5.setCollider("rectangle",0,0,0,0);
  book5.onMousePressed = function() {
    book5.changeAnimation("choose");
    counter5 ++;
    if(counter5 <2){
      books.push(1);
    }
  };

  book6 = createSprite(479,383);
  book6.addAnimation("normal","assets/book6.png");
  book6.addAnimation("choose","assets/book6g.png");
  book6.setCollider("rectangle",0,0,0,0);
  book6.onMousePressed = function() {
    book6.changeAnimation("choose");
    counter6 ++;
    if(counter6 <2){
      books.push(5);
    }
  };

  bookshelfDoor = createSprite(438,353);
  bookshelfDoor.addAnimation("normal","assets/bookshelfDoor.png");
  bookshelfDoor.addAnimation("open","assets/bookshelfDoor1.png");
  bookshelfDoor.setDefaultCollider();
  bookshelfDoor.onMousePressed = function() {
    bookshelfDoorOpened += 1;
  };

  screwdriver = createSprite(470,555);
  screwdriver.addAnimation("normal","assets/screwdriver.png");
  screwdriver.setCollider("rectangle",0,0,0,0);
  screwdriver.onMousePressed = function() {
    screwdriver.visible = false;
    screwdriver.setCollider("rectangle",0,0,0,0);
    screwdriver1.name = "Screw Driver";
    tools.push(screwdriver);
    myBookshelfDoor.appendIntoTools(screwdriver1);
  };


  lowerBookshelfDoor = createSprite(438.5,515);
  lowerBookshelfDoor.addAnimation("normal","assets/bookshelfDoor2.png");
  lowerBookshelfDoor.addAnimation("open","assets/bookshelfDoor2o.png");

  note = createSprite(750,500);
  note.addAnimation("normal","assets/note.png");
  note.addAnimation("open","assets/notez.png");
  note.setDefaultCollider();
  note.onMousePressed = function() {
    noteOpened += 1;
  };

  leftButton = createSprite(100,height/2);
  leftButton.addAnimation("normal","assets/leftButton.png");
  leftButton.setDefaultCollider();
  leftButton.onMousePressed = function() {
    scene = 2;
    leftKeyPressed();
  };

  rightButton = createSprite(1160,height/2);
  rightButton.addAnimation("normal","assets/rightButton.png");
  rightButton.setDefaultCollider();
  rightButton.visible = false;
  rightButton.onMousePressed = function() {
    scene = 1;
    rightKeyPressed();
  };

  mirror = createSprite(900,400);
  mirror.addAnimation("normal","assets/mirror.png");
  mirror.addAnimation("zoomedIn","assets/people.png");
  mirror.addAnimation("broke","assets/mirrorb.png");
  mirror.addAnimation("bleed","assets/peopleb.png");
  mirror.visible = false;
  mirror.setCollider("rectangle",0,0,0,0);
  mirror.onMousePressed = function() {
    glass.name = "Glass";
    tools.push(mirror);
    myMirror.appendIntoTools(glass);
  };

  cover = createSprite(900,313);
  cover.addAnimation("normal","assets/mirror1.png");
  cover.visible = false;
  cover.onMousePressed = function() {
    mirrorZoom ++;
  };

  screw1 = createSprite(690,415);
  screw1.addAnimation("normal","assets/screw.png");
  screw1.visible = false;
  screw1.setCollider("rectangle",0,0,0,0);
  screw1.onMousePressed = function() {
    if(screwdriver1.choosed === true){
      screwOn --;
      screw1.visible = false;

    }
  };

  screw2 = createSprite(770,415);
  screw2.addAnimation("normal","assets/screw.png");
  screw2.visible = false;
  screw2.setCollider("rectangle",0,0,0,0);
  screw2.onMousePressed = function() {
    if(screwdriver1.choosed === true){
      screwOn --;
      screw2.visible = false;
    }
  };

  lightSwitch = createSprite(730,380);
  lightSwitch.addAnimation("normal","assets/switch.png");
  lightSwitch.addAnimation("open","assets/switcho.png");
  lightSwitch.visible = false;
  lightSwitch.setCollider("rectangle",0,0,0,0);
  lightSwitch.onMousePressed = function() {
    lightSwitchOpened ++;
  };

  bag = createSprite(570,500);
  bag.addAnimation("normal","assets/bag.png");
  bag.addAnimation("open","assets/bago.png");
  bag.visible = false;
  bag.setCollider("rectangle", 0, 0, 0, 0);
  bag.onMousePressed = function() {
    if(glass.choosed){
      bag.changeAnimation("open");
      choosed = -1;
      myMirror.deleteFromTools(glass);
      bagOpened = true;
    }
  };

  safeKey =  createSprite(250,570);
  safeKey.addAnimation("normal","assets/safeKey.png");
  safeKey.visible = false;
  safeKey.setCollider("rectangle", 0, 0, 0, 0);
  safeKey.onMousePressed = function() {
    backKeyPressed = true;
    safeKey1.name = "Safe Key";
    tools.push(safeKey);
    myMirror.appendIntoTools(safeKey1);
  };

  lightOff = createSprite(width/2,height/2);
  lightOff.addAnimation("normal","assets/off.png");
  lightOff.visible = false;

  filter1 = createSprite(width/2,height/2);
  filter1.addAnimation("normal","assets/filter1.png");
  filter1.visible = false;

  filter2 = createSprite(width/2,height/2);
  filter2.addAnimation("normal","assets/filter2.png");
  filter2.visible = false;

  eye = loadAnimation("assets/eye1.png","assets/eye2.png","assets/eye3.png","assets/eye4.png");
  eye.looping = false;


  button = createSprite(270,620);
  button.addAnimation("normal","assets/button.png");
  button.visible = false;
  button.setCollider("rectangle", 0, 0, 0, 0);
  button.onMousePressed = function() {
    backKeyPressed = true;
  };

  backgroundMusic.loop();
  backgroundMusic.setVolume(0.6);
}

function draw() {
  image(backgroundImage,50,50);
  if(scene === 2){
    image(clock,400,130);
    movementMirror();
    movementLightSwitch();
    movementScrew();
    if(rightCounter <= 0){
      image(mouse,100,500);
    }
    else{
      if(rightCounter > 0){
        image(mouse,280,500);
        if(toolbar.indexOf(safeKey1) < 0){
          safeKey.visible = true;
          safeKey.setDefaultCollider();
        }
        else{
          safeKey.visible = false;
          safeKey.setCollider("rectangle",0,0,0,0);
        }
      }
    }
  }

  if(scene === 1){
    if(start === false){
      animation(eye, width/2, height/2);
    }
    image(door,900,230);
    image(bookshelf,350,290);
    image(picture,600,230);
    image(sofa,550,450);
    image(bookPile,363,485);
    image(hint,440,320);
    movementTable();
    movementNote();
    movementBookshelfDoor();
    checkBook();
  }
  back();
  drawSprites();
  camera.off();
  image(frame, 0, 0);
  toolBar();
}



function movementTable(){
  if(tableZoom > 1){
    leftButton.setCollider("rectangle",0,0,0,0);
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

function movementBookshelfDoor(){
  if(bookshelfDoorOpened > 1){
    table.setCollider("rectangle",0,0,0,0);
    note.setCollider("rectangle",0,0,0,0);
    leftButton.setCollider("rectangle",0,0,0,0);
    myBookshelfDoor.backButtonDisplay(434,425,230,210);
    if(bookshelfDoorOpened === 2){
      myBookshelfDoor.zoomedIn(bookshelfDoor);
      bookshelfDoorOpened += 1;
    }
    if(tableKey.choosed === true){
      if(bookshelfDoorOpened %2 === 0){
        myBookshelfDoor.x = 610;
        bookshelfDoor.position.x = 590;
        myBookshelfDoor.changed(bookshelfDoor);
        tableKey.visible = false;
        choosed = -1;
        myTable.deleteFromTools(tableKey);
        if(!bookOpened){
          movementBook();
        }
        else{
          backToNormal();
        }
      }
      else{
        myBookshelfDoor.x = 240;
        bookshelfDoor.position.x = 438;
        myBookshelfDoor.normal(bookshelfDoor);
        backToNormal();
      }
    }
  }
}




function movementBook(){
  setTimeout(function() {
    book1.setCollider("rectangle",90,50,85,150);
    book2.setCollider("rectangle",138,32,50,200);
    book3.setCollider("rectangle",177,58,61,135);
    book4.setCollider("rectangle",232,45,90,165);
    book5.setCollider("rectangle",271,73,20,90);
    book6.setCollider("rectangle",344,103,185,10);
  }, 500);
}

function checkBook(){
  if (counter1 > 0 && counter2 > 0 && counter3 > 0 && counter4 > 0 && counter5 > 0 && counter6 > 0){
    bookOpened = true;
    for(let i = 0; i<books.length; i++){
      if (books[i] !== i+1){
        bookOpened = false;
        break;
      }
    }
    backToNormal();
    if(bookOpened){
      lowerBookshelfDoor.changeAnimation("open");
      screwdriver.setDefaultCollider();
    }
  }
}

function backToNormal(){
  books = [];
  counter1 = 0, counter2 = 0, counter3 = 0, counter4 = 0, counter5 = 0, counter6 = 0;
  book1.setCollider("rectangle",0,0,0,0);
  book2.setCollider("rectangle",0,0,0,0);
  book3.setCollider("rectangle",0,0,0,0);
  book4.setCollider("rectangle",0,0,0,0);
  book5.setCollider("rectangle",0,0,0,0);
  book6.setCollider("rectangle",0,0,0,0);
  book1.changeAnimation("normal");
  book2.changeAnimation("normal");
  book3.changeAnimation("normal");
  book4.changeAnimation("normal");
  book5.changeAnimation("normal");
  book6.changeAnimation("normal");
}




function movementNote(){
  if(noteOpened %2 === 0){
    note.position.x = width/2;
    note.position.y = height/2;
    note.changeAnimation("open");
    note.setCollider("rectangle",5,40,270,370);
    bookshelfDoor.setCollider("rectangle",0,0,0,0);
    table.setCollider("rectangle",0,0,0,0);
    leftButton.setCollider("rectangle",0,0,0,0);
  }
  else{
    note.setDefaultCollider();
    leftButton.setDefaultCollider();
    if(tableZoom < 2){
      table.setDefaultCollider();

    }
    if(bookshelfDoorOpened < 2){
      bookshelfDoor.setDefaultCollider();
    }
    note.position.x = 750;
    note.position.y = 500;
    note.changeAnimation("normal");
  }
}


function movementMirror(){
  if(mirrorZoom > 1){
    rightButton.setCollider("rectangle",0,0,0,0);
    lightSwitch.setCollider("rectangle",0,0,0,0);
    rightButton.visible = false;
    myMirror.backButtonDisplay(900,380,-210,230);
    cover.setCollider("rectangle",-200,0,730,600);
    bag.setCollider("rectangle",0,0,0,0);
    safeKey.setCollider("rectangle",0,0,0,0);
    if(mirrorZoom  === 2){
      myMirror.zoomedIn(cover);
      mirror.changeAnimation("zoomedIn");
    }
    if(toolbar.indexOf(glass) < 0){
      if(mirrorZoom  === 3){
        if(glassBreakPlayed === 0){
          glassBreak.play();
          glassBreakPlayed ++;
        }
        mirror.changeAnimation("broke");
      }
      if(mirrorZoom  === 4){
        mirror.changeAnimation("bleed");
        mirror.setCollider("rectangle",-320,-200,100,100);
      }
    }
    else{
      mirror.setCollider("rectangle",0,0,0,0);
    }
  }
}

function movementLightSwitch(){
  if(lightSwitchOpened > 1){
    mySwitch.backButtonDisplay(730,450,-50,180);
    cover.setCollider("rectangle",0,0,0,0);
    screw1.setCollider("rectangle",-150,80,30,30);
    screw2.setCollider("rectangle",50,80,30,30);
    rightButton.setCollider("rectangle",0,0,0,0);
    safeKey.setCollider("rectangle",0,0,0,0);
    bag.setCollider("rectangle",0,0,0,0);
    if(screw1.visible === false){
      screw1.setCollider("rectangle",0,0,0,0);
    }
    if(screw2.visible === false){
      screw2.setCollider("rectangle",0,0,0,0);
    }

    if(lightSwitchOpened  === 2){
      mySwitch.zoomedIn(lightSwitch);
      lightSwitchOpened ++;
    }
    if(lightSwitchOpened % 2 === 0){
      if(lightOffed === false){
        camera.position.x = width/2;
        camera.position.y = height/2;
        camera.zoom = 1;
        filter1.visible = true;
        filter2.visible = true;
        setTimeout(function() {
          mySwitch.zoomedIn(lightSwitch);
        }, 600);
        setTimeout(function() {
          camera.position.x = width/2;
          camera.position.y = height/2;
          camera.zoom = 1;
          filter1.visible = false;
        }, 500);
        setTimeout(function() {
          mySwitch.zoomedIn(lightSwitch);
          filter2.visible = false;
          lightOffed = true;
        }, 600);
      }
      mySwitch.changed(lightSwitch);
      lightOff.visible = true;
    }
    else{
      mySwitch.normal(lightSwitch);
      lightOff.visible = false;
    }
  }
}

function movementScrew(){
  if(screwOn >= 1){
    image(wood,680,400);
  }
  else {
    choosed = -1;
    mySwitch.deleteFromTools(screwdriver1);
    if(lightSwitchOpened % 2 === 0){
      image(number,680,400);
    }
  }
}

function toolBar(){
  myTable.checkRepeat(tableKey);
  myMirror.checkRepeat(glass);
  myBookshelfDoor.checkRepeat(screwdriver1);
  for(let i=0; i<toolbar.length; i++){
    if(toolbar[i] !== 0){
      image(toolbar[i], 1260, 100+103*i);
    }
    if(mouseX > 1260 && mouseX < 1335 &&  mouseY > 90+100*i && mouseY < 175+100*i && toolbar[i] !== 0){
      rectMode(CENTER);
      fill(0,0,0,50);
      rect((1260+1335)/2,(90+100*i+175+104*i)/2-5,70,70,10);
      if(mouseIsPressed && toolbar[i] !== 0){
        toolbar[i].choosed = true;
        choosed = i;
        if(bookshelfDoorOpened>3){
          bookshelfDoorOpened = 3;
        }
      }
    }
    if(choosed > -1){
      fill(0,0,0,10);
      rect((1260+1335)/2,(90+100*choosed+175+104*choosed)/2-5,70,70,10);
      fill(255);
      textAlign(RIGHT);
      textSize(25);
      text(toolbar[choosed].name, 1235, 50);
    }
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

    rightButton.setDefaultCollider();
    leftButton.setDefaultCollider();

    if(scene === 1){
      note.setDefaultCollider();

      bookshelfDoorOpened = 1;
      bookshelfDoor.setDefaultCollider();
      bookshelfDoor.changeAnimation("normal");
      bookshelfDoor.position.x = 438;

      tableZoom = 1;
      table.setDefaultCollider();
      table.changeAnimation("normal");

      key.setCollider("rectangle",0,0,0,0);
      key.visible = false;

      backToNormal();
    }

    if(scene === 2){
      rightButton.visible = true;
      rightButton.setDefaultCollider;

      cover.setDefaultCollider();
      mirrorZoom = 1;
      mirror.changeAnimation("normal");

      lightSwitch.setDefaultCollider();
      lightSwitchOpened = 1;
      lightSwitch.changeAnimation("normal");
      lightOff.visible = false;

      bag.setDefaultCollider();
      if(rightCounter > 0 && safeKey.visible === true){
        safeKey.setDefaultCollider();
      }

      if(toolbar.indexOf(glass) < 0){
        glassBreakPlayed = 0;
      }
    }
  }
}

function leftKeyPressed(){
  note.visible = false;
  lowerBookshelfDoor.visible = false;
  screwdriver.visible = false;
  book1.visible = false;
  book2.visible = false;
  book3.visible = false;
  book4.visible = false;
  book5.visible = false;
  book6.visible = false;
  bookshelfDoor.visible = false;
  table.visible = false;
  leftButton.visible = false;


  rightButton.visible = true;
  mirror.visible = true;
  cover.visible = true;
  screw1.visible = true;
  screw2.visible = true;
  lightSwitch.visible = true;
  bag.visible = true;

  table.setCollider("rectangle",0,0,0,0);
  mirror.setCollider("rectangle",0,0,0,0);
  leftButton.setCollider("rectangle",0,0,0,0);

  rightButton.setDefaultCollider();
  cover.setDefaultCollider();
  lightSwitch.setDefaultCollider();
  bag.setDefaultCollider();
}

function rightKeyPressed(){
  if(bagOpened){
    rightCounter ++;
  }
  rightButton.visible = false;
  mirror.visible = false;
  lightSwitch.visible = false;
  screw1.visible = false;
  screw2.visible = false;
  cover.visible = false;
  bag.visible = false;
  safeKey.visible = false;



  note.visible = true;
  lowerBookshelfDoor.visible = true;
  screwdriver.visible = true;
  book1.visible = true;
  book2.visible = true;
  book3.visible = true;
  book4.visible = true;
  book5.visible = true;
  book6.visible = true;
  bookshelfDoor.visible = true;
  table.visible = true;
  leftButton.visible = true;


  cover.setCollider("rectangle",0,0,0,0);
  rightButton.setCollider("rectangle",0,0,0,0);
  screw1.setCollider("rectangle",0,0,0,0);
  lightSwitch.setCollider("rectangle",0,0,0,0);
  bag.setCollider("rectangle",0,0,0,0);
  safeKey.setCollider("rectangle",0,0,0,0);

  leftButton.setDefaultCollider();
  table.setDefaultCollider();

}
