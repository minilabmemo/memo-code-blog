---
outline: deep
---

# Nuxt 3

## 專案建立

- 啟動專案

```
nuxt dev
Nuxt 3.11.2 with Nitro 2.9.6
```

## 專案設定

### TypeScript + ESLint + Prettier 環境建置

- [ ] 等待紀錄

#### Prettier & vue 的格式化衝突

這天一直跑出 vue/first-attribute-linebreak warn[屬性有換行就要對齊], 但是我手動換行屬性後，儲存後格式化又被換成同一行，原本以為是 Prettier 問題，結果是預設格式化“vue”造成的，把預設格式化改成 Prettier
就成功了，以後都會幫你自動修正。

- 右鍵->選擇格式化方式->這時會看到預設值是 vue(!?),然後選最後的“設定預設格式器”->改 Prettier
  - 不確定會不會遇到什麼問題 暫時觀察看看

```
   <button type="button" / // [!code error]
        class="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
        @click="ｘｘ"
      >

//遇到問題 自動保存格式化會變成上面
  <button
        type="button" / // [!code ++]
        class="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
        @click="ｘｘ"
      >
```

### 安裝 tailwind CSS

使用 Nuxt Community 釋出的 Tailwind CSS 模組導入。

- `npm install -D @nuxtjs/tailwindcss`
- 設定 nuxt.config.ts，設定完重啟服務，就會看到樣式生效了。

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"], // [!code ++]
});
```

- 設定黨預設會有，module will automatically generate a basic configuration for them

  - You can create the `tailwind.config.js` file by running the following command:

  ```
  npx tailwindcss init

  就會產生 ./tailwind.config.js 你可以自訂擴增設定
  ```

  - ~/assets/css/tailwind.css 可以自訂覆蓋，但我好像都沒有設定過，先不建立。
  - 更多說明 [nuxtjs | tailwindcss](https://tailwindcss.nuxtjs.org/getting-started/installation)

- 起動成功後會出現，甚至還有 UI 可以看
```
ℹ Using default Tailwind CSS    nuxt:tailwindcss 上午9:58:32

ℹ Tailwind Viewer: http://localhost:3000/_tailwind/ nuxt:tailwindcss 上午9:58:33
```


## vscode plugin

- ESlint for auto lint
- Prettier

## debug

試圖在 vscode 設定 [nuxt:debugging](https://nuxt.com/docs/guide/going-further/debugging)

```
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "client: chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "server: nuxt",
      "outputCapture": "std",
      "program": "${workspaceFolder}/node_modules/nuxi/bin/nuxi.mjs",
      "args": [
        "dev"
      ],
    }
  ],
  "compounds": [
    {
      "name": "fullstack: nuxt",
      "configurations": [
        "server: nuxt",
        "client: chrome"
      ]
    }
  ]
}

```

- 接著打開 fullstack: nux 就會進入到 debug 模式，中斷點記得要存擋才能設定。
- 控制台出現 ✨ Nuxt DevTools Press Shift + Option + D to open DevTools
  - 跟著按就會開啟 Nuxt DevTools，裏面可以看到 router 設定，server api,app config 等等設定
