/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let x;
let y;
let u, v;
let R = 100;
let vNumber = 200;
let smoothness = 0.1;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
}

function draw() {
    background(0);
    u = width*noise(frameCount*0.001);
    v = height*noise(frameCount*0.003);
    noStroke();
    push();
    translate(u, v);
    rotate(sin(frameCount * 0.01));
    beginShape();
    for (let i = 0; i < TWO_PI; i += TWO_PI / vNumber) {
        let offset = noise(
            smoothness * sin(i),
            smoothness * cos(i),
            frameCount * 0.01
        );
        offset = map(offset, 0, 1, -R * 1.2, R * 1.2);
        let radius = R + offset;
        x = radius * cos(i);
        y = radius * sin(i);
        curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
}

