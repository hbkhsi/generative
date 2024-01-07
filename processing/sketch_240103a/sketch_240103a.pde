void setup(){
  size(500, 500);
  background(20);
  strokeWeight(4);
  strokeCap(SQUARE);
  
  for (int h = 10; h <= (height - 20); h += 10){
    stroke(0, 255-h);
    line(20, h, width - 20, h);
    stroke(255, h);
    line(20, h + 4, width - 20, h + 4);
    //if (h > 255) {
    //  break;
    //}
  }
  saveFrame("screen.png");
}
