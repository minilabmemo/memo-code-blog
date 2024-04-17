# css 使用

## html 注意

- img 標籤建議補上 alt
- button 標籤請補上 type="button" 屬性

## 更換 svg hover 顏色

- [Change Color of SVG on Hover](https://css-tricks.com/change-color-of-svg-on-hover/)

```
svg:hover {
  fill: red;
}

```

- 如果是按鈕 hover 影響 svg 可以改成：
  - 另外記得加上手機版:active 判断手指按下
  - :focus-visible：只有使用键盘的 Tab 键（或快捷键）触发焦点元素焦点环的样式。

```
.btn-outline-primary:hover svg,
.btn.active svg,
.btn:first-child:active svg,
.btn:focus-visible svg {
  fill: white;
  stroke: white;
}
```

## 更換捲軸顏色

- [前端開發｜自定義網頁捲軸 (Scrollbar) 樣式](https://www.astralweb.com.tw/custom-scrollbar-style/)

## Preprocessor (預處理器) 與 postprocessor (後處理器)

![Preprocessor postprocessor](https://i.imgur.com/VCgqqTv.png)
