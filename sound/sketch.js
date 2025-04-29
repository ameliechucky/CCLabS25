let mySound;
let mySound1;
let x = 0;
let speed = 5;
function preload(){
    mySound = loadSound("assets/beat.mp3");
    mySound1 = loadSound("assets/kick.mp3");
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);
  fill(0);
  circle(x,height/2,30);
  x+=speed;
  
  if(x>width){
    speed = -speed;
    mySound.play();
  }
  if(x<0){
    speed = -speed;
    mySound1.play();
  }
    
}


  
