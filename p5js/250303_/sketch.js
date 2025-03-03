// フローフィールドとパーティクルの設定
let particles = [];
const numParticles = 1000;
const noiseScale = 0.01;
const noiseStrength = 5;
const particleSpeed = 0.7;
const particleSize = 2;
const fadeAmount = 5;
let lastClickTime = 0;
let clickRipple = false;
let clickX = 0;
let clickY = 0;
let rippleSize = 0;
let rippleAlpha = 200;

// カラーパレット - 落ち着いた青と紫のトーン
const colors = [
  [65, 102, 245, 100],  // 青
  [145, 80, 255, 100],  // 紫
  [116, 199, 236, 100], // 水色
  [70, 50, 120, 100],   // 深い紫
  [160, 190, 255, 100]  // 薄い青
];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  background(10, 10, 20);
  
  // キャンバスにマウスプレスイベントを追加
  canvas.mousePressed(handleMousePress);
  
  // パーティクルの初期化
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      pos: createVector(random(width), random(height)),
      vel: createVector(0, 0),
      color: random(colors),
      size: random(1, particleSize * 1.5)
    });
  }
}

function draw() {
  // フェードエフェクト用の半透明の黒色オーバーレイ
  fill(10, 10, 20, fadeAmount);
  noStroke();
  rect(0, 0, width, height);
  
  // 時間変化をノイズに加える
  let noiseTime = frameCount * 0.003;
  
  // すべてのパーティクルを更新して描画
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    // ノイズフィールドによる動き
    let noiseValue = noise(p.pos.x * noiseScale, p.pos.y * noiseScale, noiseTime);
    let angle = noiseValue * TWO_PI * 2;
    
    // 速度更新
    p.vel.x = cos(angle) * particleSpeed;
    p.vel.y = sin(angle) * particleSpeed;
    
    // 位置更新
    p.pos.add(p.vel);
    
    // パーティクルの描画
    noStroke();
    let c = p.color;
    fill(c[0], c[1], c[2], c[3]);
    circle(p.pos.x, p.pos.y, p.size);
    
    // 画面外に出たパーティクルをリセット
    if (p.pos.x < 0 || p.pos.x > width || p.pos.y < 0 || p.pos.y > height) {
      // 画面の端からのみリスポーン
      if (random() > 0.5) {
        p.pos.x = random() > 0.5 ? 0 : width;
        p.pos.y = random(height);
      } else {
        p.pos.x = random(width);
        p.pos.y = random() > 0.5 ? 0 : height;
      }
    }
  }
  
  // クリック波紋エフェクトの描画
  if (clickRipple) {
    noFill();
    stroke(200, 220, 255, rippleAlpha);
    strokeWeight(2);
    circle(clickX, clickY, rippleSize);
    
    // 波紋を拡大し、透明度を下げる
    rippleSize += 5;
    rippleAlpha -= 4;
    
    // 波紋が大きくなりすぎたら非表示に
    if (rippleAlpha <= 0) {
      clickRipple = false;
    }
  }
  
  // 周期的に波のようなパルスを追加
  if (frameCount % 100 === 0) {
    addWavePulse();
  }
}

// 波のようなエフェクトを追加
function addWavePulse() {
  let centerX = random(width);
  let centerY = random(height);
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let distance = dist(p.pos.x, p.pos.y, centerX, centerY);
    if (distance < 200) {
      let angle = atan2(p.pos.y - centerY, p.pos.x - centerX);
      let force = map(distance, 0, 200, 2, 0);
      p.vel.x += cos(angle) * force;
      p.vel.y += sin(angle) * force;
    }
  }
}

// ウィンドウサイズの変更に対応
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(10, 10, 20);
}

// マウスがクリックされたときの処理（確実に動作するように）
function handleMousePress() {
  // クリック位置を保存
  clickX = mouseX;
  clickY = mouseY;
  
  // 波紋エフェクトを有効に
  clickRipple = true;
  rippleSize = 0;
  rippleAlpha = 200;
  
  // パーティクルに力を加える（強さを増加）
  applyForceToParticles(clickX, clickY, 10, 400);
  
  // デバッグ用にコンソールログを追加
  console.log("Mouse clicked at:", clickX, clickY);
  
  // ダブルタップ時は色を変更
  let currentTime = millis();
  if (currentTime - lastClickTime < 300) {
    // パーティクルの色をランダムに変更
    for (let i = 0; i < particles.length; i++) {
      if (random() < 0.3) {
        particles[i].color = random(colors);
      }
    }
  }
  lastClickTime = currentTime;
}

// 指定位置からパーティクルに力を加える
function applyForceToParticles(centerX, centerY, strength, radius) {
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let distance = dist(p.pos.x, p.pos.y, centerX, centerY);
    if (distance < radius) {
      let angle = atan2(p.pos.y - centerY, p.pos.x - centerX);
      let force = map(distance, 0, radius, strength, 0);
      p.vel.x += cos(angle) * force;
      p.vel.y += sin(angle) * force;
      
      // サイズを一時的に大きくする
      p.size *= 1.5;
      // 元のサイズに戻すタイマーは省略（複雑になるため）
    }
  }
}
