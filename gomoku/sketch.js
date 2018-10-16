// Project Title: Gomoku
// Your Name: Katy Chen
// Date: 2018/10/13
//
// Extra for Experts: arrays is used in my project
// Array and object used to draw multiple chess at different place.

let coordinateX = [];
let coordinateY = [];
let chessPlaced = [];
let whiteChess = [];
let blackChess = [];
let colour;
let colorOfChess;
let end = false;
let chessWin;
let chessDown;
let down;
let backgroundMusic;

function preload() {
  backgroundMusic = loadSound("assets/back.mp3");
  down = loadSound("assets/down.wav");
}

function setup() {
  createCanvas(400, 400);
  colour = round(random(0,1));
  if(colour === 0){
    // true is white, false is black
    colorOfChess = true;
  }
  else{
    colorOfChess = false;
  }
  backgroundMusic.setVolume(0.3);
  // Instruction for game
  window.alert("Players alternate in placing a stone of their color on an empty intersection. The winner is the first player to get an unbroken row of five stones horizontally, vertically, or diagonally.");
  backgroundMusic.loop();
}

function draw() {
  if (end === false){
    backgroundImage();
    drawChess();
    wayToEndGame();
  }
  else{
    gameEndPage();
  }
}



function backgroundImage(){
  background(230);
  stroke(180);
  strokeWeight(2);
  for(let x = 25; x < width; x+=25){
    line(x,0,x,height);
  }
  for(let y = 25; y < height; y+=25){
    line(0,y,width,y);
  }
  // geting the intersection
  for(let x = 25; x < width; x+=25){
    for(let y = 25; y < height; y+=25){
      append(coordinateX, x);
      append(coordinateY, y);
    }
  }
}

function drawChess(){
  ellipseMode(CENTER);
  strokeWeight(0);
  if (colorOfChess){
    fill(250);
  }
  else{
    fill(50);
  }
  ellipse(mouseX, mouseY,20,20);
  // draw the placed chess in for loop
  for(let i = 0; i< chessPlaced.length; i++){
    fill(chessPlaced[i].c);
    ellipse(chessPlaced[i].x, chessPlaced[i].y,chessPlaced[i].radius, chessPlaced[i].radius);
  }
}

function mouseClicked() {
  // if not in a specific range near intersection
  if(!(findNearstXPosition() === "undefine" || findNearstYPosition() === "undefine")){
    if(colorOfChess){
      chessDown = {
        x: findNearstXPosition(),
        y: findNearstYPosition(),
        radius: 20,
        c: color(250),
      };
      // if the position is empty
      if(checkSame(chessDown)){
        down.play();
        chessPlaced.push(chessDown);
        whiteChess.push(chessDown);
        colorOfChess = !colorOfChess;
      }
    }
    else{
      chessDown = {
        x: findNearstXPosition(),
        y: findNearstYPosition(),
        radius: 20,
        c: color(50),
      };
      if(checkSame(chessDown)){
        down.play();
        chessPlaced.push(chessDown);
        blackChess.push(chessDown);
        colorOfChess = !colorOfChess;
      }
    }
  }
}

function findNearstXPosition(){
  for(let i = 0; i < coordinateX.length; i++){
    if (abs(coordinateX[i] - mouseX)< 7){
      return coordinateX[i];
    }
  }
  return "undefine";
}

function findNearstYPosition(){
  for(let i = 0; i < coordinateY.length; i++){
    if (abs(coordinateY[i] - mouseY)< 7){
      return coordinateY[i];
    }
  }
  return "undefine";
}

function checkSame(object){
  if (chessPlaced.length >= 1){
    for(let i = 0; i < chessPlaced.length; i++){
      if (chessPlaced[i].x === object.x && chessPlaced[i].y === object.y){
        return false;
      }
    }
    return true;
  }
  else{
    return true;
  }
}



function wayToEndGame(){
  horizontalWin(whiteChess);
  horizontalWin(blackChess);
  verticleWin(whiteChess);
  verticleWin(blackChess);
  diagonalWin(whiteChess,1,1);
  diagonalWin(whiteChess,-1,1);
  diagonalWin(whiteChess,1,-1);
  diagonalWin(whiteChess,-1,-1);
  diagonalWin(blackChess,1,1);
  diagonalWin(blackChess,1,-1);
  diagonalWin(blackChess,-1,1);
  diagonalWin(blackChess,-1,-1);
  filledWithChess();
}


function horizontalWin(chess){
  for(let i = 0; i < chess.length; i++){
    let inARow = 1;
    for(let j = 0; j < chess.length; j++){
      if (chess[i].y === chess[j].y){
        //check if there are two chess both on left and right
        if (abs(chess[i].x - chess[j].x) === 25 || abs(chess[i].x - chess[j].x) === 50){
          inARow +=1;
          if(inARow === 5){
            end = true;
            // let chess equal to the value of input to determine the wining chess
            chessWin = chess;
          }
        }
      }
    }
  }
}

function verticleWin(chess){
  for(let i = 0; i < chess.length; i++){
    let inARow = 1;
    for(let j = 0; j < chess.length; j++){
      if (chess[i].x === chess[j].x){
        if (abs(chess[i].y - chess[j].y) === 25 || abs(chess[i].y - chess[j].y) === 50){
          inARow +=1;
          if(inARow === 5){
            end = true;
            chessWin = chess;
          }
        }
      }
    }
  }
}

// xLine and yLine to determine the direction chess placed
function diagonalWin(chess,xLine,yLine){
  for(let i = 0; i < chess.length; i++){
    let inARow = 1;
    for(let j = 0; j < chess.length; j++){
      // check in on direction for five chess
      if (chess[i].x - chess[j].x === 25*xLine && chess[i].y - chess[j].y === 25*yLine || chess[i].x - chess[j].x === 50*xLine && chess[i].y - chess[j].y === 50*yLine || chess[i].x - chess[j].x === 75*xLine && chess[i].y - chess[j].y === 75*yLine || chess[i].x - chess[j].x === 100*xLine && chess[i].y - chess[j].y === 100*yLine){
        inARow +=1;
      }

    }
    if(inARow === 5){
      end = true;
      chessWin = chess;
    }
  }
}

function filledWithChess(){
  if (chessPlaced.length === 225){
    end = 2;
  }
}

// show the end page after game ended
function gameEndPage(){
  background(230);
  fill(0);
  textSize(36);
  textAlign(CENTER);
  if(chessWin === whiteChess){
    text("White Chess Win", 200, 200);
  }
  else if (chessWin === blackChess){
    text("Black Chess Win", 200, 200);
  }
  else{
    text("A Tie", 200, 200);
  }
}
