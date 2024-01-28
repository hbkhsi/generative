import java.util.Date;
import java.text.SimpleDateFormat;

PImage img;
int mosaicWidth = 30;
int mosaicHeight = 20;

void settings() {
    img = loadImage("/Users/hibiki/Projects/generative/processing/Images/photo_03.jpg"); // 画像をロード
    float aspectRatio = calculateAspectRatio(img);
    size(int(1000 * aspectRatio), 1000); // 画像のサイズに合わせてキャンバスのサイズを設定
    //size(img.width, img.height);
    smooth();
}

void setup() {
    noStroke();
}

void draw() {
    background(0);
    image(img, 0, 0,width, height);
    loadPixels();
    
    for (int j = 0; j < height; j += mosaicHeight) {  
        for (int i = 0; i < width; i += mosaicWidth) {  
            color c = pixels[j * width + i];
            fill(c);
            rect(i, j, mosaicWidth, mosaicHeight);
        }
    }
    
}

float calculateAspectRatio(PImage img) {
    return float(img.width) / float(img.height);
}


void mouseDragged() {
    mosaicWidth = mouseX / 4 + 10;
    mosaicHeight = mouseY / 4 + 10;
    
    if (mosaicWidth <= 0) {
        mosaicWidth = 1;
    }
    if (mosaicHeight <= 0) {
        mosaicHeight = 1;
    }
    
    println(mosaicWidth,mosaicHeight);
}


void keyPressed() {
    if (key == 's') {
        save("dist/sketch-" + timestamp() + ".png");
    }
}

String timestamp() {
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HHmmss-SSS");
    return sdf.format(date);
}



// 改善点
// loadPixels() の使用 : loadPixels() は pixels[] 配列を更新しますが、image(img, 0, 0, width, height) を使用すると、img のピクセルが pixels[] 配列に直接コピーされません。正確な色情報を取得するには、img.loadPixels() を使用し、img.pixels[] 配列から色を取得する必要があります。
// パフォーマンス : 大きな画像や小さなモザイクタイルサイズでこのコードを実行すると、パフォーマンスが低下する可能性があります。モザイクの各セルに対してピクセルの平均色を計算するなどの最適化を検討すると良いでしょう。
// モザイクの端の処理 : 画像の端にあるモザイクタイルは、完全なタイルよりも小さくなる可能性がありますが、このコードではそのような場合の特別な処理を行っていません。画像の端の処理を改善するために、条件分岐を使用して最後の行や列のサイズを調整することができます。
