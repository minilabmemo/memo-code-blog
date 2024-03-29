import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Memo Code Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'F2E Note', link: '/base/' },
      { text: 'Vue', link: '/vue/' }
    ],

    sidebar:
    {'/': [
      {
        text: 'F2E Note',
        items: [
          { text: 'bootstrap', link: '/base/bootstrap_note' },
          { text: 'Rwd', link: '/base/rwd-noted' }
        ]
      },   
      {
        text: 'Note',
        items: [
          { text: 'bootstrap', link: '/base/bootstrap_note' },
          { text: 'Rwd', link: '/base/rwd-noted' }
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
