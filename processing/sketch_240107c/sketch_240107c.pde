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
        Circle thisCircle = new Circle();
        thisCircle.drawMe();
    }
}

class Circle { 
    float x, y;
    float r;
    color lineCol, fillCol;
    float alph;
    
    Circle() { // コンストラクタ
        x = random(width);
        y = random(height);
        r = random(100) + 10;
        lineCol = color(random(255), random(255), random(255));
        fillCol = color(random(255), random(255), random(255));
        alph = random(255);
    }
    
    void drawMe() { //メソッド
        noStroke();
        fill(fillCol, alph);
        ellipse(x, y, r * 2, r * 2);
        stroke(lineCol, 150);
        noFill();
        //ellipse(x, y, 10, 10);
    }
}