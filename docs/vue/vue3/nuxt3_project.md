---
outline: deep
---

# Nuxt 3

## 專案建立

- `npx nuxi init your-nuxt-app-name`

```
npx nuxi init nuxt-app

$ npx nuxi init xx

✔ Which package manager would you like to use?
npm
◐ Installing dependencies...                                                                                                                             上午10:00:36

> postinstall
> nuxt prepare

✔ Types generated in .nuxt                                                                                                                              上午10:02:20

added 848 packages, and audited 850 packages in 2m

166 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
✔ Installation completed.                                                                                                                               上午10:02:20

❯ Initialize git repository?
● Yes / ○ No
ℹ Initializing git repository...                                                                                                                        上午10:02:58

Initialized empty Git repository in /Users/xxx/dev/front/vue/xxx/.git/
                                                                                                                                                         上午10:02:58
✨ Nuxt project has been created with the v3 template. Next steps:
 › cd xxx                                                                                                                                         上午10:02:58
 › Start development server with npm run dev
```

- 預設會使用 v3 template 建立，這邊似乎是 starter 其他選項但不多 [nuxt/starter](https://github.com/nuxt/starter)
- 已經建好 UI 的範本 [nuxt|templates](https://nuxt.com/templates)

  - 有 docs/Landing/dashboard/電商 WooNuxt/blog 等範本，有一些免費一些付費。

- 啟動專案

```
nuxt dev
Nuxt 3.11.2 with Nitro 2.9.6
```

## 打包

```
> nuxt build

Nuxt 3.11.2 with Nitro 2.9.6n下午12:48:50
ℹ Using default Tailwind CSS file nuxt:tailwindcss 下午12:48:51
ℹ Building client... 下午12:48:53
ℹ vite v5.2.8 building for production... 下午12:48:53
ℹ ✓ 181 modules transformed.
ℹ ✓ built in 3.29s 下午12:48:57
✔ Client built in 3312ms 下午12:48:57
ℹ Building server... 下午12:48:57
ℹ vite v5.2.8 building SSR bundle for production... 下午12:48:57
ℹ ✓ 121 modules transformed.
ℹ ✓ built in 2.42s 下午12:48:59
✔ Server built in 2430ms 下午12:48:59
✔ Generated public .output/public nitro 下午12:48:59
ℹ Building Nuxt Nitro server (preset: node-server) nitro 下午12:48:59
✔ Nuxt Nitro server built
Σ Total size: 3.63 MB (1.07 MB gzip)
✔ You can preview this build using node .output/server/index.mjs

> nuxt preview

 下午12:51:37
 ╭────────────────────────────────────────Preview Mode──────────────────────────────────────────╮
 │ │
 │  You are running Nuxt production build in preview mode. │
 │  For production deployments, please directly use node ./server/index.mjs command. │
 │ │
 │  Node.js:           v18.16.1 │
 │  Nitro Preset:      node-server │
 │  Working directory: .output │
 │ │
 ╰──────────────────────────────────────────────────────────────────────────────────────────────╯

ℹ Loading .env. This will not be loaded when running the server in production.                                                                                        下午12:51:37
ℹ Starting preview command: node ./server/index.mjs 下午12:51:37
 下午12:51:37
Listening on http://[::]:3000
New request: http://localhost:3000/blog/
New request: http://localhost:3000/blog/
```

## 專案設定

### TypeScript + ESLint + Prettier 環境建置


### TypeScript
 安裝流程參考：[nuxt|TypeScript](https://nuxt.com/docs/guide/concepts/typescript)
- 安裝兩個 vue-tsc 與 typescript `npm install --save-dev vue-tsc@^1 typescript`
- 執行命令來檢查您的類型：npx nuxi typecheck (但我試是沒有用？？但下面有用)
-  設置 nuxt.config.ts  開發時檢查
```
export default defineNuxtConfig({
  typescript: {
    typeCheck: true
  }
})
```
- 重開後打 `const num:number:"22"` 就發現 `IDE 出現紅底加問題`了。


###  ESLint
- 安裝 npm install -D eslint @nuxtjs/eslint-config-typescript
- 設置 .eslintrc.cjs
```
module.exports = {
  env: {
    browser: true,
    es2023: true
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  rules: {
    'no-undef': 'off'
  }
}

```
- 重開後新增一個沒被使用過的變數，會發現會出現`'xx' is assigned a value but never used.(@typescript-eslint/no-unused-vars)`，點選快速修復可以查看建議

- eslint 檢查的幾種方法
  1. npx eslint -- app.vue
  1. 設置 package.json "lint": "eslint --ext .ts,.js,.vue ."
  1. ESLint 插件安裝
- 設定裡面有一個 Eslint › Code Actions On Save: Mode：All，可以自動修復程式碼
- 這邊安裝完可能會有一些格式的修復建議，例如每一行結尾如果多出分號;會提醒移除，下一個 Prettier 你可以設定規則。


### Prettier
- 安裝 `npm install -D prettier eslint-config-prettier eslint-plugin-prettier
- 建立 .prettierrc.cjs 檔案
```
module.exports = {
  printWidth: 150,          
  semi: true,             
  tabWidth: 2,
  singleQuote: true,        // 字串使用單引號，而不是雙引號
  trailingComma: 'none'     // 如 Object、Array 內的元素不需要尾隨逗號
}
```
- 修正.eslintrc.cjs 設定檔，讓 Prettier 與 ESLint 有更好的搭配
```
module.exports = {
  env: {
    browser: true,
    es2023: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'no-undef': 'off',
    'prettier/prettier': 'error'
  }
}
```


- 安裝 Prettier - Code formatter 插件




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



## 參考文件
- [Nuxt3 學習筆記|[Day 04] Nuxt 3 + TypeScript + ESLint + Prettier 環境建置](https://ithelp.ithome.com.tw/articles/10293758)