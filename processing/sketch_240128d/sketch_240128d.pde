import java.util.Date;
import java.text.SimpleDateFormat;

PImage img;
int mosaicSize = 6;

void settings() {
    img = loadImage("/Users/hibiki/Projects/generative/processing/Images/photo_05.jpg"); // 画像をロード
    float aspectRatio = calculateAspectRatio(img);
    size(int(1000 * aspectRatio), 1000); // 画像のサイズに合わせてキャンバスのサイズを設定
    //size(img.width, img.height);
    smooth();
}

void setup() {
    noStroke();
    rectMode(CENTER);
    image(img, 0, 0,width,height); // 画像をキャンバスに描画
    loadPixels();
}

float calculateAspectRatio(PImage img) {
    return float(img.width) / float(img.height);
}

void draw() {
    background(0);
    for (int j = 0; j < height; j += mosaicSize) {  
        for (int i = 0; i < width; i += mosaicSize) {  
            color c = pixels[j * width + i];
            fill(c, 230);
            pushMatrix();
            translate(i, j);
            rotate(brightness(c));
            rect(0, 0, brightness(c) / 6.0, 2);
            popMatrix();
        }
    }
}

void keyPressed() {
    if (key == 's') {
        save("dist/sketch-" + timestamp() + ".png");
        noLoop();
    }
}

String timestamp() {
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HHmmss-SSS");
    return sdf.format(date);
}
