import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/memo-code-blog/",
  ignoreDeadLinks: true,
  title: "Memo Code Blog",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "部落格", link: "https://minilabmemo.github.io/" },
      { text: "前端", link: "/f2e/" },
      { text: "Vue", link: "/vue/" },
      {
        text: "隨手記",
        items: [
          { text: "Vitepress", link: "/vue/vitepress/vitepress_note" },
          { text: "技術相關", link: "/tech/" },
        ],
      },
    ],

    sidebar: {
      "/": [
        {
          text: "javascript",
          collapsed: false,
          items: [
            { text: "oop 物件導向", link: "/f2e/js/oop" },
            { text: "[event loop] setTimeout", link: "/f2e/js/event_loop" },
          ],
        },
        {
          text: "css/html",
          collapsed: false,
          items: [
            { text: "[html] 使用雜記", link: "/f2e/css/html" },
            { text: "[css] 樣式雜記", link: "/f2e/css/css_note" },
            { text: "[css] 我說那個 width 怎麼跟我想的不一樣", link: "/f2e/css/width" },
            { text: "[css] 區塊與行內元素", link: "/f2e/css/inline_block" },
            { text: "[css] 置中方法", link: "/f2e/css/center" },

            { text: "[flex] 預設與溢出問題", link: "/f2e/css/flex" },
            { text: "[flex] 均分與bootstrap格線系統", link: "/f2e/css/flex_row" },
            { text: "[flex] 對齊與自動邊界", link: "/f2e/css/flex_margin" },
            { text: "[grid] 格線系統", link: "/f2e/css/grid" },
            { text: "[bootstrap] 應用 + vue", link: "/f2e/css/bootstrap" },
            { text: "[flex+bootstrap] 卡片對齊", link: "/f2e/css/flex_bs_items" },
            { text: "[Rwd] 注意事項", link: "/f2e/css/rwd" },
          ],
        },
        {
          text: "Test / QA",
          collapsed: false,
          items: [
            { text: "[E2E test] cypress使用筆記", link: "/f2e/test/cypress" },
            { text: "[eslint] 利用eslint檢驗程式碼品質與修正", link: "/f2e/test/eslint" },
            { text: "[design pattern] 設計模式", link: "/f2e/others/design_pattern" },
          ],
        },
        {
          text: "其他",
          collapsed: false,
          items: [
            { text: "[design] 設計靈感/素材網站", link: "/f2e/others/design_inspire" },
            { text: "[design/devTool] 設計與開發工具", link: "/f2e/others/design_tools" },
          ],
        },
      ],
      "/vue/": [
        {
          text: "Vue3",
          items: [
            { text: "基礎與概念", link: "/vue/vue3/learn" },
            { text: "vue 指令", link: "/vue/vue3/v-directives" },
            { text: "[vite] 專案", link: "/vue/vue3/vite" },
            { text: "composition 用法", link: "/vue/vue3/composition" },
            { text: "應用情境筆記 ", link: "/vue/vue3/context" },
            { text: "邏輯復用筆記 ", link: "/vue/vue3/reuse" },
            { text: "[nuxt 3] 建立專案筆記", link: "/vue/vue3/nuxt3_project" },
            { text: "[nuxt 3] 學習筆記 ", link: "/vue/vue3/nuxt3_use" },
          ],
        },
        {
          text: "vitepress",
          items: [
            { text: "[vitepress]使用筆記", link: "/vue/vitepress/vitepress_note" },
            { text: "(備) Markdown Examples", link: "/vue/vitepress/markdown-examples" },
            { text: "(備) Runtime API Examples", link: "/vue/vitepress/api-examples" },
          ],
        },
        {
          text: "其他",
          items: [{ text: "pinia 跨元件狀態溝通", link: "/vue/others/pinia" }],
        },
      ],
      "/tech/": [
        {
          text: "tech",
          items: [{ text: "[vscode]使用筆記", link: "/tech/vscode" }],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/minilabmemo" }],
    footer: {
      message: "",
      copyright: "Copyright © 2024-minilabmemo",
    },
    search: {
      provider: "local",
    },
  },
});
