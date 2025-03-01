let mic;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noFill();
  stroke(255);

  // Create and start the audio input
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(20);
  orbitControl();
  rotateY(frameCount * 0.01);

  let micLevel = mic.getLevel();
  console.log(micLevel);

  let sphereDetail = 50;
  let noiseScale = 10.0;

  let noiseStrength = map(micLevel, 0, 0.1, 80, 500, true);

  let radius = min(width, height) * 0.08;
  let noiseTime = frameCount * 0.01;

  for (let latitude = 0; latitude < sphereDetail; latitude++) {
    let theta1 = map(latitude, 0, sphereDetail, 0, PI);
    let theta2 = map(latitude + 1, 0, sphereDetail, 0, PI);

    beginShape(TRIANGLE_STRIP);
    for (let longitude = 0; longitude <= sphereDetail; longitude++) {
      let phi = map(longitude, 0, sphereDetail, 0, TWO_PI);

      let x1 = sin(theta1) * cos(phi);
      let y1 = cos(theta1);
      let z1 = sin(theta1) * sin(phi);
      let n1 = noise(
        x1 * noiseScale + noiseTime,
        y1 * noiseScale + noiseTime,
        z1 * noiseScale + noiseTime
      );
      let r1 = radius + n1 * noiseStrength;
      vertex(x1 * r1, y1 * r1, z1 * r1);

      let x2 = sin(theta2) * cos(phi);
      let y2 = cos(theta2);
      let z2 = sin(theta2) * sin(phi);
      let n2 = noise(
        x2 * noiseScale + noiseTime,
        y2 * noiseScale + noiseTime,
        z2 * noiseScale + noiseTime
      );
      let r2 = radius + n2 * noiseStrength;
      vertex(x2 * r2, y2 * r2, z2 * r2);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  userStartAudio(); 
}