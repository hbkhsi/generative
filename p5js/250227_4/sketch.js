// Mondrian-inspired generative art animation
let shapes = [];
const numShapes = 40;
const mondrian = {
  colors: ['#FF0000', '#0000FF', '#FFFF00', '#000000', '#FFFFFF'],
  redFreq: 0.15,
  blueFreq: 0.15,
  yellowFreq: 0.15,
  blackFreq: 0.2,
  whiteFreq: 0.35
};

function setup() {
  createCanvas(1000, 1000);
  frameRate(30);
  
  // Create initial shapes
  for (let i = 0; i < numShapes; i++) {
    shapes.push(createRandomShape());
  }
}

function draw() {
  background(255);
  
  // Draw and update all shapes
  for (let shape of shapes) {
    shape.update();
    shape.display();
  }
}

function createRandomShape() {
  let type = random(['rectangle', 'circle', 'line']);
  let x = random(width);
  let y = random(height);
  let colorIndex = weightedRandomColor();
  let color = mondrian.colors[colorIndex];
  
  switch (type) {
    case 'rectangle':
      return new Rectangle(x, y, color);
    case 'circle':
      return new Circle(x, y, color);
    case 'line':
      return new Line(x, y, color);
  }
}

function weightedRandomColor() {
  let r = random();
  if (r < mondrian.redFreq) {
    return 0; // red
  } else if (r < mondrian.redFreq + mondrian.blueFreq) {
    return 1; // blue
  } else if (r < mondrian.redFreq + mondrian.blueFreq + mondrian.yellowFreq) {
    return 2; // yellow
  } else if (r < mondrian.redFreq + mondrian.blueFreq + mondrian.yellowFreq + mondrian.blackFreq) {
    return 3; // black
  } else {
    return 4; // white
  }
}

class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.targetX = x;
    this.targetY = y;
    this.speed = random(0.01, 0.05);
    this.setNewTarget();
  }
  
  update() {
    // Move gradually toward target
    this.x = lerp(this.x, this.targetX, this.speed);
    this.y = lerp(this.y, this.targetY, this.speed);
    
    // Set new target if close enough to current target
    if (dist(this.x, this.y, this.targetX, this.targetY) < 5) {
      this.setNewTarget();
    }
  }
  
  setNewTarget() {
    // Set new target position within a reasonable range of current position
    const range = 100;
    this.targetX = constrain(this.x + random(-range, range), 0, width);
    this.targetY = constrain(this.y + random(-range, range), 0, height);
    
    // Occasionally change speed
    if (random() < 0.2) {
      this.speed = random(0.01, 0.05);
    }
  }
  
  display() {
    // To be implemented by subclasses
  }
}

class Rectangle extends Shape {
  constructor(x, y, color) {
    super(x, y, color);
    this.width = random(30, 150);
    this.height = random(30, 150);
    this.rotation = random(TWO_PI);
    this.targetRotation = this.rotation;
    this.rotSpeed = random(0.005, 0.02);
  }
  
  update() {
    super.update();
    
    // Update rotation
    this.rotation = lerp(this.rotation, this.targetRotation, this.rotSpeed);
    
    // Set new target rotation if close to current target
    if (abs(this.rotation - this.targetRotation) < 0.1) {
      // 50% chance to stay orthogonal (0, PI/2, PI, 3PI/2)
      if (random() < 0.5) {
        this.targetRotation = floor(random(4)) * HALF_PI;
      } else {
        this.targetRotation = random(TWO_PI);
      }
    }
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(this.color);
    if (this.color === '#FFFFFF') {
      stroke(0);
      strokeWeight(2);
    } else {
      noStroke();
    }
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}

class Circle extends Shape {
  constructor(x, y, color) {
    super(x, y, color);
    this.radius = random(15, 70);
    this.originalRadius = this.radius;
    this.targetRadius = this.radius;
    this.pulseSpeed = random(0.01, 0.05);
  }
  
  update() {
    super.update();
    
    // Update radius (pulsating effect)
    this.radius = lerp(this.radius, this.targetRadius, this.pulseSpeed);
    
    // Set new target radius if close to current target
    if (abs(this.radius - this.targetRadius) < 1) {
      this.targetRadius = this.originalRadius * random(0.7, 1.3);
    }
  }
  
  display() {
    fill(this.color);
    if (this.color === '#FFFFFF') {
      stroke(0);
      strokeWeight(2);
    } else {
      noStroke();
    }
    ellipse(this.x, this.y, this.radius * 2);
  }
}

class Line extends Shape {
  constructor(x, y, color) {
    super(x, y, color);
    this.length = random(50, 200);
    this.angle = random(TWO_PI);
    this.targetAngle = this.angle;
    this.angleSpeed = random(0.01, 0.03);
    this.thickness = random(2, 10);
  }
  
  update() {
    super.update();
    
    // Update angle
    this.angle = lerp(this.angle, this.targetAngle, this.angleSpeed);
    
    // Set new target angle if close to current target
    if (abs(this.angle - this.targetAngle) < 0.1) {
      // 70% chance to stay horizontal or vertical
      if (random() < 0.7) {
        this.targetAngle = floor(random(2)) * HALF_PI;
      } else {
        this.targetAngle = random(TWO_PI);
      }
    }
  }
  
  display() {
    push();
    stroke(this.color);
    strokeWeight(this.thickness);
    strokeCap(SQUARE);
    
    // Calculate endpoints
    let x1 = this.x - cos(this.angle) * this.length / 2;
    let y1 = this.y - sin(this.angle) * this.length / 2;
    let x2 = this.x + cos(this.angle) * this.length / 2;
    let y2 = this.y + sin(this.angle) * this.length / 2;
    
    line(x1, y1, x2, y2);
    pop();
  }
}