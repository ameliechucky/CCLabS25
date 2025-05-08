let anaglyph;
let scene = 3;
let lucky_number = 1;
let font_1;
let font_2;
let font_3;
let text_time = 50;
let test_time = 50;

// ********    whether to display the handpose ******** //
let show_hand = true;

//scene1
let speed_1 = 1;
let speed_up = false;
let bg_1 = 0;
let switch_scene = false;

//scene_text_1
let count_text_1 = 0;

//scene2 
let savedBlocks = null;

let cam;
let S = 160;  // *** size of the grid *** //  
let cols, rows;
let cellColors;
let scene2Ready = false;
let switch_scene2 = false;
let time1 = 60;
let position = 0;
let dragging = false;
let dragOffsetX = 0;
let count_2 = 300;
let bg_2;

let flashActive = false;
let flashTimer = 0;
const FLASH_DUR = 30;  // frame

//scene_text_2
let count_text_2 = 0;

//scene3
let scene3Ready = false;
let activeMap = [];
let timer3 = 0;
let control_z3 = 0;
const fall_time3 = 5;
const resize_time3 = 20;
let blocks3 = [];

let count_3 = 0;

//scene_text_3
let count_text_3 = 0;

//scene4
let count_4 = 0;
let handPose;
let video;
let hands = [];

//scene5

let terrain = {
  scale: 100,
  w: 1000,
  h: 1000,
  flightPos: 0,
  flightSpeed: .0010,
  noiseDelta: .4,
  terrainHeight: 200,
  coords: []
}
let count_5 = 0;

//scene7
let count_7 = 0;

