Pen p = new Pen();

void setup() {
    size(960, 540);
    pixelDensity(2);
    smooth();
    colorMode(HSB, 360, 100, 100 ,100);
    background(0);
    blendMode(ADD);
}

void draw() {
    if (mousePressed) {
        p.run();
}
}

void keyPressed() {
    if (key == ' ')saveFrame("####.png");
}

class Pen{
    float angle;
    float rad;
    float theta;
    Pen() {
        angle = random(TWO_PI);
        theta = random(PI);
}
    
    void display() {
        
        pushMatrix();
        translate(mouseX, mouseY);
        rotate(angle);
        noFill();
        stroke(217, 63, 58, 15);
        ellipse(0, 0, rad, 45);
        stroke(162, 72, 21, 15);
        ellipse(10,30,200 - rad, 30);
        popMatrix();
}
    
    void update() {
        angle += 0.01;
        theta += 0.005;
        rad = 200 * sin(theta) + 10;
}
    
    void run() {
        update();
        display();
}
}