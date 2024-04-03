# css 使用

## 更換 svg hover 顏色

- [Change Color of SVG on Hover](https://css-tricks.com/change-color-of-svg-on-hover/)

```
svg:hover {
  fill: red;
}

```

- 如果是按鈕 hover 影響 svg 可以改成：
  - 另外記得加上手機版:active 判断手指按下
  - :focus-visible ：只有使用键盘的 Tab 键（或快捷键）触发焦点元素焦点环的样式。

```
.btn-outline-primary:hover svg,
.btn.active svg,
.btn:first-child:active svg,
.btn:focus-visible svg {
  fill: white;
  stroke: white;
}
```
