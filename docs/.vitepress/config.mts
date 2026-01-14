import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

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
        items: [{ text: "技術相關", link: "/tech/" }],
      },
    ],

    sidebar: generateSidebar([
      {
        documentRootPath: "docs",
        scanStartPath: "f2e",
        resolvePath: "/f2e/",
        useTitleFromFileHeading: true,
        collapsed: false,
        excludeFiles: ["index.md"],
        excludeFilesByFrontmatterFieldName: "draft",
        sortMenusByFrontmatterOrder: true,
        removePrefixAfterOrdering: true,
        prefixSeparator: ".",
      },
      {
        documentRootPath: "docs",
        scanStartPath: "vue",
        resolvePath: "/vue/",
        useTitleFromFileHeading: true,
        collapsed: false,
        excludeFiles: ["index.md"],
        excludeFilesByFrontmatterFieldName: "draft",
        sortMenusByFrontmatterOrder: true,
        removePrefixAfterOrdering: true,
        prefixSeparator: ".",
      },
      {
        documentRootPath: "docs",
        scanStartPath: "tech",
        resolvePath: "/tech/",
        useTitleFromFileHeading: true,
        collapsed: false,
        excludeFiles: ["index.md"],
        excludeFilesByFrontmatterFieldName: "draft",
        sortMenusByFrontmatterOrder: true,
        removePrefixAfterOrdering: true,
        prefixSeparator: ".",
      },
    ]),
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
