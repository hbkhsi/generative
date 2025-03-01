//reference: https://how-to-build-du-j.tumblr.com/
let x, y, t;
let params = {
  a: new Array(6),
  f: new Array(6),
  p: 0,
  q: 0
};
let vel = 0.01;

function timestamp() {
  const d = new Date();
  return `${d.getFullYear()}${(d.getMonth() + 1).toString().padStart(2, "0")}${d
    .getDate()
    .toString()
    .padStart(2, "0")}-${d.getHours().toString().padStart(2, "0")}${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}${d.getSeconds().toString().padStart(2, "0")}-${d
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
}

function initializeParams() {
  // パラメータの初期化
  for (let i = 0; i < 6; i++) {
    params.a[i] = random(-3, 3).toFixed(1);
    params.f[i] = random(-3, 3).toFixed(1);
  }
  params.p = int(1);
  params.q = int(2);
  console.log(params);
}

function setup() {
  createCanvas(800, 800);
  background("#ffffff");
  
  // 初期値の設定
  x = random(-1, 1);
  y = random(-1, 1);
  t = 0.0;
  
  // 描画設定
  stroke(0, 100);
  strokeWeight(0.5);
  
  initializeParams();
}

function calculateNextPoint() {
  let x1 =
    params.a[0] * Math.pow(sin(params.f[0] * x), params.p) +
    params.a[1] * Math.pow(cos(params.f[1] * y), params.p) +
    params.a[2] * Math.pow(sin(params.f[2] * t), params.p);
    
  let y1 =
    params.a[3] * Math.pow(sin(params.f[3] * y), params.q) +
    params.a[4] * Math.pow(cos(params.f[4] * x), params.q) +
    params.a[5] * Math.pow(sin(params.f[5] * t), params.q);
    
  return { x: x1, y: y1 };
}

function draw() {
  for (let i = 0; i < 5000; i++) {
    let nextPoint = calculateNextPoint();
    x = nextPoint.x;
    y = nextPoint.y;
    
    let px = map(x, -2, 2, 0, width);
    let py = map(y, -2, 2, 0, height);
    point(px, py);
  }
  t += vel;
}

function keyPressed() {
  if (key === "s") {
    save(timestamp() + ".png");
  }
}
