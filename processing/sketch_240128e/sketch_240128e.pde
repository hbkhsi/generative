PImage img; // 画像を格納するための変数

void settings() {
    img = loadImage("/Users/hibiki/Projects/generative/processing/Images/photo_01.jpg"); // 画像をロード
    float aspectRatio = calculateAspectRatio(img); // 画像の縦横比を計算
    size(int(500 * aspectRatio), 500); // 縦横比に基づいてキャンバスのサイズを設定
}

void setup() {
    image(img, 0, 0, width, height); // 画像をキャンバスサイズに合わせて描画
}

// 画像の縦横比を計算する関数
float calculateAspectRatio(PImage img) {
    return float(img.width) / float(img.height);
}
