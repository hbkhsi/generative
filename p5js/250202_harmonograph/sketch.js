// 粒子の数
let NUM_PARTICLES = 2;
// 粒子を格納する配列
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new HarmonographParticle());
  }
}

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

function draw() {
  noStroke();
  fill(255, 1);
  rect(0, 0, width, height);

  push();
  translate(width / 2, height / 2);

  for (let p of particles) {
    p.update();
    p.display();
  }

  pop();
  console.log(HarmonographParticle.A1);
}

class HarmonographParticle {
  constructor() {
    this.t = 0;
    this.dt = .1;

    this.positions = [];

    this.initializeParameters();

    this.col = color(random(360), 60, 80);
  }

  initializeParameters() {
    // 振幅
    this.A1 = random(50, 150);
    this.A2 = random(50, 150);
    this.B1 = random(50, 150);
    this.B2 = random(50, 150);

    // 角振動数
    this.w1 = random(1, 1.01);
    this.w2 = random(1, 1.01);
    this.w3 = random(1, 1.01);
    this.w4 = random(1, 1.01);

    // 初期位相
    this.phi1 = random(TWO_PI);
    this.phi2 = random(TWO_PI);
    this.phi3 = random(TWO_PI);
    this.phi4 = random(TWO_PI);

    // 減衰係数
    this.d1 = 0.00001;
    this.d2 = 0.00001;
    this.d3 = 0.00001;
    this.d4 = 0.00001;
  }

  update() {
    this.t += this.dt;

    let x =
      this.A1 * sin(this.w1 * this.t + this.phi1) * exp(-this.d1 * this.t) +
      this.A2 * sin(this.w2 * this.t + this.phi2) * exp(-this.d2 * this.t);
    let y =
      this.B1 * sin(this.w3 * this.t + this.phi3) * exp(-this.d3 * this.t) +
      this.B2 * sin(this.w4 * this.t + this.phi4) * exp(-this.d4 * this.t);

    this.positions.push(createVector(x, y));
  }

  display() {
    if (this.positions.length > 1) {
      let prevPos = this.positions[this.positions.length - 2];
      let currentPos = this.positions[this.positions.length - 1];

      stroke(0);
      strokeWeight(.5);
      line(prevPos.x, prevPos.y, currentPos.x, currentPos.y);
    }
  }
}

function keyPressed() {
  if (key === "s") {
    save(timestamp() + ".png");
  } else if (key === " ") { 
    background(255);
        particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push(new HarmonographParticle());
    }
  } else if (key === "c") {
    background(255);
  }
}