function preload() {
  handPose = ml5.handPose();
  font_1 = loadFont("AdobeClean-Light.otf");
  font_2 = loadFont("CtrlAtri.0.001.otf");
  //font_3 = loadFont(""); 楷体
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  anaglyph = createAnaglyph(this);
  anaglyph.setDivergence(-.3);
  initTerrain();
  cam = createCapture(VIDEO);
  cam.hide();

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
}
function draw() {
  if (scene === 1) {
    anaglyph.draw(scene1);
  } else if (scene === 2) {
    anaglyph.draw(scene_text_1);
    console.log('count_text_1', count_text_1);
  } else if (scene === 3) {
    anaglyph.draw(scene2);
    console.log('count_2', count_2);
  } else if (scene === 4) {
    anaglyph.draw(scene_text_2);
    console.log('count_text_2', count_text_2);
  } else if (scene === 5) {
    anaglyph.draw(scene3);
    console.log('count_3', count_3);
  } else if (scene === 6) {
    anaglyph.draw(scene_text_3);
    console.log('count_text_3', count_text_3);
  } else if (scene === 7) {
    anaglyph.draw(scene4);
    //console.log('count_4', count_4);
  }
  //   console.log(
  //     'normX:', (mouseX / width).toFixed(2),
  //     'normY:', (mouseY / height).toFixed(2)
  //   );
}
function scene1(pg) {
  const boxW = 333;

  pg.background(bg_1);

  pg.rectMode(CENTER);
  pg.noFill();
  pg.strokeWeight(10);
  pg.stroke(255);
  if (speed_up && !switch_scene) {
    speed_1 *= 1.0025;
    bg_1 = map(speed_1, 1, 10, 0, 255);
    if (bg_1 >= 255) {
      bg_1 = 255;
      speed_1 = 0;
      switch_scene = true;
      setTimeout(() => { scene = 2; }, 1000);
    }
  }

  for (let z = 0; z < 30; z++) {
    pg.push();
    let dz = (z * 100 + speed_1 * frameCount) % 2000;
    dz -= 800;
    pg.translate(0, 0, dz);
    pg.rect(0, 0, boxW);
    pg.pop();
  }

  pg.push();
  pg.rotateX(PI / 2);
  pg.translate(0, 0, -boxW / 2);
  pg.rect(0, 0, boxW, 1800);
  pg.translate(0, 0, boxW);
  pg.rect(0, 0, boxW, 1800);
  pg.pop();

  let omega1 = map(speed_1, 1, 10, -frameCount / 200, -frameCount / 20);
  push();
  pg.textAlign(pg.CENTER, pg.CENTER);
  if (font_1) {
    pg.fill(255);
    pg.textFont(font_1, 100);
    pg.rotateY(omega1);
    pg.text("xxxxx", 0, 0);
  }
  pop();
}
function scene_text_1() {
  count_text_1++;
  if (count_text_1 <= text_time) {
    push();
    background(0);

    textAlign(CENTER, CENTER);

    if (font_2) {
      fill(255);
      textFont(font_2, 64);
      let msg = "1\n \n";
      text(msg, 0, 0);
    }
    if (font_1) {
      fill(255);
      textFont(font_1, 64);
      let msg = "Aa";
      text(msg, 0, 0);
    }
    if (font_1) {
      fill(255);
      textFont(font_1, 64);
      let msg = "\n \n Aa";
      text(msg, 0, 0);
    }
    pop();
  } else {
    switch_scene = true;
    setTimeout(() => { scene = 3; }, 500);
  }
}
function scene2(pg) {
  count_2++;

  if (lucky_number == 2) {
    pg.push();
    pg.background(0);
    cam.loadPixels();

    const cols = ceil(pg.width / S);
    const rows = ceil(pg.height / S);

    if (count_2 <= 600) {
      if (count_2 === 600) {
        savedBlocks = Array.from({ length: rows },
          () => Array(cols).fill(color(0)));
      }
      pg.push();
      pg.scale(-1, 1);


      for (let ix = 0; ix < cols; ix++) {
        let x = ix * S;
        for (let iy = 0; iy < rows; iy++) {
          let y = iy * S;

          let cx = floor(map(x, 0, pg.width, 0, cam.width));
          let cy = floor(map(y, 0, pg.height, 0, cam.height));
          let i = (cx + cy * cam.width) * 4;
          let r = cam.pixels[i],
            g = cam.pixels[i + 1],
            b = cam.pixels[i + 2];

          let usedCol = color(r, g, b);

          pg.push();
          pg.translate(
            x - pg.width / 2,
            y - pg.height / 2,
            0
          );
          pg.noStroke();
          pg.fill(usedCol);
          pg.rect(0, 0, S, S);
          pg.pop();

          if (count_2 === 600) {
            flashActive = true;
            flashTimer = 0;
            savedBlocks[iy][ix] = usedCol;
          }
        }
      }
    }

    else if (savedBlocks) {

      pg.push();
      pg.scale(-1, 1);

      pg.push();
      pg.translate(-pg.width / 2, -pg.height / 2);
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          pg.noStroke();
          pg.fill(savedBlocks[iy][ix]);
          pg.rect(ix * S, iy * S, S, S);
        }
      }
      pg.pop();
      pg.pop();
    }
    if (flashActive) {

      flashTimer++;

      let a = map(flashTimer, 0, FLASH_DUR, 255, 0, true);

      pg.push();
      pg.noStroke();
      pg.fill(0, a);
      pg.translate(0, 0, 1);
      pg.rectMode(CENTER);
      pg.rect(0, 0, pg.width, pg.height);
      pg.pop();

      if (flashTimer >= FLASH_DUR) {
        flashActive = false;
      }
    }
    pg.pop();
  } else {
    push();
    background(0);
    cam.loadPixels();

    const cols = ceil(pg.width / S);
    const rows = ceil(pg.height / S);

    if (count_2 <= 600) {
      if (count_2 === 600) {
        savedBlocks = Array.from({ length: rows },
          () => Array(cols).fill(color(0)));
      }

      push();
      scale(-1, 1);

      for (let ix = 0; ix < cols; ix++) {
        let x = ix * S;
        for (let iy = 0; iy < rows; iy++) {
          let y = iy * S;

          let cx = floor(map(x, 0, pg.width, 0, cam.width));
          let cy = floor(map(y, 0, pg.height, 0, cam.height));
          let i = (cx + cy * cam.width) * 4;
          let r = cam.pixels[i],
            g = cam.pixels[i + 1],
            b = cam.pixels[i + 2];

          let usedCol = color(r, g, b);

          push();
          translate(
            x - pg.width / 2,
            y - pg.height / 2,
            0//不知道这里改成0好不好
            //map(r, 0, 255, 500, 0)
          );
          noStroke();
          fill(usedCol);
          rect(0, 0, S, S);
          pop();

          if (count_2 === 600) {
            flashActive = true;
            flashTimer = 0;
            savedBlocks[iy][ix] = usedCol;
          }
        }
      }
    }

    else if (savedBlocks) {

      push();
      scale(-1, 1);

      push();
      translate(-pg.width / 2, -pg.height / 2);
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          noStroke();
          fill(savedBlocks[iy][ix]);
          rect(ix * S, iy * S, S, S);
        }
      }
      pop();
      pop();
    }
    if (flashActive) {
      flashTimer++;
      let a = map(flashTimer, 0, FLASH_DUR, 255, 0, true);

      push();
      noStroke();
      fill(0, a);
      translate(0, 0, 1);
      rectMode(CENTER);
      rect(0, 0, pg.width, pg.height);
      pop();

      if (flashTimer >= FLASH_DUR) {
        flashActive = false;
      }
    }
    pop();
  }

  if (count_2 >= 700) {
    switch_scene2 = true;
    setTimeout(() => { scene = 4; }, 0);
  }
}
class PixelBlock {
  constructor(gx, gy, col, size, count_3) {
    this.gx = gx;
    this.gy = gy;
    this.x = gx - width / 2;
    this.y = gy - height / 2;
    this.z = 0;
    this.size = size;
    this.col = col;
    this.alpha = 255;
    this.count = count_3;

    this.dx = random(-0.5, 0.5);
    this.dy = random(-0.5, 0.5);
    this.dz = random(0, 2);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;
  }
  display(pg) {
    pg.push();
    pg.translate(this.x, this.y, this.z);
    pg.fill(red(this.col), green(this.col), blue(this.col));
    pg.noStroke();
    pg.rectMode(CENTER);
    pg.rect(0, 0, this.size, this.size);
    pg.pop();
  }
}
class Pixel_Block_2 {
  constructor(gx, gy, col, size, count_3) {
    this.gx = gx;
    this.gy = gy;
    this.x = gx - width / 2;
    this.y = gy - height / 2;
    this.z = 0;
    this.size = size;
    this.col = col;
    this.alpha = 255;
    this.count = count_3;

    this.dx = random(-0.5, 0.5);
    this.dy = random(-0.5, 0.5);
    this.dz = random(0, 2);
  }

