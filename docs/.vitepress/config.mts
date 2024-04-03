import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/memo-code-blog/',
  ignoreDeadLinks: true,
  title: "Memo Code Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '整理筆記', link: '/guide/' },
      {
        text: '隨手記',
        items: [
          { text: '前端', link: '/f2e/' },
          { text: 'Vue', link: '/vue/' },
        ]
      }
    ],

    sidebar:
    {'/': [
      {
        text: 'js',
        collapsed: false,
        items: [
    
        ]
      },   
      {
        text: 'css',
        collapsed: false,
        items: [
         { text: '[flex] 預設與溢出問題', link: '/f2e/css/flex' },
          { text: '[flex] 均分與bootstrap格線系統', link: '/f2e/css/flex_row' },
          { text: '[flex] 對齊與自動邊界', link: '/f2e/css/flex_margin' },
          { text: '[grid] 格線系統', link: '/f2e/css/grid' },
          { text: '[bootstrap] 應用', link: '/f2e/css/bootstrap' },
    
          { text: 'Rwd', link: '/f2e/css/rwd' }
         
        ]
      },
      {
        text: 'Test',
        collapsed: false,
        items: [
          { text: 'E2E test', link: '/f2e/test/cypress' },
         
        ]
      },
    ],
    '/vue/': [
    
      {
        text: 'vitepress',
        items: [
          { text: 'start', link: '/vue/vitepress/start' },
          { text: '(備) Markdown Examples', link: '/vue/vitepress/markdown-examples' },
          { text: '(備) Runtime API Examples', link: '/vue/vitepress/api-examples' }
         
        ]
      },
      {
        text: 'Vue3',
        items: [
         
          { text: 'start', link: '/vue/vue3/learn' },
          { text: 'composition', link: '/vue/vue3/composition' },
         
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
