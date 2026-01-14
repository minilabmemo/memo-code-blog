---
outline: deep
---

# nuxt3 deploy

## 參考資料
- [[Day 30] Nuxt 3 就剩最後一步了 - 部署 (Deployment)](https://ithelp.ithome.com.tw/articles/10308825)
- [Nuxt 3 實戰筆記系列|[Day28] Nuxt 3 建構打包與部署至 Cloudflare Workers](https://ithelp.ithome.com.tw/articles/10339224)


## 部署

部署目前是先部署到 cloudflare 上。

## 註冊 cloudflare

先去 cloudflare 網站上註冊並驗證信箱，之後步驟會需要用到。

## 安裝工具

- 使用 `npm install -g wrangler` 安裝 wrangler
- 登入 `wrangler login` 會開啟網頁需授權登入
- 新增 wrangler.tomlwrangler.toml 記得建立設定檔案要在根目錄下且不要多打空白，否則下指令時會抓不到入口 main 等正確設定。
  - 這邊的 name 會與部署後網址前綴一致
```
name = "你的專案名稱"
main = "./.output/server/index.mjs"
workers_dev = true
compatibility_date = "2024-05-24"

[site]
bucket = ".output/public"
```

- 專案打包，設定環境變數 NITRO_PRESET 或設定設定 nitro.preset 選項，會在專案下產生 .output 目錄
```
npm run build:cloudflare 


> build:cloudflare
> NITRO_PRESET=cloudflare npm run build
ℹ ✓ built in 907ms                                                                                                                  上午9:32:51
✔ Server built in 922ms                                                                                                             上午9:32:51
✔ Generated public .output/public                                                                                             nitro 上午9:32:51
ℹ Building Nuxt Nitro server (preset: cloudflare)                                                                             nitro 上午9:32:51  // [!code ++]
✔ Nuxt Nitro server built                                                                                                     nitro 上午9:33:00
  └─ .output/server/index.mjs (377 kB) (102 kB gzip)
Σ Total size: 377 kB (102 kB gzip)
✔ You can preview this build using npx wrangler dev .output/server/index.mjs --site .output/public                            nitro 上午9:33:00  // [!code ++]
✔ You can deploy this build using npx wrangler deploy       // [!code ++]
```

- 本地測試 `npx wrangler dev .output/server/index.mjs --site .output/public `
```
$ npx wrangler dev .output/server/index.mjs --site .output/public
 ⛅️ wrangler 3.57.1
-------------------
[wrangler:inf] Ready on http://localhost:54296
⎔ Starting local server...
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ [b] open a browser, [d] open Devtools, [l] turn off local mode, [c] clear console, [x] to exit                                                 │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────

```

- `.wrangler` 資料夾會產生一堆內容 `.gitignore` 記得加入
- 上傳 `npx wrangler deploy`
第一次會問你要不要設置 subdomain，之後可以在網頁上修改，網頁會檢查是否為可用命名。
```
 npm run deploy:wrangler 
> deploy:wrangler
> npx wrangler deploy

 ⛅️ wrangler 3.57.1
-------------------
Fetching list of already uploaded assets...
Building list of assets to upload...
Uploading 6 new assets...
Skipped uploading 3 existing assets.
Uploaded 100% [6 out of 6]
Removing 6 stale assets...
↗️  Done syncing assets
Total Upload: 380.25 KiB / gzip: 97.01 KiB
Uploaded memo-house (4.59 sec)
Published memo-house (0.51 sec)
  https://memo-house.<subdomain>.workers.dev     // [!code ++] 就可以連結到這個網址了 但有時大約要等個十分鐘
Current Deployment ID: xxxxx
Current Version ID: xxxx


Note: Deployment ID has been renamed to Version ID. Deployment ID is present to maintain compatibility with the previous behavior of this command. This output will change in a future version of Wrangler. To learn more visit: https://developers.cloudflare.com/workers/configuration/versions-and-deployments
```

### 完整 package.json 配置
```
  "scripts": {
    "build": "nuxt build",
    "build:cloudflare": "NITRO_PRESET=cloudflare npm run build",// [!code ++]
    "dev": "nuxt dev",
    "dev:wrangler": "npx wrangler dev .output/server/index.mjs --site .output/public", // [!code ++]
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "deploy:wrangler": "npx wrangler deploy" // [!code ++]

  },

```



## 問題紀錄 
- [ ] 未解決
>注意：請確實執行動作 build:cloudflare 然後 wrangler dev 的順序喔。

### build:cloudflare 失敗
```
 Building Nuxt Nitro server (preset: cloudflare)nitro 上午10:23:39

[nitro 上午10:23:40]  ERROR  Error: Cannot resolve "jsonwebtoken" from "/Users/xx/dev/front/vue/f2e-nuxt-app/server/api/auth/google.post.js" and externals are not allowed!


undefined


[上午10:23:40]  ERROR  Cannot resolve "jsonwebtoken" from "/Users/xx/dev/front/vue/f2e-nuxt-app/server/api/auth/google.post.js" and externals are not allowed!

```


### wrangler dev 本地測試失敗

>一般簡單的專案沒有特殊登入功能可以很輕易部署成功


```
$ npx wrangler dev .output/server/index.mjs --site .output/public --local
 ⛅️ wrangler 3.57.1
-------------------
▲ [WARNING] --local is no longer required and will be removed in a future version.

  `wrangler dev` now uses the local Cloudflare Workers runtime by default. 🎉


▲ [WARNING] Using direct eval with a bundler is not recommended and may cause problems [direct-eval]

    .output/server/index.mjs:1:573244:
      1 │ ...,searchedLocations=[],dirname=eval("__dirname"),searchLocations=...
        ╵                                  ~~~~

  You can read more about direct eval and bundling here: https://esbuild.github.io/link/direct-eval


⎔ Starting local server...
[wrangler:inf] Ready on http://localhost:8787
✘ [ERROR] service core:user:nuxt-app: Uncaught TypeError: Object prototype may only be an Object or null: undefined

    at null.<anonymous> (core:user:nuxt-app:9000:48) in inherits
    at null.<anonymous> (core:user:nuxt-app:9268:12)
    at null.<anonymous> (core:user:nuxt-app:22822:4)
    at null.<anonymous> (core:user:nuxt-app:22823:3)


✘ [ERROR] MiniflareCoreError [ERR_RUNTIME_FAILURE]: The Workers runtime failed to start. There is likely additional logging output above.


```


> 未解 
1. debug 都沒用 一片空白 跟 preview 啟動一樣 console 也沒有錯誤
2. 原本以為是 token 或 typescript 庫 但不是 
3. 早期的修改可以過，大約是在加入插件之後
4. type-check 正常 