

## prettier 與 vue 的格式化衝突問題

### prettier 的格式化

Prettier - Code formatter: 提供我們做程式碼的格式化，最重要的是來協助我們自動載入 .prettierrc.js 配置。

- 我有裝另一個插件是 Prettier ESLint 不過這似乎是針對 JS 跟 TS 的，格式化沒感覺。

- 設定 .prettierrc.json，可以參考這篇說明 [vue3+ts 的 Prettier 格式化配置.prettierrc.json](https://www.mulingyuer.com/archives/903/)

```
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": true,   // 每個語句的結尾需不需要分號，我改為true，需要
  "tabWidth": 2,
  "singleQuote": true,  // 字串使用是否使用單引號，很多都是 true 使用單引號
  "printWidth": 100,  // 每行文字數量達 100 字元就換到新的一行
  "trailingComma": "none"   // 如 Object、Array 內的元素不需要尾隨逗號
}

```

- 使用 prettier-Code Format 的好處是 可以幫你把 class 中多餘的空白給去除，中間的連續空白也會，一說是去除空白有助於效能。
- 可以看到“輸出”欄位會有相關資訊

```
    <div class="     col-4  col-xl-4">
    <div class="col-4 col-xl-4">
    ["INFO" - 下午1:08:01] Prettier Options:
    ["INFO" - 下午1:08:02] Formatting completed in 380ms.
```

- 不過針對空元素 (void elements) 會自動增加閉合標籤 (self closing tags )

```
 <img src="@/assets/img/icons/save.svg" alt="save" class="icon-size" />

```

### vue 的格式化

- 但是 vue 的規格 [vue/html-self-closing](https://eslint.vuejs.org/rules/html-self-closing)中針對空元素預設不允許加入

```
   <img src="@/assets/img/icons/save.svg" alt="save" class="icon-size">
```

- 相關討論
  - [prettier/prettier|Add an option to prefer void tags over self closing tags. #5246](https://github.com/prettier/prettier/issues/5246) - OPEN
    - 許多樣式指南不鼓勵使用自閉 void 標籤：Google、jQuery、Drupal、codeguide.co。 （反例：W3Schools、WordPress）
    - 不知道為何不允許改變
  - [prettier/eslint-config-prettier|conflict with vue/html-self-closing ](https://github.com/prettier/eslint-config-prettier/issues/85) - 更改 vue/html-self-closing 規則 然後？
    > 在 HTML5 标准中，自闭合标签中的“/”，加与不加都是可行的

> 整體來說，我還是偏好 vue 格式化，prettier 好處是去除空白？不知道該如何讓兩者優點相容

## 去除 class=""

最後選染會變成`<div class>`

- 有點像這個[:class="undefined" causes class being rendered #3173](https://github.com/vuejs/core/issues/3173)

  - minor issue 未解

- 找不到相關插件或是規則，先手動刪除
- 類似要求，從 dom 刪除的方式 https://stackoverflow.com/questions/2058005/checking-if-the-class-attribute-is-empty-and-then-removing-it-if-true-with-jquer

## 參考

- [Google HTML/CSS 樣式指南](https://google.github.io/styleguide/htmlcssguide.html#HTML_Style_Rules)
- [google js style rules](https://github.com/welkineins/tw-google-styleguide/blob/master/google-javascript-styleguide/javascript_style_rules.rst)
- [google js lang rules](https://github.com/welkineins/tw-google-styleguide/blob/master/google-javascript-styleguide/javascript_style_rules.rst)
- [jquery|JavaScript Style Guide](https://contribute.jquery.org/style-guide/js/)
- [Airbnb JavaScript 风格指南 ()](https://lin-123.github.io/javascript/)
- [风格指南 — Vue.js](https://v2.cn.vuejs.org/v2/style-guide/)
- [Vue3.2 文档中样例代码修改了单文件组件的顶级元素的顺序，这样做的意义是什么呢？](https://www.zhihu.com/question/483860485)
- [vue3＜script setup＞——基础使用](https://blog.csdn.net/weixin_42289080/article/details/130644311)
  - 建议  script 写在 template 上面（官方文档的 demo 都是这样的顺序，瞬间有 jsx 那味儿了）


