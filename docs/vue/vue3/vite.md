# vite 專案

## start

根據以下指令建立：

```sh
$ npm create vite@latest
Need to install the following packages:
create-vite@5.2.1
Ok to proceed? (y) y
✔ Project name: … f2e-boot-vite
✔ Select a framework: › Vue
✔ Select a variant: › Customize with create-vue ↗
Need to install the following packages:
create-vue@3.9.2
Ok to proceed? (y) y

Vue.js - The Progressive JavaScript Framework

✔ 是否使用 TypeScript 語法？ … 否 / 是
✔ 是否啟用 JSX 支援？ … 否 / 是
✔ 是否引入 Vue Router 進行單頁應用開發？ … 否 / 是
✔ 是否引入 Pinia 用於狀態管理？ … 否 / 是
✔ 是否引入 Vitest 用於單元測試 … 否 / 是
✔ 是否要引入一款端對端（End to End）測試工具？ › Cypress
✔ 是否引入 ESLint 用於程式碼品質檢測？ … 否 / 是
✔ 是否引入 Prettier 用於程式碼格式化？ … 否 / 是

正在建置專案 /dev/front/vue/f2e-boot-vite...
```

專案建置完成，可執行以下命令：

```sh
cd f2e-boot-vite
npm install
npm run format
npm run dev
```

## 圖片引入

```js
<img class="icon-image " src="@/assets/images/img_go.png" alt="icon">


//設定黨 可以分開寫，但本地似乎要先引入，不可以直接寫 img: '@/assets/images/work-meow.png',
import imgMeow from '@/assets/images/work-meow.png'
export interface Iwork {
  date: string
  img: string
}
export const works: Iwork[] = [
  {
    img: imgEc,
  }
]
 <img :src="item.img" alt="work" class="flex-image ">
```
