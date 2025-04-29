
let cloud = [];
let rain = [];
let mySound;
function preload() {
  mySound = loadSound("assets/thunder.mp3");
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}
function draw() {
  background(220);
  for (let i = 0; i < cloud.length; i++) {
    cloud[i].display();
    cloud[i].update();
    for (let j = 0; j < cloud.length; j++) {
      if (i != j) {
        cloud[i].checkCollision(cloud[j]);
        if (cloud[i].isRaining == true) {
          rain.push(new Rain(cloud[i].x, cloud[i].y, cloud[i].h));
        }
      }
    }
  }
  for (let i = cloud.length - 1; i >= 0; i--) {
    if (cloud[i].isGone == true) {
      cloud.splice(i, 1);
    }
  }
  while (rain.length > 300) {
    rain.splice(0, 1);
  }
  for (let i = 0; i < rain.length; i++) {
    rain[i].display();
    rain[i].update();
  }
  console.log(rain.length);
}
function mousePressed() {
  cloud.push(new Cloud(mouseX, mouseY));
}