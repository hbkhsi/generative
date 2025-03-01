  // Bauhaus-inspired geometric generative art
// Non-animated, creates a new composition on each refresh

// Bauhaus color palette
const colors = {
  red: '#F1352B',
  blue: '#005EA8',
  yellow: '#FFDC00',
  black: '#000000',
  white: '#FFFFFF'
};

// Shape types
const SQUARE = 0;
const CIRCLE = 1;
const TRIANGLE = 2;

// Grid properties
const GRID_SIZE = 8;
const MIN_SIZE = 30;
const MAX_SIZE = 100;

// Shape array to store all elements
let shapes = [];

function setup() {
  createCanvas(800, 800);
  noLoop();
  
  // Generate a balanced composition
  generateComposition();
}

function draw() {
  background(colors.white);
  
  // Draw all shapes
  for (let shape of shapes) {
    shape.display();
  }
}

function mousePressed() {
  // Generate a new composition on mouse click
  generateComposition();
  redraw();
}

function generateComposition() {
  shapes = [];
  
  // Grid-based placement with density control
  let cellSize = width / GRID_SIZE;
  
  // Determine color distribution for balance
  let colorCount = {
    red: 0,
    blue: 0,
    yellow: 0,
    black: 0
  };
  
  // Maximum number of shapes per color to ensure balance
  const maxPerColor = Math.floor((GRID_SIZE * GRID_SIZE) / 4);
  
  // Create shapes on a grid
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      // 70% chance to place a shape in each cell
      if (random() < 0.7) {
        let x = col * cellSize + cellSize / 2;
        let y = row * cellSize + cellSize / 2;
        
        // Randomize shape type
        let shapeType = floor(random(3));
        
        // Randomize size within constraints
        let size = random(MIN_SIZE, min(MAX_SIZE, cellSize * 0.9));
        
        // Select color with balance constraints
        let colorKeys = Object.keys(colorCount);
        let selectedColor;
        
        // Try to balance colors
        let availableColors = colorKeys.filter(c => colorCount[c] < maxPerColor);
        
        if (availableColors.length > 0) {
          selectedColor = colors[availableColors[floor(random(availableColors.length))]];
          // Update color count
          for (let c of colorKeys) {
            if (selectedColor === colors[c]) {
              colorCount[c]++;
              break;
            }
          }
        } else {
          // If all colors reached max, default to random selection
          selectedColor = colors[colorKeys[floor(random(colorKeys.length))]];
        }
        
        // Make larger shapes less common
        if (size > cellSize * 0.7 && random() > 0.4) {
          size *= 0.7;
        }
        
        // Create new shape
        let newShape = new Shape(x, y, size, shapeType, selectedColor);
        shapes.push(newShape);
      }
    }
  }
  
  // Ensure at least 20 shapes for visual interest
  if (shapes.length < 20) {
    generateComposition(); // Try again
  }
  
  // Add a few black structural elements for balance
  addStructuralElements();
}

function addStructuralElements() {
  // Add 3-5 black lines or rectangles for structural balance
  let numElements = floor(random(3, 6));
  
  for (let i = 0; i < numElements; i++) {
    if (random() < 0.5) {
      // Horizontal or vertical line
      let isHorizontal = random() < 0.5;
      let x1, y1, x2, y2;
      let thickness = random(2, 8);
      
      if (isHorizontal) {
        y1 = y2 = random(height);
        x1 = 0;
        x2 = width;
      } else {
        x1 = x2 = random(width);
        y1 = 0;
        y2 = height;
      }
      
      shapes.push(new Line(x1, y1, x2, y2, thickness, colors.black));
    } else {
      // Thin rectangle
      let w = random() < 0.5 ? random(width * 0.4, width * 0.8) : random(10, 30);
      let h = random() < 0.5 ? random(10, 30) : random(height * 0.4, height * 0.8);
      let x = random(width - w);
      let y = random(height - h);
      
      shapes.push(new Rectangle(x, y, w, h, colors.black));
    }
  }
}

// Shape class
class Shape {
  constructor(x, y, size, type, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.color = color;
    this.rotation = random(TWO_PI);
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(this.color);
    noStroke();
    
    switch (this.type) {
      case SQUARE:
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        break;
      case CIRCLE:
        ellipse(0, 0, this.size, this.size);
        break;
      case TRIANGLE:
        let s = this.size / 2;
        triangle(0, -s, -s, s, s, s);
        break;
    }
    
    pop();
  }
}

// Line class for structural elements
class Line {
  constructor(x1, y1, x2, y2, thickness, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.thickness = thickness;
    this.color = color;
  }
  
  display() {
    stroke(this.color);
    strokeWeight(this.thickness);
    line(this.x1, this.y1, this.x2, this.y2);
    noStroke();
  }
}

// Rectangle class for structural elements
class Rectangle {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  
  display() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
}