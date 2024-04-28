# inline＿block

//TODO

## 區塊元素

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        background-color: #f8f2ca;
      }
      h1,
      p,
      ul {
        background-color: #55a8d4;
      }

      h1,
      p {
        width: 100px;
      }
    </style>
  </head>
  <body>
    <div>
      div
      <h1>h1</h1>
      <p>p Text</p>
      <ul>
        <li>1. li</li>
      </ul>
    </div>
  </body>
</html>
```

## 行內元素

- 行內元素寬高是看內容，寬度看內容長度，高度則是行高，如果內容文本換行時高度會增加。
- debug 模式雖然可以在 box model 裡面看到設定，但真正寬高要看左邊顯示，但是樣式會出現提示並反灰。
- 行內元素不會自動換行。
- 文本還是會在溢出後換行，而且也可以擠出下面空間。＠＠

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div,
      span {
        width: 150px;
        height: 150px;
        background-color: #f8f2ca;
      }
      a {
        background-color: #55a8d4;
      }
      em {
        background-color: #55a8d4;
        margin: 5px;
        padding: 5px;
      }

      i {
        background-color: #55a8d4;
        margin: 5px;
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <span
      >span
      <a>a</a>
      <em>em</em>
      <i> i</i>
    </span>
    <div>div</div>
  </body>
</html>
```

### Q:為什麼區塊內的文本似乎有一些空隙，但是行內文本沒有空隙

这是因为在 CSS 中，块级元素和行内元素有不同的默认行为和渲染规则。

1. **块级元素：**

   - 块级元素通常会在页面上单独占据一行，并且会自动产生上下文的间距（margin），即使没有显式地设置 margin 属性也会有一些默认的间距。
   - 此外，一些块级元素会自带默认的内边距（padding），例如 `<div>` 元素，默认的内边距是 0。

2. **行内元素：**
   - 行内元素通常不会产生上下文的间距，它们会沿着页面的文本流进行排列，并且彼此之间不会有额外的空隙。
   - 行内元素的渲染规则不会自动添加额外的间距或内边距。

因此，当你在页面中观察到块级元素内部的文本似乎有一些空隙时，这很可能是因为块级元素的默认渲染规则会自动添加一些间距（margin）或者内边距（padding）所导致的。如果你想要减少或者消除这些空隙，可以使用 CSS 来调整相应的样式，例如设置 margin 和 padding 为 0。
