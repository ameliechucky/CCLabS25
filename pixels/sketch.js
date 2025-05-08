let img;
let s = 20;
let p = [];
let c = [];
let counter = 0;

function preload() {
  img = loadImage("assets/poster.jpg");
}
function setup() {
  //createCanvas(1080, 1920, WEBGL);
  let canvas = createCanvas(540, 960, WEBGL);
  canvas.parent("p5-canvas-container");
  img.loadPixels(); //very important
  for (let i = 0; i < img.width; i = i + s) {
    for (let j = 0; j < img.height; j = j + s) {
      let index = (i + j * img.width) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let c = color(r, g, b);
      p.push(new Pixel(i, j, c));
    }
  }
}
function draw() {
  background(0);

  push();
  //because of WEBGL
  translate(-width / 2, -height / 2);

  for (let i = 0; i < img.width; i = i + s) {
    for (let j = 0; j < img.height; j = j + s) {
      if (millis() > 3000) {
        p[counter].moveAway();
      }
      p[counter].display();
      counter++;
      counter = counter % p.length;
    }
  }
  pop();
}

class Pixel {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.speedZ = random(-3, 3);
    this.s = s;
    this.c = c;
  }
  display() {
    push();
    translate(this.x, this.y, this.z);
    fill(this.c);
    noStroke();
    rect(0, 0, this.s);
    pop();
  }
  moveAway() {
    this.z = this.z + this.speedZ;
  }
  putBack(sz) {
    this.z = lerp(this.z, 0, sz);
  }
}
