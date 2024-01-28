import java.util.Date;
import java.text.SimpleDateFormat;

PImage img;
int mosaicSize = 12;

void setup() {
    size(640, 426);
    noStroke();
    img = loadImage("/Users/hibiki/Projects/generative/processing/Images/photo_01.jpg");
    image(img, 0, 0, width, height);
    loadPixels();
}

void draw() {
    background(0);
    for (int j = 0; j < height; j += mosaicSize) {  
        for (int i = 0; i < width; i += mosaicSize) {  
            color c = pixels[j * width + i];
            fill(c, 127);
            ellipse(i, j, brightness(c) / 6.0, brightness(c) / 6.0);
        }
    }
}

void keyPressed() {
    if (key == 's') {
        save("dist/sketch-" + timestamp() + ".png");
        //noLoop(); drawの実行を停止
    }
}

String timestamp() {
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HHmmss-SSS");
    return sdf.format(date);
}
