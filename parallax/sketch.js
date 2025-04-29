let pix = [];
let img = [];
function preload() {
  for (let i = 1; i < 5; i++) {
    let fileName = 'assets/' + i + '.png';
    img.push(loadImage(fileName));
  }
}
function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < img.length; i++) {
    pix[i] = new Pix(img[i], i + 0.5);
  }
}
function draw() {
  background(0);
  for (let i = 0; i < img.length; i++) {
    pix[i].update(pix[3]);
    pix[i].display();
  }

}
class Pix {
  constructor(pix, i) {
    this.pix = pix;
    this.x = -this.pix.width / 2;
    this.y = 0;
    this.speedX = i;
  }
  display() {
    image(this.pix, this.x, this.y);
  }
  update(other) {
    if (mouseX > width / 2 * 1.5 && (width - other.x) < other.pix.width) {
      this.x = this.x - this.speedX;
    }
    if (mouseX < width / 2 * 0.5 && other.x < other.pix.width / 2 - this.pix.width / 2) {
      this.x = this.x + this.speedX;
    } else {
      this.x = this.x;
    }

  }
}

