// saveFrame関数で実行毎にフォルダ作成 → フレーム保存

import java.util.Date;
import java.text.SimpleDateFormat;

// 起動時刻を保持しておく
String startTimestamp = timestamp();

void setup() {
    size(480, 120);
    textSize(42);
    textAlign(CENTER, CENTER);
    stroke(255);
}

void draw() {
    background(20, 30, 40);
    translate(width / 2, height / 2);
    text(timestamp(), 0, 0);
    
    //毎フレーム保存
    saveFrame("dist/" + startTimestamp + "/sketch-####.png");
}

String timestamp() {
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd-HHmmss-SSS");
    return sdf.format(date);
}
