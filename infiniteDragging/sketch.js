let img;
let right = false;
let left = false;
let x1, x2;
let delta = 0;
let speedX = 1;
function preload() {
  img = loadImage("assets/trees.png");
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("p5-canvas-container");
  x1 = 0;
  x2 = -img.width;
}
function draw() {
  background(255);
  image(img, x1, 0);
  // push();
  // tint(255, 0, 0, 20);
  image(img, x2, 0);
  // pop();

  if (mouseIsPressed) {
    delta = 2 * (mouseX - pmouseX);
  }
  x1 = lerp(x1, x1 + delta, 0.1);
  x2 = lerp(x2, x2 + delta, 0.1);

  if (delta > 0) {
    delta = delta - 0.5; //move right
    right = true;
    left = false;

  } else if (delta < 0) {
    delta = delta + 0.5; //move left
    right = false;
    left = true;
  }
  else {
    delta = 0;
    right = false;
    left = false;
  }
  if (right) {
    if (x1 > width) {
      x1 = x2 - img.width;
    }
    if (x2 > width) {
      x2 = x1 - img.width;
    }
  }

  if (left) {
    if (x1 < 0) {
      x2 = x1 + img.width;
    }
    if (x2 < 0) {
      x1 = x2 + img.width;
    }
  }

}