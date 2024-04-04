---
outline: deep
description: VitePress
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
  - 然後在 config 中增加鏈結 , nav 會出現在右上角，sidebar 則是側邊欄。

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

### 文章路由與多重側邊欄

- 參考 [vitepress 多侧边栏](https://vitepress.dev/zh/reference/default-theme-sidebar#multiple-sidebars)

如果希望根據不同路由顯示不同的側邊目錄可以這樣設定，設定完之後也記得在 nav 上增加一個鏈結。

### Markdown 扩展

- 參考 [Markdown 扩展](https://vitepress.dev/zh/guide/markdown)
- 推薦插件 [vitePress Snippets](https://marketplace.visualstudio.com/items?itemName=zhoucheng0431.vitepress-snippets)
  - 只要打 / 後就可以快速選擇對應快速鍵，超級方便。

#### 代碼區塊

- 插件使用 code-block 可以快速完成代碼區塊插入
- 使用 sh 搭配＄ 會發現按下複製＄不會被複製

````md
```sh
$ xxx
```
````

- 代碼可以增加 高亮 效果 `// [!code ++] ,focus等`，使用插件打/code-helper

````
```js
export default {
  key: "MyComponent",  // [!code --]
  name: "MyComponent",  // [!code ++]
  code warning// [!code warning]
  code error// [!code error]
};
````

- 插件打 code-group

::: code-group

```js [js 區塊]
js;
```

```css [css 區塊]
css
```

:::

#### 提示框

::: tip
出現提示框

> 使用插件打/container,後打 info[灰色], tip[淡紫色],warning[黃色],danger[紅色]

:::

::: details 折疊框 details
details 會出現折疊框。
:::

#### vue 組件

甚至可以在 md 中寫 vue，相對路徑引入即可成功，寫 css 也沒問題！！

```js
<script setup>
import CustomComponent from './components/test.vue'
</script>

## hello: worldss

<CustomComponent />

```

### frontmatter 配置

- 參考 [vitepress frontmatter 配置](https://vitepress.dev/zh/reference/frontmatter-config)

#### 顯示多層標題

也可以結合數字

```
---
outline: deep / // [!code ++]
outline: [2, 3]
---
```

## 主題

- 參考 [vitepress 默认主题配置](https://vitepress.dev/zh/reference/default-theme-config)

- socialLinks: 可以定義你的鏈結
- footer : 新增 footer 對象可以更改訊息資訊，默認只有不包含 sidebar 顯示，home 可見。
- search : 新增 search 對象可以進行搜尋文章。

### 導覽列 nav 的編輯

顯示在右上角的導覽。

#### 初始頁

- 每個 link 都應指定以 / 開頭的實際檔案的路徑。如果在連結末尾添加斜杠，它將顯示相應目錄的 index.md。 （建議使用在 nav）
- 資料夾內建立一個 `layout:doc` 的 index.md 作為初始頁，內容自行設計。

```
   nav: [
      { text: 'Home', link: '/' },
      { text: 'F2E Note', link: '/base/' },
      { text: 'Vue', link: '/vue/' }
    ],
```

#### 下拉式 Dropdown Menu

```
export default {
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' }
        ]
      }
    ]
  }
}

```

## TBD

代辦清單！

- [ ]代碼折疊功能需要插件
- [ ]文章似乎不能打 tag
- [ ]i18n TODO
- [ ]version TODO
- [ ] 首頁按鈕 TODO
- [ ] 留言區
- [ ] 廣告
- [ ]Google 分析
- [ ]自訂樣式
