



# nuxt3 assets


## css
參考 [nuxt|local-stylesheets](https://nuxt.com/docs/getting-started/styling#local-stylesheets)

### main css
新增 assets/css/main.css 並加入到 defineNuxtConfig 中，載入時就會去獲取 main.css

### 字型＋tailwind css
- 設定 assets/css/fonts/cherry-bomb-one.css 抓取遠端 woff 檔案 [從網路上抓來的設定]
- main.css 設定 `@import "./fonts/cherry-bomb-one.css";`
- tailwind  config 設定 fontFamily 並定義`class='font-xxx'`即完成設定[可從 debug 查看渲染字體是否正確]


## image

### 參考文章
- [[Day 14] Nuxt 3 最佳化圖片 動態調整請求控制圖片大小 - Nuxt Image](https://ithelp.ithome.com.tw/articles/10330879)
- [Day 21 – Nuxt 3 Images](https://ithelp.ithome.com.tw/articles/10334741)
- [Nuxt.js 3.x Assets vs Public 目錄－靜態資源管理](https://clairechang.tw/2023/09/12/nuxt3/nuxt-v3-assets-vs-public/)
- [官方 nuxt-img 說明](https://image.nuxt.com/usage/nuxt-img)

### assets 
大部分會放置在這裡面
- 使用 NuxtImg 會自動問你要不要安裝，安裝就是了！
```
 <NuxtImg src="～/assets/images/cook-logo.svg" width="300" />

 export default defineNuxtConfig({
  image: {
    dir: 'assets/images'
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image']
});
 <NuxtImg src="/cook-logo.svg" width="300" />


```
- [x] NuxtImg 使用情境與本地關係
img 換成 NuxtImg 後
svg 檔案可以正常顯示，png/jpg 不能
build 後 svg 放 assets 不能顯示 放 public 可以 同樣 issue https://github.com/nuxt/image/issues/1006

從這個設定看來
https://github.com/Pinegrow/pg-nuxtui/blob/main/nuxt.config.ts 他把 dir 拿掉


打開
IPX：使用資產目錄時找不到文件




加入音效後重新整理出現 Audio is not defined
 把該組件改為 client 就成功了
https://stackoverflow.com/questions/55530529/getting-error-while-using-new-audio-in-nuxt-created-hook

> 問題 如果是引用本地端圖片 並設為變數引入會有問題，因為一定要用 import，無法動態給定
所以圖片如果是變數，就建議用遠端網址就好，不要去使用本地
另外本地端似乎用了 NuxtImg 就會有顯示問題，用 img 就好
- [ ] 待研究 遠端網址是否就用 NuxtImg 去優化

## icon
使用 Nuxt icon 快速添加 icon 與設定大小 裡面有很多不同資源的 icon!
https://ithelp.ithome.com.tw/articles/10335953

Support 200,000 open-source vector icons via Iconify 點擊
```
      <Icon :name="icon" size="60" class="mr-2" style="color: #e76f3c" />
      <Icon :name="icon" size="60" class="mr-2 text-blue-800" />

- iconify 只要搜尋figma插件就可以用了
```