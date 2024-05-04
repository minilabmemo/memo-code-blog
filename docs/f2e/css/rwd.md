---
outline: deep
---

# rwd

## rem note

```css
/* 1.125rem;18px /
/ 1 rem = 16px*/
/* 0.875rem;14px /
/ 1.25rem 20px /
/ 1.5rem 24px /
/ 2rem 32px /
/ 4rem; 64px */
```

## 參考文

- [設計自適應網站，必了解的螢幕解析度](https://wdesign.tw/%E8%A8%AD%E8%A8%88%E8%87%AA%E9%81%A9%E6%87%89%E7%B6%B2%E7%AB%99%EF%BC%8C%E5%BF%85%E4%BA%86%E8%A7%A3%E7%9A%84%E8%9E%A2%E5%B9%95%E8%A7%A3%E6%9E%90%E5%BA%A6/)
  - 可以看到 不同機型的手機會有不同的 PHYS.WIDTH/HEIGHT，但卻可能對應到同一個尺寸的 CSS WIDTH／HEIGHT
  - ，寬度大概分成下列幾種：320, 360, 372, 375, 412, 414, 480 像素等，

## 圖示或 logo 注意

- 一般來說的圖示大小約 24px, 在寫的時候會固定住，但其實在小視窗應該大約在 19px(1.2rem) 比較合理。
- 如果沒有設定好很有可能爆版，出現橫向捲軸。
- logo 的話要準備小的圖片

```css
.icon-size {
  width: 1.2rem;
  height: 1.2rem;
}
@media (min-width: 576px) {
  .icon-size {
    width: 24px;
    height: 24px;
  }
}
```

- [ ]在開發者模式下需要去滑動手指才會看到捲軸的錯誤出現
  <img src="./rwd_phone_x.png" alt="图片描述" width="200" height="100">

  - 如果正確是不會出現下方的捲軸的。

- 在開發者模式下抓取 scrollWidth 會看到超出手機大小 360px，建議搭配自動化測試案例去抓看看。

```sh
console.log(document.documentElement.scrollWidth);
363;  //爆版 // [!code error]
console.log(document.documentElement.scrollWidth);
360; //正確 // [!code ++]
```

## 文字斷點設計

在手機畫面下文字通常是 14px,BS 似乎沒有根據斷點改變字體大小，可以自己設定。
当你在 CSS 中选择类名时，最好选择能清晰描述其用途的名称，这样可以增加代码的可读性。在这种情况下，你可以选择描述文本大小的类名，例如：

```css
/* 默认字体大小 */
.font-normal {
  font-size: 16px;
}

/* 在小屏幕下（宽度小于 576px）设置较小的字体大小 */
@media (max-width: 575.98px) {
  .font-small {
    font-size: 14px;
  }
}

/* 在中等屏幕下（宽度介于 576px 和 991.98px 之间）设置中等字体大小 */
@media (min-width: 576px) and (max-width: 991.98px) {
  .font-medium {
    font-size: 18px;
  }
}

/* 在大屏幕下（宽度大于等于 992px）设置较大的字体大小 */
@media (min-width: 992px) {
  .font-large {
    font-size: 20px;
  }
}
```

这样，通过 `.font-small`、`.font-medium` 和 `.font-large` 这样的类名，就可以清楚地知道它们的作用是调整字体大小。

## 字體

```
font-size: clamp( 0.875rem, 2.5vw, 1rem);
字體是14px~16px

```

::: tip
字體具有繼承，如果設在父親，裡面的子孫都會繼承，除非他本身有設定，就算設定的權限小於父親也會以本身為主。
:::

- 參考
  - [FLUID TYPOGRAPHY TOOL](https://fluidtypography.com/#app-get-started)
  - [vw 進化了！更好用的 CSS 自適應字體大小](https://muki.tw/responsive-css-font-size-utilities/)

## TODO

- [ ]字體加法不太懂
- [ ]是否有工具？
