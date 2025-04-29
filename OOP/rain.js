class Rain {
    constructor(x, y, h) {
        this.x = random(x - 30, x + 30);
        this.y = y;
        this.h = h;
    }
    display() {
        push();
        colorMode(HSB);
        stroke(this.h, 60, 100);
        strokeWeight(3);
        line(this.x, this.y, this.x, this.y + 5);
        pop();
    }
    update() {
        this.y = this.y + 10;
    }

}
