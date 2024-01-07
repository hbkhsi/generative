float xstart, xnoise, ynoise;

void setup() {
    size(500, 500);
    smooth();
    background(255);
    xstart = random(10);
    xnoise = xstart;
    ynoise = random(10);
    for (int y = -10; y <= height + 10; y += 5) {
        ynoise += 0.1;
        xnoise = xstart;
        for (int x = -10; x <= width + 10; x += 5) {
            xnoise += 0.1;
            drawPoint2(x, y, noise(xnoise, ynoise));
        }
    }
    //saveFrame("screen.png");
}

void drawPoint1(float x, float y, float noiseFactor) {
    float len = 10 * noiseFactor;
    rect(x, y, len, len, 20);   
}

void drawPoint2(float x, float y, float noiseFactor) {
    pushMatrix();
    translate(x, y);
    rotate(noiseFactor * radians(360));
    stroke(0, 150);
    line(0, 0, 20, 0);
    popMatrix();
    print(x + ", " + y + ", " + noiseFactor + "\n");
}

void drawPoint3(float x, float y, float noiseFactor) {
    pushMatrix();
    translate(x,y);
    rotate(noiseFactor * radians(360));
    float edgeSize = noiseFactor * 35;
    float grey = 150 + (noiseFactor * 120);
    float alph = 150 + (noiseFactor * 120);
    noStroke();
    fill(grey, alph);
    ellipse(0, 0, edgeSize, edgeSize / 2);
    popMatrix();
}