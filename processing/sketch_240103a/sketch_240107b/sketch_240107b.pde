float xstart, xnoise, ystart, ynoise;
float xstartNoise, ystartNoise;

void setup() {
    size(512, 512);
    
    smooth();
    background(0);
    frameRate(24);
    
    xstartNoise = random(20);
    ystartNoise = random(20);
    xstart = random(10);
    ystart = random(10);
}

void draw() {
    background(0);
    
    xstartNoise += 0.01;
    ystartNoise += 0.01;
    xstart += (noise(xstartNoise) * 0.5) - 0.25;
    ystart += (noise(ystartNoise) * 0.5) - 0.25;
    
    xnoise = xstart;
    ynoise = ystart;
    
    for (int y = 0; y <= height; y += 5) {
        ynoise += 0.1;
        xnoise = xstart;
        for (int x = 0; x <= width; x += 5) {
            xnoise += 0.1;
            drawPoint(x, y, noise(xnoise, ynoise));
        }
    }
    
}

void drawPoint(float x, float y, float noiseFactor) {
    pushMatrix();
    translate(x, y);
    rotate(noiseFactor * radians(540));
    noStroke();
    float edgeSize = noiseFactor * 35;
    float grey = 150 + (noiseFactor * 120);
    float alph = 150 + (noiseFactor * 120);
    fill(grey, alph);
    ellipse(0, 0, edgeSize, edgeSize / 2);
    popMatrix();
}