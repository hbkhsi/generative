PImage sourceImage;
ArrayList<Rectangle> rectangles;

void setup() {
    size(800, 800); // Set the size of your canvas
    sourceImage = loadImage("/Users/hibiki/Projects/generative/processing/Images/photo_05.jpg"); // Load your image
    sourceImage.resize(width, height); // Resize image to match canvas
    rectangles = new ArrayList<Rectangle>();
    noLoop(); // Run the draw loop once
}

void draw() {
    background(255);
    int maxRectangles = 20000; // Maximum number of rectangles you want to draw
    while(rectangles.size() < maxRectangles) {
        // Attempt to place a new rectangle
        Rectangle r = placeRectangle();
        if (r != null) {
            rectangles.add(r);
        }
    }
    
    //Draw all the rectangles
    for (Rectangle rect : rectangles) {
        fill(rect.col);
        rect(rect.x, rect.y, rect.w, rect.h);
    }
    
    //毎フレーム保存
    saveFrame("dist/" + startTimestamp + "/sketch-####.png");
}

Rectangle placeRectangle() {
    //Define a maximum number of attempts to place a new rectangle
    int attempts = 100;
    for (int i = 0; i < attempts; i++) {
        int x = (int)random(width);
        int y = (int)random(height);
        color c = sourceImage.get(x, y);
        
        // Create a new rectangle and check if it touches any existing rectangles
        Rectangle newRect = new Rectangle(x, y, 1, 1, c);
        boolean canGrow = true;
        while(canGrow) {
            newRect.grow();
            for (Rectangle rect : rectangles) {
                if (newRect.touches(rect)) {
                    canGrow = false;
                    break;
                }
            }
            if (newRect.w > width / 10) { // Limit the size to avoid overly large rectangles
                canGrow = false;
            }
        }
        if (newRect.w > 1 && newRect.h > 1) {
            return newRect;
        }
    }
    return null;
}

class Rectangle {
    float x, y, w, h;
    color col;
    
    Rectangle(float x, float y, float w, float h, color c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = c;
    }
    
    void grow() {
        w++;
        h++;
    }
    
    boolean touches(Rectangle other) {
        return x < other.x + other.w && x + w > other.x && y < other.y + other.h && y + h > other.y;
    }
}
