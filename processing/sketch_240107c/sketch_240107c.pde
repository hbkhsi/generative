int _num = 10;
Circle[] _circleArr = {};

void setup() {
    size(500,300);
    background(255);
    smooth();
    strokeWeight(1);
    fill(150, 50);
    drawCircles();
}

void draw() {
    noStroke();
    fill(255,10);
    rect(0, 0, width, height);
    for (int i = 0; i < _circleArr.length; ++i) {
        Circle thisCircle = _circleArr[i];
        thisCircle.updateMe();
    }
}

void mouseReleased() {
    drawCircles();
    println(_circleArr.length);
}

void drawCircles() {
    for (int i = 0;i < _num; ++i) {
        Circle thisCircle = new Circle();
        thisCircle.drawMe();
        _circleArr = (Circle[])append(_circleArr, thisCircle);
    }
}

class Circle{ 
    float x, y;
    float r;
    color lineCol, fillCol;
    float alph;
    float xmove, ymove;
    
    Circle() { // コンストラクタ
        x = random(width);
        y = random(height);
        r = random(100) + 10;
        lineCol = color(random(255), random(255), random(255));
        fillCol = color(random(255), random(255), random(255));
        alph = random(255);
        xmove = random(10) - 5;
        ymove = random(10) - 5;
    }
    
    void drawMe() { //メソッド
        noStroke();
        noFill();
        ellipse(x, y, r * 2, r * 2);
    }
    
    void updateMe() {
        x += xmove;
        y += ymove;
        if (x > (width + r)) { x = 0 - r; }
        if (x < (0 - r)) { x = width + r; }
        if (y > (height + r)) { y = 0 - r; }
        if (y < (0 - r)) { y = height + r; }
        
        for (int i = 0; i < _circleArr.length; ++i) {
            Circle otherCircle =  _circleArr[i];
            if (otherCircle != this) {
                float dis = dist(x, y, otherCircle.x, otherCircle.y);
                float overlap  = dis - r - otherCircle.r;
                if (overlap < 0) {
                    float midx, midy;
                    midx = (x + otherCircle.x) / 2;
                    midy = (y + otherCircle.y) / 2;
                    stroke(0, 10);
                    strokeWeight(0.3);
                    noFill();
                    overlap *= -0.5;
                    ellipse(midx, midy, overlap, overlap);
                }
            }
        }
        
        drawMe();
    }
}