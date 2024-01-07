int _diam = 10;
float _centX, _centY;

void setup(){
  size(500, 300);
  frameRate(24);
  smooth();
  background(180);
  _centX = width/2;
  _centY = height/2;
  stroke(0);
  strokeWeight(5);
  fill(255,50);
}

void draw(){
  if (_diam <= 400){
    background(180);
    ellipse(_centX, _centY, _diam, _diam);
    _diam += 10;
  }
}
