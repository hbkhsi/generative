let seed;

function setup() {
  createCanvas(800, 800);
  seed = random(1000);
  drawTree();
}

function draw() {
  // No continuous drawing
}

function mousePressed() {
  seed = random(1000);
  drawTree();
}

function drawTree() {
  background(245, 240, 230);
  randomSeed(seed);
  noiseSeed(seed);
  
  // Start drawing from bottom center
  translate(width / 2, height);
  
  // Draw trunk
  let trunkLength = height * 0.3;
  let trunkThickness = 20;
  
  stroke(80, 55, 35);
  strokeWeight(trunkThickness);
  
  // Draw the tree recursively
  branch(trunkLength, trunkThickness, 0, 1);
}

function branch(len, thickness, angle, depth) {
  // Apply some Perlin noise to the angle
  let noiseVal = noise(len * 0.01, depth * 0.1, seed * 0.1);
  let curveAngle = map(noiseVal, 0, 1, -0.2, 0.2);
  
  // Draw current branch
  push();
  rotate(angle + curveAngle);
  
  // Change color based on depth - darker for trunk, lighter for branches
  let brown = map(thickness, 1, 20, 150, 80);
  let green = map(thickness, 1, 20, 180, 55);
  let red = map(thickness, 1, 20, 120, 80);
  stroke(red, green, brown);
  
  // Draw line with thickness based on branch size
  strokeWeight(thickness);
  line(0, 0, 0, -len);
  
  // Move to the end of the branch
  translate(0, -len);
  
  // If the branch is still big enough, create two new branches
  if (len > 4) {
    // Reduce size for the next branches
    let newLength = len * 0.67;
    let newThickness = thickness * 0.7;
    
    // Random angles with Perlin noise influence
    let leftAngle = -PI / 6 + (noise(len, depth, seed) - 0.5) * 0.5;
    let rightAngle = PI / 6 + (noise(len + 1, depth, seed + 1) - 0.5) * 0.5;
    
    // Create branches recursively
    branch(newLength, newThickness, leftAngle, depth + 1);
    branch(newLength, newThickness, rightAngle, depth + 1);
    
    // 30% chance to add a middle branch for more organic look
    if (random() < 0.3 && thickness > 2) {
      let middleAngle = (noise(len + 2, depth, seed + 2) - 0.5) * 0.3;
      branch(newLength * 0.8, newThickness * 0.8, middleAngle, depth + 1);
    }
  } else {
    // Draw leaves at the end of small branches
    if (random() < 0.7) {
      let leafSize = random(3, 6);
      noStroke();
      fill(70 + random(40), 100 + random(50), 40 + random(30), 180);
      ellipse(0, 0, leafSize, leafSize * 1.5);
    }
  }
  
  pop();
}