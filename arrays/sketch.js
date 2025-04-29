let x = [];
let y = [];
let y0 = [];
let s = [];
let speedX = [];
let n = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < n; i++) {
    x[i] = random(-width * 0.5, -width * 0.2);
    y0[i] = random(height);
    y[i] = 0;
    s[i] = random(50, 100);
    speedX[i] = map(s[i], 50, 100, 2, 0.5);
  }
}

function draw() {
  background(220);
  for (let i = 0; i < x.length; i++) {
    drawCloud(x[i], y[i], s[i]);
  }
  move();
  console.log(x.length);
}

function move() {
  for (let i = 0; i < x.length; i++) {
    x[i] = x[i] + speedX[i];
    y[i] = y0[i] + 100 * sin(noise(frameCount * 0.01));
    if (x[i] > width * 1.1) {
      x[i] = random(-width * 0.5, -width * 0.2);
      y0[i] = random(height);
      y[i] = 0;
      s[i] = random(50, 100);
      speedX[i] = map(s[i], 50, 100, 2, 0.5);
    }
  }
}
function drawCloud(x, y, s) {
  push();
  translate(x, y);
  fill(255);
  noStroke();
  circle(0, 0, s);
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    let s2 = map(noise(angle * s), 0, 1, s * 0.1, s);
    circle(s * 0.5, 0, s2);
    pop();
  }
  pop();
}

function mousePressed() {
  x.push(mouseX);
  y0.push(mouseY);
  y.push(0);
  s.push(random(50, 100));
  speedX.push(map(s[s.length - 1], 50, 100, 2, 0.5));
}

function keyPressed() {
  x.splice(0, 1);
  y0.splice(0, 1);
  y.splice(0, 1);
  s.splice(0, 1);
  speedX.splice(0, 1);
}

