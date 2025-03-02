size(300, 300);
smooth();
background(255);

float xStart = random(10);
float xNoise = xStart;
float yNoise = random(10);

for (int y = 0; y <= height; y += 1){
  yNoise += 0.01;
  xNoise = xStart;
  for (int x = 0; x <= width; x += 1){
    xNoise += 0.01;
  int alph = int(noise(xNoise, yNoise) * 255);
  stroke(0, alph);
  line(x, y, x+1, y+1);
  }
}
