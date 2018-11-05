// Grid
// Dan Schellenberg
// Oct 24, 2018

let rows;
let cols;
let grid;
let cellSize;

function preload(){
  grid = loadStrings("assets/maze1.txt");
}

function setup() {
  rows = grid[0].length;
  cols = grid[0].length;
  createCanvas(600, 600);
  cellSize = width / cols;
  //grid = createRandom2dArray(cols, rows);
  clearnUp();
}

function draw() {
  background(255);
  displayGrid();
}

function clearnUp(){
  for(let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split("");
  }
}

function mousePressed() {
  let x = floor(mouseX / cellSize);
  let y = floor(mouseY / cellSize);

  if (grid[y][x] === "1") {
    grid[y][x] = "0";
  }
  else if (grid[y][x] === "0") {
    grid[y][x] = "1";
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === "0") {
        fill(0);
      }
      else {
        fill(255);
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function createRandom2dArray(cols, rows) {
  let randomGrid = [];
  for (let y = 0; y < rows; y++) {
    randomGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        randomGrid[y].push(0);
      }
      else {
        randomGrid[y].push(1);
      }
    }
  }
  return randomGrid;
}
