import java.util.Date;
import java.text.SimpleDateFormat;

String startTimestamp = timestamp();

int lineSize = 50;
PImage image;

void settings() {
    image = loadImage("/Users/hibiki/Projects/generative/processing/Images/photo_06.jpg"); // 画像をロード
    float aspectRatio = calculateAspectRatio(image);
    size(int(800 * aspectRatio), 800); // 画像のサイズに合わせてキャンバスのサイズを設定
    noSmooth();
}

void setup() {
    // size(768, 1024);
    image.resize(width, height);
    
    image(image, 0, 0, width, height);
    
    strokeWeight(2);
}

float calculateAspectRatio(PImage img) {
    return float(img.width) / float(img.height);
}

void draw() {
    for (int i = 0; i < 100; i++) {
        drawOneLine();
    }
    //毎フレーム保存
    saveFrame("dist/" + startTimestamp + "/sketch-####.png");
}

void drawOneLine() {
    int x = int(random(image.width));
    int y = int(random(image.height));
    
    color pixelColor = image.get(x, y);
    stroke(pixelColor);
    
    float r = random(1);
    
    //Draw lines in 4 directions
    if (r < .25) {
        line(x - lineSize / 2, y, x + lineSize / 2, y);
    } else if (r < .5) {
        line(x, y - lineSize / 2, x, y + lineSize / 2);
    } else if (r < .75) {
        line(x - lineSize / 2, y - lineSize / 2,
            x + lineSize / 2,
            y + lineSize / 2);
    } else {
        line(x - lineSize / 2, y + lineSize / 2,
            x + lineSize / 2,
            y - lineSize / 2);
    }
    
    //Draw lines in random directions
    //line(x, y,
    //x + random( - lineSize / 2, lineSize / 2),
    //y + random( - lineSize / 2, lineSize / 2));
    
    //Draw lines in 2 directions
    //if (r <.5) {
    //line(0, y, width, y);
//} else {
    //line(x, 0, x, height);
//}
}


String timestamp() {
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HHmmss-SSS");
    return sdf.format(date);
}

