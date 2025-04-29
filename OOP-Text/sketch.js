let c = [];
let mic;
let counter = 0;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  mic = new p5.AudioIn();
  mic.start();
}
function draw() {
  background(255);


  if (keyIsPressed) {
    counter++;
    counter = constrain(counter, 0, 10);
    let s = map(counter, 0, 10, 20, 300);
    c.push(new Character(key, s));
  }
  for (let i = 0; i < c.length; i++) {
    c[i].update();
    c[i].updateLifespan();
    c[i].display();
    for (let j = 0; j < c.length; j++) {
      if (i != j) {
        c[i].connect(c[j]);
      }
    }

    if (c[i].isDone) {
      c.splice(i, 1);
    }
  }
}
function keyReleased() {
  counter = 0;
}
class Character {
  constructor(c, cs) {
    this.c = c;
    this.x = random(width);
    this.y = random(height);
    this.s = cs;
    this.lifespan = 10;
    this.lifeReduction = map(this.s, 20, 300, 0.1, 0.01);
    this.isDone = false;
  }
  display() {
    //let op = map(this.lifespan, 10, 0, 255, 0);

    //let op = map(level, 0, 0.5, 0, 255);
    fill(0, op);
    noStroke();
    textSize(this.s);
    text(this.c, this.x, this.y);
  }
  update() {
    let sx = this.c.charCodeAt(0) / this.s;
    let level = mic.getLevel();
    console.log(level);
    let s = map(level, 0, 0.5, 20, 500);
    //console.log(sx);
    this.x = width * noise(frameCount * 0.01 / sx);
    this.y = height * noise((frameCount * 0.3) / this.s);
  }
  updateLifespan() {
    if (this.lifespan > 0) {
      this.lifespan = this.lifespan - this.lifeReduction;
    } else {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  connect(other) {
    if (this.c != other.c) {
      stroke(0, 20);
      line(this.x, this.y, other.x, other.y);
    }
  }

}