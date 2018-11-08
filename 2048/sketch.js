// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let cols = 4;
let rows = 4;
let size;
let arr = [];
let x, y, number;
let startingPos = 0;
let end = false;
let full = false;

function setup() {
  createCanvas(600,600);
  size = width / cols;
  board();
}

function draw() {
  checkEnd();
  checkFull();
  if(end  === false){
  	background(210, 193, 183);
  	displayBoard();
  }
  else{
    background(210, 193, 183);
  }
}


function board() {
  for (let y = 0; y < cols; y++) {
    arr.push([]);
    for (let x = 0; x < rows; x++) {
      arr[y].push(0);
    }
  }
  randomPos(10);
}

function displayBoard() {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      if (arr[y][x] === 0) {
        fill(225, 214, 204);
      }
      if (arr[y][x] === 2) {
        fill(252, 246, 241);
      }
      if (arr[y][x] === 4) {
        fill(255, 247, 230);
      }
      if (arr[y][x] === 8) {
        fill(249, 187, 124);
      }
      if (arr[y][x] === 16) {
        fill(255,127,80);
      }
      if (arr[y][x] === 32) {
        fill(255,69,0);
      }
      if (arr[y][x] === 64) {
        fill(255,69,53);
      }
      if (arr[y][x] >= 128) {
        fill(247,263,131);
      }


      noStroke();
      rect(x * size + 5, y * size + 5, size - 10, size - 10, 10);
      textAlign(CENTER);
      if (arr[y][x] !== 0) {
        if (arr[y][x] <= 4) {
          fill(100);
        } else {
          fill(255);
        }
        if(arr[y][x] > 100){
          textSize(0.125*600/1.2);
          text(arr[y][x], x * size + 50*1.45, y * size + 70*1.45);
        }
        else{
          textSize(0.125*600);
          text(arr[y][x], x * size + 50*1.45, y * size + 70*1.45);
        }
      }
    }
  }
}


function randomPos(times) {
  let time = 0
  if (end === false){
  	for (let i = 0; time < times; i++) {
    	x = floor(random(0, cols));
    	y = floor(random(0, rows));
    	number = round(random(1, 2));
    	if (number === 1 && arr[y][x] === 0) {
      	arr[y][x] = 2;
      	time++
    	} else if (number === 2 && arr[y][x] === 0) {
      	arr[y][x] = 4;
      	time++
    	}
  	}
  }
}

function keyPressed() {
  if(end === false){
  	if (key === 'w' || keyCode === UP_ARROW) {
    	up();
  	}
  	else if (key === 's' || keyCode === DOWN_ARROW) {
    	down();
 	 	}
  	else if (key === 'a' || keyCode === DOWN_ARROW) {
    	left();
  	}
  	else if (key === 'd' || keyCode === DOWN_ARROW) {
    	right();
  	}
    randomPos(1);
  }
}

function up() {
  let newArray = arr;
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let value = arr[y][x];
      let newValue = 0;
      if (arr[y][x] !== 0 && y !== 0) {
        for (let i = 0; i <= y - 0; i++) {
          if (arr[y - i][x] === 0) {
            newValue = value;
            newArray[y - i][x] = newValue;
            newArray[y - i + 1][x] = 0;
          }
        }
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (newArray[i][j] !== 0 && i !== 0) {
              value = newArray[i][j]
              if (newArray[i-1][j] === value) {
                newValue = value * 2;
                newArray[i - 1][j] = newValue;
                newArray[i][j] = 0;
              }
            }
          }
        }
      }
    }
    arr = newArray
  }
}

function down() {
  let newArray = arr;
  for (let y = cols-1; y >= 0; y--) {
    for (let x = rows-1; x >= 0; x--) {
      let value = arr[y][x];
      let newValue = 0;
      if (arr[y][x] !== 0 && y !== 3) {
        for (let i = 0; i <= 3-y; i++) {
          if (arr[y + i][x] === 0) {
            newValue = value;
            newArray[y + i][x] = newValue;
            newArray[y + i - 1][x] = 0;
          }
        }
        for (let i = cols-1; i >= 0; i--) {
          for (let j = rows-1; j >= 0 ; j--) {
            if (newArray[i][j] !== 0 && i !== 3) {
              value = newArray[i][j]
              if (newArray[i+1][j] === value) {
                newValue = value * 2;
                newArray[i + 1][j] = newValue;
                newArray[i][j] = 0;
              }
            }
          }
        }
      }
    }
    arr = newArray
  }
}

function right() {
  let newArray = arr;
  for (let y = cols-1; y >= 0; y--) {
    for (let x = rows-1; x >= 0; x--) {
      let value = arr[y][x];
      let newValue = 0;
      if (arr[y][x] !== 0 && x !== 3) {
        for (let i = 0; i <= 3-x; i++) {
          if (arr[y][x + i] === 0) {
            newValue = value;
            newArray[y][x + i] = newValue;
            newArray[y][x + i - 1] = 0;
          }
        }
        for (let i = cols-1; i >= 0; i--) {
          for (let j = rows-1; j >= 0 ; j--) {
            if (newArray[i][j] !== 0 && j !== 3) {
              value = newArray[i][j]
              if (newArray[i][j+1] === value) {
                newValue = value * 2;
                newArray[i][j+ 1] = newValue;
                newArray[i][j] = 0;
              }
            }
          }
        }
      }
    }
    arr = newArray
  }
}

function left() {
  let newArray = arr;
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let value = arr[y][x];
      let newValue = 0;
      if (arr[y][x] !== 0 && x !== 0) {
        for (let i = 0; i <= x - 0; i++) {
          if (arr[y][x-i] === 0) {
            newValue = value;
            newArray[y][x-i] = newValue;
            newArray[y][x - i + 1] = 0;
          }
        }
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (newArray[i][j] !== 0 && j !== 0) {
              value = newArray[i][j]
              if (newArray[i][j-1] === value) {
                newValue = value * 2;
                newArray[i][j-1] = newValue;
                newArray[i][j] = 0;
              }
            }
          }
        }
      }
    }
    arr = newArray
  }
}

function checkFull(){
  let count = 0;
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      if(arr[y][x] !== 0){
        count++;
      }
    }
  }
  if(count === 16){
    full = true;
  }
}

function checkEnd(){
  if(full === true){
  	for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        value = arr[i][j]
        if (i !== 0 ) {
          if (arr[i-1][j] === value) {
            end = false;
          }
        }
        else if (i !== 3){
          if (arr[i+1][j] === value){
            end = false;
          }
        }
        else if (j !== 0){
          if (arr[i][j-1] === value){
            end = false;
          }
        }
        else if (j !== 0){
          if (arr[i][j+ 1] === value){
            end = false;
          }
        }
        else{
        }
        end = true
      }
    }
  }
}
