---
outline: deep
---

# center

## 重點

- 行內內容 inline-level content

## 參考

- [](https://www.w3schools.com/css/css_align.asp)

## text-align 的置中

定義：

> - The text-align CSS property sets the horizontal alignment of the inline-level content inside a block element or table-cell box.
> - text-align CSS 属性设置块元素或者单元格框的行内内容的水平对齐。
>   －MDN

### Q:塊級元素的文本也是行內內容嗎

对于块级元素来说，它们内部的文本内容也被视为行内内容。虽然块级元素本身是在文档流中会产生换行的元素，但是其内部的文本内容通常会被视为行内内容，会根据文本的宽度自动换行。

所以，即使是在块级元素内部，其文本内容也被视为行内内容，可以通过 `text-align` 属性来控制文本的水平对齐方式。`text-align` 属性会影响块级元素内部的文本内容的水平对齐方式，使得文本内容在块级元素内水平居中、左对齐或右对齐。

- Q:為什麼 div 裡面的文本也是 Inline-level content
  我之前的解释可能会引起混淆，我需要更正一下。

在 HTML 中，`<div>` 元素是一个块级元素，它本身并不是行内级别的内容。我之前所说的 "div 内部的文本内容被视为行内内容" 是正确的，但是这并不意味着 `<div>` 元素本身是一个行内级别的元素。

实际上，`<div>` 元素内部的文本内容被视为匿名行内级别的内容，也就是说它是由行内级别的内容组成的。所以当我们说 "div 内部的文本内容是行内级别的" 时，我们指的是它的文本内容的级别，而不是 `<div>` 元素本身的级别。

总之，`<div>` 元素本身是一个块级元素，但是它内部的文本内容是行内级别的。

- [css 中的匿名框 (Anonymous Box)](https://www.cnblogs.com/chaoguo1234/archive/2013/03/03/2941718.html)
  - 任何直接存在于一个块级元素里面的文本 (即文本没有被行内元素包裹)，都会被视为匿名行内元素

－－－－－－－－－

### 其他解釋？？

- [第 6 集：CSS 社交距離（下）](https://ithelp.ithome.com.tw/articles/10268960)

  - text-align 行內元素才會起作用。?? 這邊的範例與解釋看不懂

```css
.container {
  width:50%;
  height:300px;
  background-color:blue;
}
.box {
text-align: center;
}

<div class="container">
	<a class="box">link</a>
</div>

```

- text-align 要放在容器上，對裡面的文本才有效。

> GPT:
> text-align 属性的确是用来控制文本内容在块级元素内的水平对齐方式，但是它并不仅仅只对行内元素有效。实际上，text-align 属性作用于块级元素时，会影响其内部所有文本内容（包括行内元素和块级元素）的水平对齐方式。

- [text-align](https://ithelp.ithome.com.tw/articles/10219683)
  - 控制 inline-level element 的對齊方式。
  - 適用於「block container」。也就是在 "inline-level element 的容器"上設定 text-align 屬性，而此容器需為 block container。
  - inline、inline-block 與 inline-table 皆為 inline-level element。