  update() {
    this.x += this.dx * 0.0001 * count_3 ** 1.6;
    this.y += this.dy * 0.0001 * count_3 ** 1.6;
    this.z += this.dz * 0.0001 * count_3 ** 1.6;
    //this.alpha = map(this.count, 0, 400, 255, 0);
  }
  display() {
    push();
    translate(this.x, this.y, this.z);
    fill(red(this.col), green(this.col), blue(this.col), this.alpha);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    pop();
  }
}
function scene_text_2() {
  count_text_2++;
  if (count_text_2 <= text_time) {
    push();
    background(0);

    textAlign(CENTER, CENTER);

    if (font_2) {
      fill(255);
      textFont(font_2, 64);
      let msg = "1\n \n";
      text(msg, 0, 0);
    }
    if (font_1) {
      fill(255);
      textFont(font_1, 64);
      let msg = "Aa";
      text(msg, 0, 0);
    }
    if (font_1) {
      fill(255);
      textFont(font_1, 64);
      let msg = "\n \n Aa";
      text(msg, 0, 0);
    }
    pop();
  } else {
    switch_scene = true;
    setTimeout(() => { scene = 5; }, 500);
  }
}
// 
function scene3(pg) {
  count_3++;
  if (lucky_number == 2) {
    if (!scene3Ready) {
      blocks3 = [];
      const rows = savedBlocks.length;
      const cols = savedBlocks[0].length;
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          let c = savedBlocks[iy][ix];
          let gx = ix * S + S / 2;
          let gy = iy * S + S / 2;
          blocks3.push(new PixelBlock(gx, gy, c, S, count_3));
        }
      }
      scene3Ready = true;
    }

    pg.background(0);

    pg.push();
    pg.translate(0, 0, 0);

    pg.scale(-1, 1);

    for (let blk of blocks3) {
      blk.update();
      blk.display(pg);
    }
    pg.pop();
  } else {
    if (!scene3Ready) {
      blocks3 = [];
      const rows = savedBlocks.length;
      const cols = savedBlocks[0].length;
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          let c = savedBlocks[iy][ix];
          let gx = ix * S + S / 2;
          let gy = iy * S + S / 2;
          blocks3.push(new Pixel_Block_2(gx, gy, c, S, count_3));
        }
      }
      scene3Ready = true;
    }

    background(0);

    push();
    translate(0, 0, 0);
    scale(-1, 1);

    for (let blk of blocks3) {
      blk.update();
      blk.display();
    }
    pop();
  }
  if (count_3 >= test_time) {
    switch_scene = true;
    setTimeout(() => { scene = 6; }, 0);
  }
}
//!!!!!!!!!!!字
function scene_text_3() {
  count_text_3++;
  if (count_text_3 <= 200) {
    push();
    background(0);

    textAlign(CENTER, CENTER);

    if (font_2) {
      fill(255);
      textFont(font_2, 64);
      let msg = "1\n \n";
      text(msg, 0, 0);
    }
    if (font_1) {
      fill(255);
      textFont(font_1, 64);
      let msg = "Interaction Scene";
      text(msg, 0, 0);
    }
    if (font_1) {
      fill(255);
      textFont(font_1, 64);
      let msg = "\n \n ";
      text(msg, 0, 0);
    }
    pop();
  } else {
    switch_scene = true;
    setTimeout(() => { scene = 7; }, 500);
  }
}

