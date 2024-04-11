import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/memo-code-blog/",
  ignoreDeadLinks: true,
  title: "Memo Code Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "部落格", link: "https://minilabmemo.github.io/" },
      {
        text: "隨手記",
        items: [
          { text: "前端", link: "/f2e/" },
          { text: "Vue", link: "/vue/" },
          { text: "Vitepress", link: "/vue/vitepress/start" },
          { text: "概念", link: "/guide/" },
        ],
      },
    ],

    sidebar: {
      "/": [
        {
          text: "js",
          collapsed: false,
          items: [],
        },
        {
          text: "css",
          collapsed: false,
          items: [
            { text: "[flex] 預設與溢出問題", link: "/f2e/css/flex" },
            { text: "[flex] 均分與bootstrap格線系統", link: "/f2e/css/flex_row" },
            { text: "[flex] 對齊與自動邊界", link: "/f2e/css/flex_margin" },
            { text: "[grid] 格線系統", link: "/f2e/css/grid" },
            { text: "[bootstrap] 應用", link: "/f2e/css/bootstrap" },

            { text: "[Rwd] 注意事項", link: "/f2e/css/rwd" },
            { text: "[css] 樣式雜記", link: "/f2e/css/style" },
          ],
        },
        {
          text: "Test / QA",
          collapsed: false,
          items: [{ text: "[E2E test] cypress使用筆記", link: "/f2e/test/cypress" }],
        },
      ],
      "/vue/": [
        {
          text: "Vue3",
          items: [
            { text: "基礎與概念", link: "/vue/vue3/learn" },
            { text: "composition 用法", link: "/vue/vue3/composition" },
            { text: "應用情境筆記 ", link: "/vue/vue3/context" },
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
      "/guide/": [
        {
          text: "javascript",
          items: [{ text: "oop 物件導向", link: "/guide/js/oop" }],
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
