import java.util.Date;
import java.text.SimpleDateFormat;

PImage img;

void setup() {
    size(640, 426);
    stroke(255, 102);
    
    img = loadImage("/Users/hibiki/Projects/generative/processing/Images/photo_01.jpg");
    image(img, 0, 0, width, height);
    loadPixels();
}

void draw() {
    for (int i = 0; i < width; i++) {  
        color c = pixels[width * mouseY + i];
        stroke(c);
        line(i, 0, i, height);
    }
    
    stroke(255, 102);
    //line(0, mouseY, width, mouseY);
}

void keyPressed() {
    if (key == 's') {
        save("dist/sketch-" + timestamp() + ".png");
    }
}

String timestamp() {
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HHmmss-SSS");
    return sdf.format(date);
}
