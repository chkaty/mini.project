// 2048
// Katy Chen
// 2018/11/13
//
// Extra for Experts:
// - able to move blocks using different keys and double the value when both of them are same
let cols = 4;
let rows = 4;
let size;
let grid = [];
let x, y, valuesOfGrid;
let end = false;
let start = false;
let gridIsFull = false;
let score;
let backgroundMusic,soundOfSame,gameOver,buttonSound;

function preload() {
  backgroundMusic = loadSound("assets/back.mp3");
  soundOfSame = loadSound("assets/same.wav");
  gameOver = loadSound("assets/over.wav");
  buttonSound = loadSound("assets/button.wav");
}
function setup() {
  createCanvas(600,600);
  backgroundMusic.loop();
  size = width / cols;
  board();
  score = 0;
}

function draw() {
  if(start === false){
    startingPage();
  }
  if(end === false && start === true){
    background(210, 193, 183);
    displayBoard();
    gridIsFull = checkFull();
    end = checkEnd();
  }
  else if (end === true){
    backgroundMusic.pause();
    gameOver.play();
    noLoop();
    //display page of gameover
    fill(210, 193, 183, 200);
    rect(0,0,600,600);
    textSize(0.125*600);
    textAlign(CENTER);
    fill(50);
    text("Game Over", width/2, height/2);
    textSize(0.05*600);
    text("Score: " + score, width/2, height/1.8);
    text("Press space to play again", width/2, height/1.5);
  }
}




function board() {
  for (let y = 0; y < cols; y++) {
    grid.push([]);
    for (let x = 0; x < rows; x++) {
      grid[y].push(0);
    }
  }
  // generate 2 different numbers in different position inside 2D array
  generateRandomValue(2);
}

function displayBoard() {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      //display different color for each value
      if (grid[y][x] === 0) {
        fill(225, 214, 204);
      }
      if (grid[y][x] === 2) {
        fill(252, 246, 241);
      }
      if (grid[y][x] === 4) {
        fill(255, 247, 230);
      }
      if (grid[y][x] === 8) {
        fill(249, 187, 124);
      }
      if (grid[y][x] === 16) {
        fill(255,127,80);
      }
      if (grid[y][x] === 32) {
        fill(255,69,0);
      }
      if (grid[y][x] === 64) {
        fill(255,69,53);
      }
      if (grid[y][x] >= 128) {
        fill(247,263,131);
      }

      //display the block and value on it
      noStroke();
      rect(x * size + 5, y * size + 5, size - 10, size - 10, 10);
      textAlign(CENTER);
      if (grid[y][x] !== 0) {
        if (grid[y][x] <= 4) {
          fill(100);
        }
        else {
          fill(255);
        }
        if(grid[y][x] >= 1000){
          textSize(0.115*600/1.2);
          text(grid[y][x], x * size + 50*1.45, y * size + 70*1.45);
        }
        else if(grid[y][x] >= 100){
          textSize(0.125*600/1.2);
          text(grid[y][x], x * size + 50*1.45, y * size + 70*1.45);
        }
        else{
          textSize(0.125*600);
          text(grid[y][x], x * size + 50*1.45, y * size + 70*1.45);
        }
      }
    }
  }
}

function generateRandomValue(numberOfValue) {
  let counter = 0;
  if (end === false){
    // only change the value when the value of that grid is 0
    for (let i = 0; counter < numberOfValue; i++) {
      x = floor(random(0, cols));
      y = floor(random(0, rows));
      valuesOfGrid = round(random(1, 2));
      if (valuesOfGrid === 1 && grid[y][x] === 0) {
        grid[y][x] = 2;
        counter++;
      }
      else if (valuesOfGrid === 2 && grid[y][x] === 0) {
        grid[y][x] = 4;
        counter++;
      }
    }
  }
}

function keyPressed() {
  if(end === true){
    // space key to restart
    if (keyCode === 32) {
      restart();
      board();
      loop();
    }
  }

  //keys control block to move
  if(end === false){
    if (keyCode === 87 || keyCode === UP_ARROW) {
      up();
    }
    else if (keyCode === 83 || keyCode === DOWN_ARROW) {
      down();
    }
    else if (keyCode === 65 || keyCode === LEFT_ARROW) {
      left();
    }
    else if (keyCode === 68 || keyCode === RIGHT_ARROW) {
      right();
    }

    // generate 1 block when above key is pressed and grid is not full
    if(gridIsFull === false){
      if (keyCode === 87 || keyCode === UP_ARROW || keyCode === 83 || keyCode === DOWN_ARROW || keyCode === 65 || keyCode === LEFT_ARROW || keyCode === 68 || keyCode === RIGHT_ARROW) {
        generateRandomValue(1);
      }
    }
  }
}




