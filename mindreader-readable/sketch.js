// Mindreader
// Dan Schellenberg
// Nov 5, 2018

let choiceHistory;
let lastFourGuesses;
let computerScore;
let userScore;
let userChoice;
let computerGuess;
let gameIsOver;
let scoreToWin;
let textSizeVariable;

function setup() {
  // setup game logic
  resetGame();
  predictUserChoice();

  // Graphical stuff
  createCanvas(windowWidth, windowHeight);
  textSizeVariable = width / 30;
  background(255);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(textSizeVariable);
  text("You need to outsmart my computer program.\nI will predict whether you will choose tails or heads.\n\nIf I'm right, I get 1 point.\nIf I'm wrong, you get 1 point.\n\nThe game goes to " + scoreToWin + " points.\n\nPress the t or h key to begin.", width/2, height/2);
  noLoop();
}

function draw() {
  
}


function resetGame() {
  choiceHistory = new Map();
  lastFourGuesses = "";
  computerScore = 0;
  userScore = 0;
  userChoice;
  computerGuess;
  gameIsOver = false;
  scoreToWin = 50;
}

function takeTurn() {
  determineWinner();
  updateDisplay();
  rememberChoice();
  if (lastFourGuesses.length < 4) { //if haven't taken 4 guesses yet, just add new guess to guess history
    lastFourGuesses = lastFourGuesses + userChoice;
  }
  else {
    lastFourGuesses = lastFourGuesses.substring(1,4) + userChoice; //tack on the newest guess on the right, only keeping the previous 3 on the right
  }
  predictUserChoice();
}

function rememberChoice() {
  if (lastFourGuesses.length === 4) {
    if (choiceHistory.has(lastFourGuesses)) {
      // have seen this pattern before -- get current info and update it
      let headsCount = choiceHistory.get(lastFourGuesses).h;
      let tailsCount = choiceHistory.get(lastFourGuesses).t;
      if (userChoice === "h") {
        headsCount++;
      }
      else if (userChoice === "t") {
        tailsCount++;
      }
      choiceHistory.set(lastFourGuesses, {
        "h": headsCount,
        "t": tailsCount,
      });
    }
    else {
      // haven't seen this pattern before -- add a new entry
      if (userChoice === "h") {
        choiceHistory.set(lastFourGuesses, {
          "h": 1,
          "t": 0
        });
      }
      else {
        choiceHistory.set(lastFourGuesses, {
          "h": 0,
          "t": 1
        });
      }
    }
  }
}

function predictUserChoice() {
  if (choiceHistory.has(lastFourGuesses)) { //have seen this pattern before
    //predict cleverly
    if (choiceHistory.get(lastFourGuesses).t > choiceHistory.get(lastFourGuesses).h) {
      computerGuess = "t";
    } 
    else if (choiceHistory.get(lastFourGuesses).h > choiceHistory.get(lastFourGuesses).t) {
      computerGuess = "h";
    } 
    else {
      //predict randomly
      if (random(100) < 50) {
        computerGuess = "h";
      } 
      else {
        computerGuess = "t";
      }
    }
  }
  else {
    //predict randomly
    if (random(100) < 50) {
      computerGuess = "h";
    } 
    else {
      computerGuess = "t";
    }
  }
}

function determineWinner() {
  if (computerGuess === userChoice) {
    computerScore++;
  } 
  else {
    userScore++;
  }
  if (computerScore === scoreToWin || userScore === scoreToWin) {
    gameIsOver = true;
  }
}

function keyTyped() {
  if (key === "h") {
    userChoice = "h";
    takeTurn();
  } 
  else if (key === "t") {
    userChoice = "t";
    takeTurn();
  }
  else if (key === "s") {
    setup();
  }
}

// Graphical UI code

function updateDisplay() {
  if (!gameIsOver) {
    background(255);
    showProgressBars();
    fill(0);
    textAlign(LEFT);
    textSize(textSizeVariable);
    let predictMessage = "I predicted ";
    let youPickedMessage = "You picked ";
    text(predictMessage, width/2 - textSizeVariable*2.7, height/2 - textSizeVariable*2.5);
    text(youPickedMessage, width/2 - textSizeVariable*2.7, height/2 - textSizeVariable);

    // colored choice variables
    fill(0, 0, 255);
    text(computerGuess, width/2 - textSizeVariable*2.7 + textWidth(predictMessage), height/2 - textSizeVariable*2.5);
    fill(0, 255, 0);
    text(userChoice, width/2 - textSizeVariable*2.7 + textWidth(youPickedMessage), height/2 - textSizeVariable);

    fill(0);
    textAlign(CENTER);
    text("User: " + userScore + "\nComputer: " + computerScore, width/2, height/2 + textSizeVariable*2.5);
  }
  else {
    background(255);
    textAlign(CENTER);
    textSize(textSizeVariable);
    if (userScore > computerScore) {
      fill(0, 255, 0);
      text("You win!\nI'm impressed!\nPress s to play again.", width/2, height/2);
    }
    else {
      fill(0, 0, 255);
      text("You lose!\nBetter luck next time!\nPress s to play again.", width/2, height/2);
    }
  }
}

function showProgressBars() {
  let barWidth = width / 6;
  //human
  noStroke();
  let percentToHumanWin = userScore / scoreToWin;
  fill(0, 255, 0);
  rect(0, height - height*percentToHumanWin, barWidth, height*percentToHumanWin);

  //computer
  let percentToComputerWin = computerScore / scoreToWin;
  fill(0, 0, 255);
  rect(width-barWidth, height - height*percentToComputerWin, barWidth, height*percentToComputerWin);
}

// reset the game and resize everything if window size is changed
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}