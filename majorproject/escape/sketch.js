// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let object;
let time = 0;
let tools = []
function preload() {

  //create an animation from a sequence of numbered images
  //pass the first and the last file name and it will try to find the ones in between
  object = loadAnimation('assets/object.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  object = createSprite(200, 200);
  object.addAnimation("normal",'assets/object.png');
  object.addAnimation("turn",'assets/triangle.png');
  object.setCollider('rectangle', 0, 0, 200, 200);
  object.onMousePressed = function() {
    this.changeAnimation('turn');
    time += 1;
  };
}

function draw() {
  background(200);
  drawSprites();
  if(time %2 != 0){
    object.addAnimation("turn",'assets/triangle.png');
  }
  else{
    object.addAnimation("turn",'assets/object.png');
  }
}
