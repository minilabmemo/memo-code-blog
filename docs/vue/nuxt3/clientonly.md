---
outline: deep
title: '[Nuxt3] 為什麼不該用 ClientOnly 包裹整個頁面？'
---

# [Nuxt3] 為什麼不該用 ClientOnly 包裹整個頁面？

在修正 Hydration Mismatch 問題時，我們可能會想：「既然 SSR 和 CSR 資料不一致，那為什麼不直接用 `<ClientOnly>` 把整塊甚至是整個頁面都包起來就好了？反正最後畫面都是要在瀏覽器渲染的。」

雖然這樣做可以解決報錯，但會對 **SEO** 和 **使用者體驗** 造成嚴重打擊。以下是為什麼我們應該「精確」使用 `<ClientOnly>` 的三個理由。

## 1. SEO 搜尋引擎優化 (Search Engine Optimization)

搜尋引擎的爬蟲（如 Googlebot）在抓取網頁時，主要讀取的是伺服器回傳的 HTML。

### ❌ 全部包裹的情況
如果用 `<ClientOnly>` 包裹整個頁面，伺服器回傳的 HTML 基本上是空的，爬蟲什麼都看不到。

```html
<ClientOnly>
  <div>整個頁面內容...</div>
</ClientOnly>
```
> **爬蟲看到的結果**：空空如也。這對排名非常不利。

### ✅ 精確包裹的情況
只包裹真正需要客戶端數據的部分，讓爬蟲可以讀取頁面的標題、結構和大部分內容。

```html
<div>
  <h1>挑戰地圖</h1>  <!-- Google 可以看到 -->
  <div>課程列表...</div>  <!-- Google 可以看到 -->
  
  <ClientOnly>
    <div>你在 Stop 3</div>  <!-- 只有這個部分是客戶端渲染 -->
  </ClientOnly>
</div>
```
> **爬蟲看到的結果**：能抓取到「挑戰地圖」和「課程列表」等關鍵字，有助於 SEO。

## 2. 首屏渲染速度 (FCP - First Contentful Paint)

FCP 是指使用者從進入網頁到看到第一個內容的時間。

### 全部 ClientOnly 的情況
- 用戶訪問 → 看到空白頁 (等待 JS 下載) → 等待 JS 執行 → 看到內容
- **體驗**：❌ 可能會有 3-5 秒或是更久的白屏時間，用戶覺得網站很慢。

### 精確包裹的情況
- 用戶訪問 → **立即看到頁面骨架和內容** (SSR HTML) → 等待 hydration → 個人化數據載入 (如用戶名稱、位置)
- **體驗**：✅ 幾乎 0.5 秒內就能看到主要畫面，體感速度極快。

## 3. 實際效果對比以頁面結構為例

假設我們有一個「挑戰地圖」的頁面：

### ❌ 方案 A：全部包在 ClientOnly
```xml
<template>
  <ClientOnly>
    <div class="min-h-screen">
      <!-- 麵包屑導航 -->
      <AppBreadcrumb :items="[...]" />
      
      <!-- 標題 -->
      <h1>挑戰地圖</h1>
      
      <!-- 課程格子 -->
      <div v-for="cell in gridLayout">...</div>
      
      <!-- 統計區塊 -->
      <div>Process: 50%</div>
    </div>
  </ClientOnly>
</template>
```
**用戶看到的流程**：
1.  0-2秒：**完全空白** 😵
2.  2秒後：突然出現完整頁面

### ✅ 方案 B：精確包裹（推薦方案）

只對涉及「個人化狀態」或「瀏覽器專有 API (window/localStorage)」的部分使用 `<ClientOnly>`。

```xml
<template>
  <div class="min-h-screen">
    <!-- 麵包屑導航 - SSR 立即顯示 -->
    <AppBreadcrumb :items="[...]" />
    
    <!-- 標題 - SSR 立即顯示 -->
    <h1>挑戰地圖</h1>
    
    <!-- 課程格子 - SSR 立即顯示 -->
    <div v-for="cell in gridLayout">
      <img :src="getStopIcon()" />  <!-- SSR 渲染 -->
      
      <!-- 只有"人物位置"這種動態資訊需要等客戶端 -->
      <ClientOnly>
        <div v-if="shouldShowCharacter(index)">👦</div>
      </ClientOnly>
    </div>
    
    <!-- 統計區塊 - SSR 立即顯示 -->
    <div>Process: {{ progress }}%</div>
    
    <!-- 只有當前位置文字需要等客戶端 -->
    <ClientOnly>
      <div>{{ getLocationDisplayText(currentLocation) }}</div>
      
      <!-- SSR 顯示預設值，避免版面跳動 -->
      <template #fallback>
        <div>起點</div>  
      </template>
    </ClientOnly>
  </div>
</template>
```

**用戶看到的流程**：
1.  **0.5秒**：立刻看到完整的地圖、標題、格子結構。 😊
2.  **1-2秒**：人物圖示跳出在正確的位置，文字更新為最新狀態。

## 總結
SSR (伺服器端渲染) 的核心價值就在於 **「先給 HTML」**。如果在最外層套上 `<ClientOnly>`，就等於放棄了 SSR 帶來的所有優勢（SEO 與 效能），讓你的 Nuxt 應用退化成一個普通的 SPA (單頁應用)。

因此，**請只在「必要」的最小範圍內使用 `<ClientOnly>`**。