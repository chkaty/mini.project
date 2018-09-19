// Images
// Katy Chen
// 2018/9/19
//

let fish;
let scalar;
function  preload() {
  fish = loadImage("assets/nemo.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  scalar = 2;
}

function mouseWheel() {
  if (event.delta > 0 && scalar < 4){
    scalar = scalar * 1.1
  }
  else if (event.delta < 0 && scalar > 0.3){
    scalar = scalar * 0.9
  }
  console.log(scalar)
}

function draw() {
  background(255);
  image(fish, mouseX, mouseY, fish.width *scalar, fish.height*scalar);


}
