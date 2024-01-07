size(500,100);
background(20);
strokeWeight(1);
stroke(220);
smooth();

float xstep = 1;
//float ystep = 10;
float lastx = -999;
float lasty = -999;
float ynoise = random(10);
float y = 50;

for (int x = 20; x <= 480; x += xstep){
  //ystep = random(20) - 10;
  //y += ystep;
  y = 10 + noise(ynoise) * 80;
  if (lastx > -999){
     line(x, y, lastx, lasty);
  }
  lastx = x;
  lasty = y;
  ynoise += 0.1;
}
