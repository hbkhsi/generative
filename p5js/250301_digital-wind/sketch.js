// Parameters
const NUM_PARTICLES = 500;
const MAX_SPEED = 1.5;
const MAX_FORCE = 0.05;
const PERCEPTION_RADIUS = 100;
const TRAIL_LENGTH = 20;

let particles = [];
let noiseScale = 0.01;
let noiseStrength = 1;
let flowField;
let cols, rows;
let resolution = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Create flow field
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  flowField = new Array(cols * rows);

  // Initialize particles
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }

  noFill();
  stroke(255, 30);
}

function draw() {
  // Add a semi-transparent background for fade effect
  fill(0, 20);
  rect(0, 0, width, height);
  noFill();

  // Update flow field based on noise
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, frameCount * 0.003) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(noiseStrength);
      flowField[index] = v;
      xoff += noiseScale;
    }
    yoff += noiseScale;
  }

  // Update and display particles
  for (let particle of particles) {
    particle.follow(flowField);
    particle.update();
    particle.display();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = random(1, MAX_SPEED);
    this.trail = [];
    this.trailLength = floor(random(5, TRAIL_LENGTH));
    this.lineWeight = random(0.5, 2);
  }

  update() {
    // Update velocity and position
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Store position in trail
    this.trail.push(createVector(this.pos.x, this.pos.y));

    // Remove old positions if trail is too long
    if (this.trail.length > this.trailLength) {
      this.trail.shift();
    }

    // Wrap around edges
    this.edges();
  }

  follow(flowField) {
    // Find force from flow field
    let x = floor(this.pos.x / resolution);
    let y = floor(this.pos.y / resolution);
    let index = x + y * cols;

    // Make sure we're in bounds
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      let force = flowField[index];
      this.applyForce(force);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  display() {
    // Draw trail
    if (this.trail.length > 1) {
      let intensity = map(this.vel.mag(), 0, this.maxSpeed, 50, 220);
      stroke(intensity, 30);
      strokeWeight(this.lineWeight);
      beginShape();
      for (let i = 0; i < this.trail.length; i++) {
        let pos = this.trail[i];
        vertex(pos.x, pos.y);
      }
      endShape();
    }
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

function mouseMoved() {
  // Interactive - change noise strength based on mouse position
  noiseStrength = map(mouseX, 0, width, 0.5, 2);
  noiseScale = map(mouseY, 0, height, 0.005, 0.02);
}

function mousePressed() {
  // Randomize flow field on click
  noiseSeed(random(1000));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);

  // Recalculate flow field size
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  flowField = new Array(cols * rows);
}
