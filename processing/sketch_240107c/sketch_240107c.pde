int _num = 10;

void setup() {
    size(500,300);
    background(255);
    smooth();
    strokeWeight(1);
    fill(150, 50);
    drawCircles();
}

void draw() {}

void mouseReleased() {
    drawCircles();
}

void drawCircles() {
    for (int i = 0;i < _num; ++i) {
        float x = random(width);
        float y = random(height);
        float r = random(100)  + 10;
        noStroke();
        ellipse(x, y, r * 2, r * 2);
        stroke(0, 150);
        ellipse(x, y, 10, 10);
    }
}