// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

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


function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);

  functions = [];

  input = createInput();
  input.position(15, 50);

  button = createButton("submit");
  button.position(input.x + input.width, 50);
  button.mousePressed(inputValue);

  movement = createElement("h2", "Movement?");
  movement.position(15, 0);

  textAlign(CENTER);
  textSize(25);
  alert("You can input: forward(), turn(), hideTurtle(), showTurtle(), penDown(), penUp().");
}


function draw() {
  translate(width/2,height/2);
  background(220);
  frameRate(90);

  for(let j = 0; j < lines.length; j++){
    translate(lines[j].trans.x,lines[j].trans.y);
    rotate(lines[j].rota);
    if(lines[j].penDown){
      line(lines[j].x,lines[j].y,lines[j].x1,lines[j].y1);
    }
  }


  for(let i = functions.length-1; i>=0; i--){
    if(functions[i] === forward &&!forwardDone){
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


function turtleVisible(){
  if(turtle.visible){
    fill("green");
    triangle(turtle.pos.x, turtle.pos.y+20, turtle.pos.x, turtle.pos.y, turtle.pos.x+20, turtle.pos.y+10);
  }
}

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
  turtle.pos.x = -8;
  turtle.pos.y = -10;
  turtle.newX = -8;
  if(turtle.angle > -angle){
    translate(turtle.distance,0);
    turtle.angle -= 1;
    rotate(turtle.angle);
  }
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
    translate(turtle.distance,0);
    rotate(turtle.angle);
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

}

function checkNumber(){
  number = "";
  for(let i = 0; i < myFunction.length; i++){
    if(!isNaN(myFunction[i])){
      number = number + myFunction[i];
    }
  }
  number = int(number);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
