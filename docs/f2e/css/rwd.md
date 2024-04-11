---
outline: deep
---

# rwd

## 參考文

- [設計自適應網站，必了解的螢幕解析度](https://wdesign.tw/%E8%A8%AD%E8%A8%88%E8%87%AA%E9%81%A9%E6%87%89%E7%B6%B2%E7%AB%99%EF%BC%8C%E5%BF%85%E4%BA%86%E8%A7%A3%E7%9A%84%E8%9E%A2%E5%B9%95%E8%A7%A3%E6%9E%90%E5%BA%A6/)
  - 可以看到 不同機型的手機會有不同的 PHYS.WIDTH/HEIGHT，但卻可能對應到同一個尺寸的 CSS WIDTH／HEIGHT
  - ，寬度大概分成下列幾種：320, 360, 372, 375, 412, 414, 480 像素等，

## 圖示或 logo 注意

- 一般來說的圖示大小約 24px, 在寫的時候會固定住，但其實在小視窗應該大約在 19px(1.2rem) 比較合理。
- 如果沒有設定好很有可能爆版，出現橫向捲軸。
- logo 的話要準備小的圖片

```
  .icon-size{
    width: 1.2rem;
    height: 1.2rem;
  }
@media (min-width: 576px) {

  .icon-size{
    width: 24px;
    height: 24px;
  }
}


```

- 在開發者模式下需要去滑動手指才會看到捲軸的錯誤出現 //TODO
  <img src="./rwd_phone_x.png" alt="图片描述" width="200" height="100">

  - 如果正確是不會出現下方的捲軸的。

- 在開發者模式下抓取 scrollWidth 會看到超出手機大小 360px，建議搭配自動化測試案例去抓看看。

```
console.log(document.documentElement.scrollWidth);
363;  //爆版 // [!code error]
console.log(document.documentElement.scrollWidth);
360; //正確 // [!code ++]
```

## TODO

- [ ]是否有工具？