function scene4() {
  background(0);

  // 拇指尖 到 食指尖 4 8
  let two_fingers = null;
  if (hands.length > 0) {
    const h = hands[0].keypoints;
    const t4 = h[4], t8 = h[8];
    two_fingers = dist(t4.x, t4.y, t8.x, t8.y);
    // let indexFinger = hands[0].index_finger_tip;
    // let thumb = hands[0].thumb_tip;
    // two_fingers = dist(indexFinger.x, indexFinger.y, thumb.x, thumb.y);

  }

  // 
  const maxSpeed = 6.6;
  const neutral = width * 0.25;
  const maxDist = width * 0.5;

  let speed = 0;
  if (two_fingers !== null) {
    if (two_fingers <= neutral) {
      speed = map(two_fingers, 0, neutral, -maxSpeed, 0, true);
    } else {
      speed = map(two_fingers, neutral, maxDist, 0, maxSpeed, true);
    }
  }

  console.log('scene4 speed:', speed.toFixed(2));

  push();
  translate(0, 0, 0);
  scale(-1, 1);
  for (let blk of blocks3) {
    blk.x += blk.dx * speed;
    blk.y += blk.dy * speed;
    blk.z += blk.dz * speed;
    blk.display();
  }
  pop();

  // if (show_hand && hands.length > 0) {
  //   fill(255, 0, 0);
  //   circle(t4.x, t4.y, 12);
  //   circle(t8.x, t8.y, 12);
  //   line(t8.x, t8.y, t4.x, t4.y);
  // }



  // SHOW hand!
  if (show_hand && hands.length > 0) {
    push();
    resetMatrix();
    translate(-width / 2, -height / 2);
    const h = hands[0].keypoints;
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    line(h[4].x, h[4].y, h[8].x, h[8].y);
    noStroke();
    // for (let i = 0; i < h.length; i++) {
    //   if (i === 4 || i === 8) {
    //     fill(255, 0, 0);
    //     circle(h[i].x, h[i].y, 12);
    //   } else {
    //     fill(0, 255, 0);
    //     circle(h[i].x, h[i].y, 8);
    //   }
    // }
    pop();
  }
}


function scene5(pg) {
  pg.push();
  pg.background(255);
  pg.stroke(0);
  pg.strokeWeight(5);
  pg.fill(255, 50);

  pg.translate(0, 100, -200);
  drawTerrain(pg);
  pg.pop();
}

function initTerrain() {
  terrain.cols = terrain.w / terrain.scale;
  terrain.rows = terrain.h / terrain.scale;
  for (let x = 0; x < terrain.cols; ++x) {
    terrain.coords[x] = [];
  }
}

function drawTerrain(pg) {
  terrain.flightPos -= terrain.flightSpeed;
  shiftNoiseSpace();
  pg.rotateX(PI / 2);
  pg.translate((-terrain.w / 2) + 1, (-terrain.h / 2) + 30);

  for (let y = 0; y < terrain.rows - 1; ++y) {
    pg.beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < terrain.cols; ++x) {
      pg.vertex(x * terrain.scale, y * terrain.scale, terrain.coords[x][y]);
      pg.vertex(x * terrain.scale, (y + 1) * terrain.scale, terrain.coords[x][y + 1]);
    }
    pg.endShape();
  }
}

function shiftNoiseSpace() {
  let yOffset = terrain.flightPos;
  for (let y = 0; y < terrain.rows; ++y) {
    let xOffset = 0;
    for (let x = 0; x < terrain.cols; ++x) {
      terrain.coords[x][y] = map(noise(xOffset, yOffset), 0, 1, -terrain.terrainHeight, terrain.terrainHeight);
      xOffset += terrain.noiseDelta;
    }
    yOffset += terrain.noiseDelta;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  anaglyph.resize();
}


function displayFrameRate() {
  textFont(font_1);
  fill(0);
  noStroke();
  textSize(18);
  text(frameRate(), -width / 2 + 50, -height / 2 + 50);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  anaglyph.resize();
}

function mousePressed() {
  speed_up = true;
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}


