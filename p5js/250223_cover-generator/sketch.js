let brushes = [];
let isBrushMoving = true;
const brushCount = 30;
const segmentCount = 200;
let currentPalette;

// カラーパレットの定義
const colorPalettes = [
  // ["#F1EEF7", "#8796B6", "#FFFFFF"],
  // ["#FFAB5B", "#FFF2DB", "#FFFFFF"],
  // ["#94C9A9", "#DAF7DC", "#FCFCFC"],
  // ["#F28482", "#F5CAC3", "#FFFFFF"],
  // ["#577590", "#BDE0FE", "#FFFFFF"],
  // ["#9B5DE5", "#F0C3F9", "#FFFFFF"],
  // ["#2A9D8F", "#E9F5DB", "#FFFFFF"],
  // ["#6D597A", "#E0B1CB", "#FFFFFF"],
  // ["#3D5A80", "#98C1D9", "#FFFFFF"],
  // ["#E07A5F", "#F4F1DE", "#FFFFFF"],
  ["#555555", "#FFFFFF"],
];

function timestamp() {
  const d = new Date();
  return `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, "0")}${d
    .getDate()
    .toString()
    .padStart(2, "0")}-${d.getHours().toString().padStart(2, "0")}${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}${d.getSeconds().toString().padStart(2, "0")}-${d
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(60);
  selectRandomPalette();
  initializeBrushes();
  
  // 初回起動時にランダムなモードを選択
  const initialMode = floor(random(3)); // 0-2の乱数生成
  brushes.forEach(brush => brush.setMode(initialMode));
  isBrushMoving = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeBrushes();
}

function draw() {
  if (isBrushMoving) {
    brushes.forEach((brush) => {
      if (mouseIsPressed) {
        brush.setPos(mouseX, mouseY);
      } else {
        brush.addToPos(
          random(-brush.step, brush.step),
          random(-brush.step, brush.step)
        );
      }
      brush.updateSegmentsPos().draw();
    });
  }
}

function selectRandomPalette() {
  currentPalette = colorPalettes[floor(random(colorPalettes.length))].map(
    (hex) => {
      const c = color(hex);
      return color(red(c), green(c), blue(c));
    }
  );
}

function initializeBrushes() {
  brushes = [];
  for (let i = 0; i < brushCount; i++) {
    const col = color(random(currentPalette));
    const newBrush = new VineBrush(random(width), random(height), segmentCount, col);
    
    // ブラシ初期化時にモードを未設定状態に
    newBrush.currentMode = -1; // 強制的にモード変更をトリガー
    
    brushes.push(newBrush);
  }
}

class VineBrush {
  constructor(x, y, segmentCounts, col) {
    this.xPos = x;
    this.yPos = y;
    this.segments = segmentCounts;
    this.posArr = [];
    this.color = col;
    this.r = 0.1;
    this.step = 0;
    this.dist = 0;
    this.strokeWgt = 0;
    this.noiseScale = 0;
    this.fillAlpha = 0;
    this.strokeAlpha = 0;
    this.scale = 0;
    this.currentMode = -1;

    for (let i = 0; i < this.segments; ++i) {
      this.posArr[i] = createVector(x, y);
    }
  }

  setMode(mode) {
    if (this.currentMode !== mode) {
      this.currentMode = mode;
      switch (mode) {
        case 0:
          this.dist = 1;
          this.step = 30;
          this.strokeWgt = 0.5;
          this.noiseScale = 0.05;
          this.fillAlpha = 10;
          this.strokeAlpha = 20;
          this.scale = 4;
          break;
        case 1:
          this.dist = 1;
          this.step = 20;
          this.strokeWgt = 5;
          this.noiseScale = 0.5;
          this.fillAlpha = 20;
          this.strokeAlpha = 20;
          this.scale = 20;
          break;
        case 2:
          this.dist = 1;
          this.step = 40;
          this.strokeWgt = 1;
          this.noiseScale = 0.5;
          this.fillAlpha = 20;
          this.strokeAlpha = 70;
          this.scale = 10;
          break;
      }
    }
  }

  setPos(x, y) {
    this.xPos = constrain(x, 1, width - 5);
    this.yPos = constrain(y, 1, height - 5);
    return this;
  }

  addToPos(x, y) {
    return this.setPos((this.xPos += x), (this.yPos += y));
  }

  updateSegmentsPos() {
    this.posArr[0].set(this.xPos, this.yPos);
    for (let i = 1; i < this.segments; ++i) {
      if (p5.Vector.dist(this.posArr[i], this.posArr[i - 1]) > this.dist) {
        let tmpVector = p5.Vector.sub(this.posArr[i - 1], this.posArr[i])
          .normalize()
          .mult(this.dist);
        this.posArr[i] = p5.Vector.sub(this.posArr[i - 1], tmpVector);
      }
    }
    return this;
  }

  draw() {
    if (this.currentMode === 2) {
      this.drawPerlinNoiseField();
    } else {
      for (let i = this.segments - 1; i > -1; --i) {
        push();
        fill(
          red(this.color),
          green(this.color),
          blue(this.color),
          this.fillAlpha
        );
        translate(this.posArr[i].x, this.posArr[i].y);
        stroke(
          red(this.color),
          green(this.color),
          blue(this.color),
          this.strokeAlpha
        );
        strokeWeight(this.strokeWgt);
        if (i > 0) {
          rotate(
            atan2(
              this.posArr[i].y - this.posArr[i - 1].y,
              this.posArr[i].x - this.posArr[i - 1].x
            )
          );
        }
        let noisyR =
          this.r / 2 +
          noise(
            this.posArr[i].x * this.noiseScale,
            this.posArr[i].y * this.noiseScale
          ) *
            this.scale;
        ellipse(0, 0, noisyR * 2, noisyR * 2);
        pop();
      }
    }
  }

  drawPerlinNoiseField() {
    for (let i = 0; i < this.segments - 1; i++) {
      let x = this.posArr[i].x;
      let y = this.posArr[i].y;
      let angle =
        noise(x * this.noiseScale, y * this.noiseScale) * TWO_PI * this.scale;
      let nx = x + cos(angle) * this.step;
      let ny = y + sin(angle) * this.step;
      stroke(
        red(this.color),
        green(this.color),
        blue(this.color),
        this.strokeAlpha
      );
      strokeWeight(0.5);
      line(x, y, nx, ny);
      this.posArr[i + 1].set(nx, ny);
    }
  }
}

function keyPressed() {
  if (key === "s") {
    saveCanvas(`sketch-${timestamp()}`, "png");
  } else if (key === "0") {
    selectRandomPalette();
    initializeBrushes();
    isBrushMoving = false;
    console.log("Refreshed. Press `1` or `2` or `3`");
  } else if (key === "1") {
    isBrushMoving = true;
    console.log("Vine drawing mode");
    brushes.forEach((brush) => brush.setMode(0));
  } else if (key === "2") {
    isBrushMoving = true;
    console.log("Painting mode");
    brushes.forEach((brush) => brush.setMode(1));
  } else if (key === "3") {
    isBrushMoving = true;
    console.log("Perlin Noise Field mode");
    brushes.forEach((brush) => brush.setMode(2));
  } else if (key === "4") {
    background(255);
  }
}
