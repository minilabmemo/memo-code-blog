# html

## input

- devtool 看到預設 inline-block，有一說是內聯可替換元素。
- 文本输入框（`<input type="text">`）的默认宽度大约是 200px 到 300px 之间，具体取决于浏览器的默认样式和用户代理的设置。
- 要設置寬高可以使用 style
- width="pixel" height 只對 image 有用，"用于创建图形提交按钮，即提交采取图像而不是文本形式的按钮。
- size=""可以改變寬度

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>The input height and width attributes</h1>

    <form action="/action_page.php">
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname" width="200" height="200" style="width: 300px; height: 300px;" /><br />

      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname" size="3" /><br /><br />

      <input type="image" src="img_submit.gif" alt="Submit" width="48" height="200" />
    </form>

    <p><b>Note:</b> The input type="image" sends the X and Y coordinates of the click that activated the image button.</p>
  </body>
</html>
```

- ![image](https://media.licdn.com/dms/image/D4D22AQFrj7DzO-dmxw/feedshare-shrink_800/0/1690194423152?e=2147483647&v=beta&t=yBXtLmYQ74MDZ-Y42bi3T5LYr-uRoM9wgkSkAAxU4Ys)

## 電話號碼和郵箱地址的連結

通常情況下，若要在 HTML 中包含電話號碼和郵箱地址，可以使用 `<a> `標籤，並使用 href 屬性指定 "tel:" 和 "mailto:" 協議。例如：

```html
<a href="tel:1234567890">123-456-7890</a> <a href="mailto:example@example.com">example@example.com</a>
```

這樣的話，當使用者點擊連結時，就可以直接撥打電話或者開啟郵件客戶端發送郵件。
