let _num = 400;
let _circleArr = [];
let saveFrames = false;
let frameCounter = 0;

function setup() {
    createCanvas(windowWidth,windowHeight);
    strokeWeight(1);
    fill(150);
    drawCircles();
}

function draw() {
    noStroke();
    fill(0,50);
    rect(0, 0, width, height);
    
    for (let i = 0; i < _circleArr.length; i++) {
        let thisCircle = _circleArr[i];
        thisCircle.updateMe();
    }

    if (saveFrames && frameCounter < 300) {
        saveCanvas('frame-' + nf(frameCounter, 4, 0), 'png');
        frameCounter++;
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        saveFrames = true;
    }
}

function mouseReleased() {
    drawCircles();
    console.log(_circleArr.length);
}

function drawCircles() {
    _circleArr = [];
    for (let i = 0; i < _num; i++) {
        let thisCircle = new Circle();
        _circleArr.push(thisCircle);
    }
}

class Circle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.r = random(100) + 10;
        this.lineCol = color(random(255), random(255), random(255));
        this.fillCol = color(random(255), random(255), random(255));
        this.alph = random(255);
        this.xmove = random(10) - 5;
        this.ymove = random(10) - 5;
    }

    drawMe() {
        //noStroke();
        //noFill();
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        //noStroke();
        //noFill();
        ellipse(this.x, this.y, 10, 10);
    }

    updateMe() {
        this.x += this.xmove;
        this.y += this.ymove;

        if (this.x > width + this.r) this.x = -this.r;
        if (this.x < -this.r) this.x = width + this.r;
        if (this.y > height + this.r) this.y = -this.r;
        if (this.y < -this.r) this.y = height + this.r;

        for (let i = 0; i < _circleArr.length; i++) {
            let otherCircle = _circleArr[i];
            if (otherCircle !== this) {
                let dis = dist(this.x, this.y, otherCircle.x, otherCircle.y);
                let overlap = dis - this.r - otherCircle.r;
                if (overlap < 0) {
                    let midx = (this.x + otherCircle.x) / 2;
                    let midy = (this.y + otherCircle.y) / 2;
                    stroke(255, 20);
                    strokeWeight(0.1);
                    noFill();
                    overlap *= -1;
                    ellipse(midx, midy, overlap, overlap);
                }
            }
        }
        this.drawMe();
    }
}

// Processingのnf()関数の代替
function nf(num, digits) {
    return num.toString().padStart(digits, '0');
}