function up() {
  let newGrid = grid;
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let value = grid[y][x];
      let newValue = 0;
      //move all block with value > 0 to top
      if (grid[y][x] !== 0 && y !== 0) {
        for (let i = 0; i <= y - 0; i++) {
          if (grid[y - i][x] === 0) {
            newValue = value;
            newGrid[y - i][x] = newValue;
            newGrid[y - i + 1][x] = 0;
          }
        }
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            // if same block is found double the front one and change the back one to 0
            if (newGrid[i][j] !== 0 && i !== 0) {
              value = newGrid[i][j];
              if (newGrid[i-1][j] === value) {
                newValue = value * 2;
                score = score + value;
                soundOfSame.play();
                newGrid[i - 1][j] = newValue;
                newGrid[i][j] = 0;
              }
            }
          }
        }
      }
    }
    // update the grid
    grid = newGrid;
  }
}

//rest are same but different direction
function down() {
  let newGrid = grid;
  for (let y = cols-1; y >= 0; y--) {
    for (let x = rows-1; x >= 0; x--) {
      let value = grid[y][x];
      let newValue = 0;
      if (grid[y][x] !== 0 && y !== 3) {
        for (let i = 0; i <= 3-y; i++) {
          if (grid[y + i][x] === 0) {
            newValue = value;
            newGrid[y + i][x] = newValue;
            newGrid[y + i - 1][x] = 0;
          }
        }
        for (let i = cols-1; i >= 0; i--) {
          for (let j = rows-1; j >= 0 ; j--) {
            if (newGrid[i][j] !== 0 && i !== 3) {
              value = newGrid[i][j];
              if (newGrid[i+1][j] === value) {
                newValue = value * 2;
                soundOfSame.play();
                score = score + value;
                newGrid[i + 1][j] = newValue;
                newGrid[i][j] = 0;
              }
            }
          }
        }
      }
    }
    grid = newGrid;
  }
}

function right() {
  let newGrid = grid;
  for (let y = cols-1; y >= 0; y--) {
    for (let x = rows-1; x >= 0; x--) {
      let value = grid[y][x];
      let newValue = 0;
      if (grid[y][x] !== 0 && x !== 3) {
        for (let i = 0; i <= 3-x; i++) {
          if (grid[y][x + i] === 0) {
            newValue = value;
            newGrid[y][x + i] = newValue;
            newGrid[y][x + i - 1] = 0;
          }
        }
        for (let i = cols-1; i >= 0; i--) {
          for (let j = rows-1; j >= 0 ; j--) {
            if (newGrid[i][j] !== 0 && j !== 3) {
              value = newGrid[i][j];
              if (newGrid[i][j+1] === value) {
                newValue = value * 2;
                score = score + value;
                soundOfSame.play();
                newGrid[i][j+ 1] = newValue;
                newGrid[i][j] = 0;
              }
            }
          }
        }
      }
    }
    grid = newGrid;
  }
}

function left() {
  let newGrid = grid;
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let value = grid[y][x];
      let newValue = 0;
      if (grid[y][x] !== 0 && x !== 0) {
        for (let i = 0; i <= x - 0; i++) {
          if (grid[y][x-i] === 0) {
            newValue = value;
            newGrid[y][x-i] = newValue;
            newGrid[y][x - i + 1] = 0;
          }
        }
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (newGrid[i][j] !== 0 && j !== 0) {
              value = newGrid[i][j];
              if (newGrid[i][j-1] === value) {
                newValue = value * 2;
                score = score + value;
                soundOfSame.play();
                newGrid[i][j-1] = newValue;
                newGrid[i][j] = 0;
              }
            }
          }
        }
      }
    }
    grid = newGrid;
  }
}




function checkFull(){
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      if(grid[y][x] === 0){
        return false;
      }
    }
  }
  return true;
}

function checkEnd(){
//if value of two block are same return false else return true
  if(gridIsFull === true){
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let value = grid[i][j];
        if (i !== 0 ) {
          if(grid[i-1][j] === value) {
            return false;
          }
        }
        if (j !== 0){
          if(grid[i][j-1] === value){
            return false;
          }
        }
      }
    }
    return true;
  }
  else{
    return false;
  }
}

function restart(){
  backgroundMusic.loop();
  end = false;
  gridIsFull = false;
  score = 0;
  grid = [];
}

function startingPage(){
  //displaying button and title
  background(210, 193, 183);
  textSize(0.15*600);
  fill(50);
  textAlign(CENTER);
  text("2048", width/2, height/2);
  textSize(0.03*600);
  text("Join the numbers and get to the 2048 tile!", width/2, height/1.8);
  noStroke();
  fill(202, 194, 104);
  rect(width/2.97,height/1.69,200,50);
  fill(225, 214, 204);
  rect(width/3,height/1.72,200,50);
  textSize(0.06*600);
  fill(70);
  text("START", width/2, height/1.55);
  if(mouseX > width/2-100 && mouseX < width/2+100 && mouseY > height/1.6-25 && mouseY < height/1.6+25){
    noStroke();
    fill(70);
    rect(width/2.97,height/1.69,200,50);
    fill(225, 214, 204);
    rect(width/3,height/1.72,200,50);
    textSize(0.06*600);
    fill(202, 194, 104);
    text("START", width/2, height/1.55);
    if(mouseIsPressed){
      buttonSound.play();
      start = true;
    }
  }
}
