int _num = 400;
Circle[] _circleArr = {};
boolean saveFrames = false;
int frameCounter = 0;

void setup() {
    size(540,960);
    smooth();
    strokeWeight(1);
    fill(150, 50);
    //frameRate(24);
    drawCircles();
}

void draw() {
    noStroke();
    fill(0,10);
    rect(0, 0, width, height);
    for (int i = 0; i < _circleArr.length;i++) {
        Circle thisCircle = _circleArr[i];
        thisCircle.updateMe();
    }
    
    //save frames
    if (saveFrames && frameCounter < 300) {
        saveFrame("frame-####.png");
        frameCounter++;
    }
}

void keyPressed() {
    if (key == ENTER) {
        saveFrames = true; // Enterキーが押されたら画像保存を開始
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
        // fill(fillCol, alph);
        noFill();
        ellipse(x, y, r * 2, r * 2);
        // stroke(lineCol, 150);
        noStroke();
        noFill();
        ellipse(x, y, 10, 10);
    }
    
    void updateMe() {
        x += xmove;
        y += ymove;
        if (x > (width + r)) { x = 0 - r; }
        if (x < (0 - r)) { x = width + r; }
        if (y > (height + r)) { y = 0 - r; }
        if (y < (0 - r)) { y = height + r; }
        
        for (int i = 0; i < _circleArr.length; i ++) {
            Circle otherCircle =  _circleArr[i];
            if (otherCircle != this) {
                float dis = dist(x, y, otherCircle.x, otherCircle.y);
                float overlap  = dis - r - otherCircle.r;
                if (overlap < 0) {
                    float midx, midy;
                    midx = (x + otherCircle.x) / 2;
                    midy = (y + otherCircle.y) / 2;
                    stroke(255, 20);
                    strokeWeight(0.1);
                    noFill();
                    overlap *= -1;
                    ellipse(midx, midy, overlap, overlap);
                }
            }
        }
        
        drawMe();
    }
}
