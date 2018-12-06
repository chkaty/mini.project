// Turtle and Shape
// Katy Chen && Marghoob Dar
// 2018/12/5
//
// Extra for Experts:
// Use functions in list, input and collision detection

let turtle = { pos: {
  x: -8,
  y: -10
},
newX: -8,
angle: 0,
penDown: true,
distance: 0,
visible: true
};


let functions;
let number;
let myFunction;
let forwardDone;
let turnDone;
let lines = [];
let input,button,movement;
let speed = 60;
let turtleStart = false;
let start = true;
let shapeStart = false;
let askInput = false;
let instruction = 0;
let hitboxColour1;
let hitboxColour2;


function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);

  functions = [];
}


function draw() {

  if(start){
    //creat a starting page to let user choose from turtle and shape
    startPage();
  }

  if(turtleStart){
    backButton();
    //ask user to input different kinds of function
    if(askInput){
      background(220);
      input = createInput();
      input.position(15, 50);

      button = createButton("submit");
      button.position(input.x + input.width, 50);
      button.mousePressed(inputValue);

      movement = createElement("h2", "Movement?");
      movement.position(15, 0);

      textAlign(CENTER);
      textSize(25);
      askInput = false;
    }

    translate(width/2,height/2);
    background(220);
    //change speed
    frameRate(speed);

    //draw the path after function is done
    for(let j = 0; j < lines.length; j++){
      translate(lines[j].trans.x,lines[j].trans.y);
      rotate(lines[j].rota);
      if(lines[j].penDown){
        line(lines[j].x,lines[j].y,lines[j].x1,lines[j].y1);
      }
    }

    //excute the function and delete it form the list when it's done
    for(let i = functions.length-1; i>=0; i--){
      if(functions[i] === forward && !forwardDone){
        forward(number);
      }
      else if(functions[i] === turn && !turnDone){
        turn(number);
      }


      if(forwardDone){
        forwardDone = !forwardDone;
        functions.splice(i,1);
      }
      if(turnDone){
        turnDone = !turnDone;
        functions.splice(i,1);
      }
    }
    turtleVisible();
  }

  if(shapeStart){
    //not done yet
    backButton();
    background(220);
    fill(0);
    text("...",width/2,height/2);
  }
}

//display turtle
function turtleVisible(){
  if(turtle.visible){
    fill("green");
    triangle(turtle.pos.x, turtle.pos.y+20, turtle.pos.x, turtle.pos.y, turtle.pos.x+20, turtle.pos.y+10);
  }
}

//move forward
function forward(distance) {
  if(turtle.newX + distance > turtle.pos.x){
    turtle.pos.x += 1;
    turtle.distance += 1;
    if(turtle.penDown){
      lineVisible(distance);
    }
  }
  else{
    turtle.newX = turtle.pos.x;
    forwardDone = true;
    turnDone = false;
  }
}

function turn(angle){
  //set turtle position to zero(centered)
  turtle.pos.x = -8;
  turtle.pos.y = -10;
  turtle.newX = -8;

  if(turtle.angle > -angle){
    translate(turtle.distance,0);
    turtle.angle -= 1;
    rotate(turtle.angle);
  }

  //when move to the angle asked, record the information to list
  else{
    let myLine = { trans: {
      x: turtle.distance,
      y: 0
    },
    rota: -angle,
    x: 0,
    y: 0,
    x1:0,
    y1:0
    };
    lines.push(myLine);


    turnDone = true;
    forwardDone = false;

    //move turtle
    translate(turtle.distance,0);
    rotate(turtle.angle);

    //set angle and distance zero to prepare for next movement
    turtle.angle = 0;
    turtle.distance = 0;
  }
}

function lineVisible(value){
  if(turtle.newX + value <= turtle.pos.x){
    let myLine = { trans: {
      x: 0,
      y: 0
    },
    rota: 0,
    x: 0,
    y: 0,
    x1:turtle.distance,
    y1:0,
    penDown: turtle.penDown
    };
    lines.push(myLine);
  }
  line(0,0,turtle.distance,0);
}

//inputs user can enter
function inputValue(){
  myFunction = input.value();

  if(myFunction.indexOf("forward") > -1){
    functions.push(forward);
    checkNumber();
  }

  if(myFunction.indexOf("turn") > -1){
    functions.push(turn);
    checkNumber();
  }

  if(myFunction.indexOf("showTurtle()") > -1){
    turtle.visible = true;
  }

  if(myFunction.indexOf("hideTurtle()") > -1){
    turtle.visible = false;
  }

  if(myFunction.indexOf("penDown()") > -1){
    turtle.penDown = true;
  }

  if(myFunction.indexOf("penUp()") > -1){
    turtle.penDown = false;
  }

  if(myFunction.indexOf("speed") > -1){
    checkNumber();
    speed = 60*(number/10);
  }
}

//find the number in input
function checkNumber(){
  number = "";
  for(let i = 0; i < myFunction.length; i++){
    if(!isNaN(myFunction[i])){
      number = number + myFunction[i];
    }
  }
  number = int(number);
}

function startPage(){
  let w = 100/400*width;
  let h = 20/400*width;
  let x = width/2-w/2;
  let y =	height/5*2;

  background(220);
  textSize(15/400*width);
  textAlign(CENTER);

  let hitbox1 = collidePointRect(mouseX, mouseY, x, y, w, h);

  if (hitbox1) {
    fill(0);
    hitboxColour1 = 255;
    if(mouseIsPressed){
      turtleStart = true;
      askInput = true;
      instruction += 1;
      if(instruction === 3){
        alert("You can input: forward(unlimited), turn(0-360), hideTurtle(), showTurtle(), penDown(), penUp(), speed(0-10).");
        start = false;
      }
    }
  }

  else {
    fill(255);
    hitboxColour1 = 0;
  }
  rect(x, y, w, h);
  fill(hitboxColour1);
  text("Turtle",width/2,y+h/1.25);

  y =	height/5*3;
  let hitbox2 = collidePointRect(mouseX, mouseY, x, y, w, h);
  if (hitbox2) {
    fill(0);
    hitboxColour2 = 255;
    if(mouseIsPressed){
      shapeStart = true;
      start = false;
    }
  }
  else {
    fill(255);
    hitboxColour2 = 0;
  }
  rect(x, y, w, h);
  fill(hitboxColour2);
  text("Shape",width/2,y+h/1.25);
}

//button that could return to start page
function backButton(){
  button = createButton("Back");
  button.position(width/15*14, 20);
  button.mousePressed(back);
}

function back(){
  removeElements();
  turtleStart = false;
  start = true;
  shapeStart = false;
  askInput = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Katy: made the choice turtle in this program and the possible way to combine two different choise
//Marghoob: made the choice shape in this program
