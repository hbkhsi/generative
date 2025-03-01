// Monochrome Flow Fields
const particles = [];
const numParticles = 1000;
const noiseScale = 0.004;
const noiseZ = 0;
let zoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10);
  
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  fill(5,10);
  noStroke();
  zoff += 0.003;
  
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('flowfield', 'png');
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = random(1, 3);
    this.size = random(.5, 1);
    this.alpha = random(40, 150);
  }
  
  update() {
    // Flow field calculation based on noise
    let angle = noise(this.pos.x * noiseScale, this.pos.y * noiseScale, zoff) * TWO_PI * 2;
    
    // Set acceleration based on noise angle
    this.acc = p5.Vector.fromAngle(angle);
    this.acc.mult(0.1);
    
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    
    // Wrap around the canvas
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
  
  display() {
    stroke(0,random(255),random(255), this.alpha);
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(10);
}