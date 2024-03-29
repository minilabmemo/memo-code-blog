import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Memo Code Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '整理筆記', link: '/guide/' },
      { text: 'Vue', link: '/vue/' },
      {
        text: '隨手記',
        items: [
          { text: '草稿', link: '/draft/' },
          { text: 'Vue', link: '/vue/' },
        ]
      }
    ],

    sidebar:
    {'/': [
      {
        text: 'base',
        items: [
          { text: 'bootstrap', link: '/draft/base/bootstrap_note' },
          { text: 'Rwd', link: '/draft/base/rwd-noted' }
        ]
      },   
      {
        text: 'Test',
        items: [
          { text: 'E2E test', link: '/draft/test/cypress' },
         
        ]
      },
    ],
    '/vue/': [
    
      {
        text: 'vitepress',
        items: [
          { text: 'start', link: '/vue/vitepress/start' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
         
        ]
      },
      {
        text: 'Vue',
        items: [
         
          { text: 'start', link: '/vue/learn' },
         
        ]
      }
    ]
  }
    ,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/minilabmemo' }
    ],
    footer: {
      message: '',
      copyright: 'Copyright © 2024-minilabmemo'
    }
    ,  
    search: {
      provider: 'local'
    }
  }
})
