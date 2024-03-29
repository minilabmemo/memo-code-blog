---
outline: deep
---

# vitepress 筆記

## 開始

### 安裝

- 參考 [vitepress getting-started](https://vitepress.dev/guide/getting-started)
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

## 文章

### 新增文章與鏈結

- 可以自由在/docs 建立資料夾與文章

```sh
├── api-examples.md
├── base
│   ├── bootstrap_note.md
│   └── rwd-noted.md
├── index.md
├── markdown-examples.md
└── vue
    ├── learn.md
    └── vitepress.md
```

- 增加連結
  然後在 config 中增加鏈結 , nav 會出現在右上角，sidebar 則是側邊欄。

```ts config.mts
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Memo Code Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Note",
        items: [
          { text: "bootstrap", link: "/base/bootstrap_note" },
          { text: "Rwd", link: "/base/rwd-noted" },
        ],
      },
      {
        text: "Vue",
        items: [
          { text: "vitepress", link: "/vue/vitepress" },
          { text: "Rwd", link: "/base/rwd-noted" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
```

### 多重側邊欄

- 參考 [vitepress 多侧边栏](https://vitepress.dev/zh/reference/default-theme-sidebar#multiple-sidebars)

如果希望根據不同路由顯示不同的側邊目錄可以這樣設定，設定完之後也記得在 nav 上增加一個鏈結。

### Markdown 扩展

- 參考 [Markdown 扩展](https://vitepress.dev/zh/guide/markdown)

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

### frontmatter 配置

- 參考 [vitepress frontmatter 配置](https://vitepress.dev/zh/reference/frontmatter-config)
- 顯示多層標題，也可以結合數字

```
---
outline: deep / // [!code ++]
---
```

## 主題