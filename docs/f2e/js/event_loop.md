# 事件迴圈（Event Loop）。

## 間隔一秒印出數字 `for {setTimeout}`

- 錯誤寫法
  - setTimeout 是 web API 會被暫時放到 queue 中等待執行，等到要執行時，i 已經變成`結束時的 3`
  - 可以分成兩段去想像

```js
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); //3 3 3
  }, 100);
}
```

- 正確寫法

```js
//IIFE 不過現在比較少使用 var
for (var i = 0; i < 3; i++) {
  (function (x) {
    setTimeout(function () {
      console.log(x);
    }, 1000 * x);
  })(i);
}
//利用 let
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); //0 1 2
  }, 100);
}
```
