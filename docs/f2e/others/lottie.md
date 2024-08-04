# Lottie

> 製作動畫的渲染庫，duo lingo 似乎也是用這個做的。

## 介紹參考

- [什么是 Lottie](https://zhuxinyu-znb.github.io/blog/2020-06-08-lottie.html)
  - Lottie 是 Airbnb 开源的一个动画渲染库，导出的 json 文件，并在 Android/iOS、React Native 和 web 端实现相同的动画效果。
- [犬哥網站｜ Lottie 是什麼？](https://frankknow.com/whats-lottie/)
  > - 一款由 Airbnb 推出的函式庫，是一種 JSON 檔案格式的動畫，可讓你在任何平台上播放，與 GIF 動畫格式相比，Lottie 動畫檔案要小得多。
  > - 官網上，你可以找到許多高質感的動畫，Lottie 也正積極開發線上製作動畫的功能。
  > - 除了 Lottie JSON 檔，下方還有 dotLottie、GIF、MP4、WebM 等檔案類型可以下載，大家可以視需求自行選擇，但還是最推薦下載 Lottie 檔（檔案較小）。
  > - Lottie 動畫嵌入 WordPress 網站，可使用許多人愛用的 Elementor 編輯器。

## 製作

- [Lottie：讓 AE 動畫完美呈現於數位產品上](https://www.hexschool.com/2021/01/18/2021-01-18-lottie-ae-plugin/)
大部分都是去用 AE 製作。



### figma 製作

搜尋插件 Lottie，找到喜愛的動畫按下 import as gif 就可以看到動畫效果，另外也有 svg(靜態)，導入後文件名稱就是網址，可以連到該網址上去下載 Lottie JSON 檔。

- 自製動畫 Export to Lottie
  - 利用兩個 frame 然後微移位置，選取後產生中間就會補足動畫了！！！！！
  - 也可以用 flow 去做，但有時候某些會失敗，要多試試。


## 應用

- [youtube|犬哥教學]
  - 講了 WordPress 的嵌入方式，啟動方式可以選 hover 才觸發，最後有滾動的方式？不太明瞭是否可以隨滑鼠滾的設定
  > 我们经常会碰到复杂的动画，运用纯 css3 制作动画效果不理想，因为图片太多，canvas 动画比较复杂，而且会失真，所以想起运用 json 文件进行动画

- [vue 或者 nuxt 项目中使用 lottie 动画](https://blog.csdn.net/weixin_46328739/article/details/134072901)
  - vue-lottie 這似乎是依賴 vue2
- [vue 中引入 json 动画](https://juejin.cn/post/7142706695611875358)
  - lottie-web 看不太懂
- [vue3-lottie](https://github.com/megasanjay/vue3-lottie) lottie 官網連到的網站
  - 範例很清楚還有 Nuxt 3 引入方式，及[demo](https://vue3-lottie.vercel.app/)

  - 安裝 npm install vue3-lottie@latest --save

### Nuxt 3

- 新增 Vue3Lottie.client.ts 
不知道為什麼官網提供的 component 不能用，問 GPT 改用 use 的 0.0
```
import { defineNuxtPlugin } from '#app';
import Vue3Lottie from 'vue3-lottie';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Lottie);
});


```

- 引用方法 成功！！！
仍須注意環境引用資源是否正常。
```
import json from '@/assets/celebration.json';
 <Vue3Lottie animation-link="https://assets2.lottiefiles.com/packages/lf20_GbabwrUY2k.json" :height="200" :width="200" />
 <Vue3Lottie :animation-data="json" :height="200" />


```