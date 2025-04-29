let faceMesh;
let video;
let faces = [];

let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);
  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      if (random(10) > 5) {
        fill(0);
        noStroke();
        circle(keypoint.x, keypoint.y, 5);
      }

    }
  }
}
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
