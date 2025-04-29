let cam;
let s = 10;
let tol = 20;
let colorToTrack;
let cx = 0;
let cy = 0;
function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
  colorToTrack = color(0, 0, 0);
}
function draw() {
  background(0);
  image(cam, 0, 0);
  findColor(cam, colorToTrack, tol);
  fill(colorToTrack);
  stroke(255);
  circle(cx, cy, 30);
  //console.log(findColor);
}
function mousePressed() {
  cam.loadPixels();
  colorToTrack = get(mouseX, mouseY);
}

function findColor(input, c, t) {
  cr = c[0];
  cg = c[1];
  cb = c[2];
  input.loadPixels(); //pretty important!
  for (let x = 0; x < input.width; x = x + s) {
    for (let y = 0; y < input.height; y = y + s) {
      let i = (y * input.width + x) * 4;
      let r = input.pixels[i + 0];
      let g = input.pixels[i + 1];
      let b = input.pixels[i + 2];

      if (r > cr - t && r < cr + t && g > cg - t && g < cg + t && b > cb - t && b < cb + t) {
        cx = x;
        cy = y;
        return true;
      }

    }
  }
}