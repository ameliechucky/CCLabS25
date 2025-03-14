let x, y;
let angle = 0;
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-canvas');
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  push();
  translate(x,y);
  //noFill();
  beginShape();
  let lineLength = 130;
  for(let i=0; i<=lineLength; i+=lineLength/10){
    let v = 10*sin(frameCount*0.1-i);
    //vertex(i, v);
    //circle(i, v, 5);
    let s = map(v, -10, 10, 10, 60);
    textSize(s);
    text("A", i, v);
  }
  endShape();

  pop();
  text("hello", mouseX, mouseY);
}