import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Memo Code Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },   
      {
        text: 'Note',
        items: [
          { text: 'bootstrap', link: '/base/bootstrap_note' },
          { text: 'Rwd', link: '/base/rwd-noted' }
        ]
      },
      {
        text: 'Vue',
        items: [
          { text: 'vitepress', link: '/vue/vitepress' },
          { text: 'Rwd', link: '/base/rwd-noted' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
