# vitepress 簡單筆記

## 安裝

### 開啟

- 參考 [vitepress](https://vitepress.dev/guide/getting-started)
- 新增資料夾後依序輸入以下指令

```sh
$ npm add -D vitepress
```

```sh
$ npx vitepress init
```

```sh

選擇以下設定，我是選擇  Default Theme + Customization 為了以後可以設置主題使用。
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ○ Default Theme (Out of the box, good-looking docs)
│  ● Default Theme + Customization
│  ○ Custom Theme
└
```

### 文件結構

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ theme [index.ts/style.css]
│  │  └─ config.mts
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json

```

## 新增文章

## 增加連結

## 樣式

- 使用 sh 搭配＄ 會發現按下複製＄不會被複製

````
```sh
$ xxx
````

- 代碼可以增加 高亮 效果 `// [!code ++]`

````
```js
export default {
  name: "MyComponent",  // [!code ++]

};
````

- 推薦插件 [vitePress Snippets](https://marketplace.visualstudio.com/items?itemName=zhoucheng0431.vitepress-snippets)
  - 只要打 / 後就可以快速選擇對應快速鍵，超級方便。
