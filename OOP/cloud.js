class Cloud {
    constructor(startX, startY) {
        this.x = startX;
        this.y0 = startY;
        this.y = 0;
        this.s = random(50, 100);
        this.speedX = map(this.s, 50, 100, 2, 0.5);
        this.h = random(360);
        this.isGone = false;
        this.sound = mySound;
        this.isRaining = false;
    }
    //our functions or methods
    display() {
        push();
        colorMode(HSB);
        translate(this.x, this.y);
        fill(this.h, 60, 100);
        noStroke();
        circle(0, 0, this.s);
        for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
            push();
            rotate(angle);
            let s2 = map(noise(angle * this.s), 0, 1, this.s * 0.1, this.s);
            circle(this.s * 0.5, 0, s2);
            pop();
        }
        pop();
    }
    update() {
        this.x = this.x + this.speedX;
        this.y = this.y0 + 100 * sin(noise(frameCount * 0.01));
        if (this.x > width * 1.1) {
            this.isGone = true;
        }
    }
    checkCollision(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        if (d < 1.2 * (this.s + other.s) / 2) {
            this.h = random(360);
            this.isRaining = true;
            if (this.sound.isPlaying() == false) {
                this.sound.play();
            }
        } else {
            this.isRaining = false;
        }
    }

}
