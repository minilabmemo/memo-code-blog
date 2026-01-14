# SSR Hydration Mismatch 

## 目錄
1. [核心概念](#核心概念)
2. [問題分析](#問題分析)
3. [常見場景](#常見場景)
4. [解決方案](#解決方案)
5. [實戰範例](#實戰範例)
6. [最佳實踐](#最佳實踐)

---

## 核心概念

### 什麼是 Hydration?

在 SSR (Server-Side Rendering) 或 SSG (Static Site Generation) 框架中(如 Nuxt、Next.js),頁面載入流程如下:

1. **伺服器端**:先渲染出完整的 HTML
2. **瀏覽器端**:載入 JavaScript 並「接管」HTML,使其變成可互動的應用

這個**接管過程**就是 **Hydration (激活)**。

### 什麼是 Hydration Mismatch?

當**伺服器輸出的 HTML 結構 ≠ 瀏覽器端重新渲染的結構**時,就會發生 Hydration Mismatch。

框架會發出警告:
```
Hydration failed because the initial UI does not match what was rendered on the server.
```

---

## 問題分析

### Pinia 持久化 + SSR 的固有衝突

使用 `pinia-plugin-persistedstate` 時會遇到的問題:

- **SSR 階段**: 無法訪問 `localStorage`,使用預設值
- **客戶端 Hydration**: 從 `localStorage` 恢復狀態
- **結果**: DOM 結構不一致 → Hydration mismatch

### 影響層面

這不是可以忽略的小問題,而是關乎:

1. **應用程式架構**: Pinia 持久化 + SSR 的固有衝突
2. **用戶體驗**: 避免頁面閃爍和重新渲染
3. **SEO**: 確保搜尋引擎看到正確的內容
4. **性能**: 減少不必要的重新渲染

---

## 常見場景

### 1. 時間戳或隨機值

**❌ 錯誤範例**:
```vue
<template>
  <p>{{ Date.now() }}</p>
</template>
```

**問題**: 伺服器生成時間與瀏覽器生成時間不同

**✅ 修正方式**:
```vue
<template>
  <p v-if="timestamp">{{ timestamp }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const timestamp = ref('')

onMounted(() => {
  timestamp.value = Date.now()
})
</script>
```

### 2. LocalStorage 依賴

**❌ 錯誤範例**:
```vue
<template>
  <p>{{ username }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const username = ref('Guest') // SSR 預設值

onMounted(() => {
  username.value = localStorage.getItem('username') || 'Guest'
})
</script>
```

**問題**: SSR 輸出 `Guest`,但客戶端立即替換成實際用戶名,造成閃爍

**執行流程**:
1. **SSR 階段**: 無法訪問 `localStorage`,輸出 `<p>Guest</p>`
2. **Client Hydration**: 讀取 localStorage,變成 `<p>Aki</p>`
3. **結果**: Hydration text mismatch + 畫面閃爍

### 3. 條件渲染與客戶端狀態差異

**❌ 錯誤範例**:
```vue
<template>
  <div v-if="isMobile">Mobile View</div>
  <div v-else>Desktop View</div>
</template>
```

**問題**: SSR 無法知道瀏覽器寬度,伺服器可能渲染 desktop,客戶端判定為 mobile

### 4. 在 mounted 之前改變 DOM

避免在 `setup()` 或 `onBeforeMount` 裡使用 `document.querySelector()` 或手動修改 innerHTML

---

## 解決方案

### 方案一覽表

| 狀況 | 結果 | 解法 |
| --- | --- | --- |
| SSR 設預設值,client 立即改值 | 文字或結構不一致 | `<client-only>` 或延後更新 |
| client 使用 localStorage/window | SSR 無法取得 | 加上 `process.client` 判斷 |
| 初始 UI 依賴非同步資料 | 預設內容與最終內容不同 | 用 `useAsyncData()` 讓 SSR 等資料 |

### 1. 使用 `<client-only>`

完全不讓該區塊進行 SSR,直接等 client 掛載:

```vue
<client-only>
  <p>{{ username }}</p>
</client-only>
```

### 2. 使用 `v-if="process.client"`

只在客戶端顯示:

```vue
<p v-if="process.client">{{ username }}</p>
```

### 3. 統一資料來源

使用 Nuxt 的 `useAsyncData`:

```vue
<script setup>
const { data: userData } = await useAsyncData('user', () => {
  return fetchUserData()
})
</script>
```

### 4. 延後更新

在 `onMounted()` 後才動態生成內容:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const timestamp = ref('')

onMounted(() => {
  timestamp.value = Date.now()
})
</script>
```

---

## 實戰範例

### 使用 `<client-only>` + `#fallback`

這是 **Nuxt 預防 Hydration 問題的黃金搭配**:

```vue
<template>
  <div>
    <h1>使用者名稱</h1>

    <client-only>
      <!-- 客戶端實際內容 -->
      <p>{{ username }}</p>

      <!-- SSR 階段顯示的預設內容 -->
      <template #fallback>
        <p>Guest</p>
      </template>
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const username = ref('Guest')

onMounted(() => {
  username.value = localStorage.getItem('username') || 'Guest'
})
</script>
```

### 運作流程

1. **SSR 階段**:
   - `<client-only>` 忽略內部的 `<p>{{ username }}</p>`
   - 只渲染 `#fallback` 內容: `<p>Guest</p>`

2. **Client Hydration 階段**:
   - 客戶端執行 Vue 邏輯
   - `username` 從 localStorage 取得真實值
   - `<client-only>` 用真正內容取代 fallback

3. **結果**:
   - ✅ SSR 有預設內容 (不會空白閃爍)
   - ✅ Client 掛載後替換 (不會報 Hydration mismatch)
   - ✅ 使用體驗流暢穩定

### 完整錯誤重現範例

**檔案**: `pages/index.vue`

```vue
<template>
  <div>
    <h1>現在時間:</h1>
    <p>{{ Date.now() }}</p>
  </div>
</template>

<script setup>
// 直接在 template 執行 Date.now()
// SSR 每次 render 都會有不同數值
</script>
```

**執行結果**:

1. 伺服器輸出: `<p>1735083536123</p>`
2. 客戶端渲染: `<p>1735083536890</p>`
3. Vue 報錯:
   ```
   [Vue warn]: Hydration text mismatch
   (server: "1735083536123", client: "1735083536890")
   ```
4. 畫面表現: 仍會顯示,但 console 有警告。若 mismatch 嚴重,Vue 會放棄 hydration 並重新渲染

### 修正版本

```vue
<template>
  <div>
    <h1>現在時間:</h1>
    <p v-if="timestamp">{{ timestamp }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const timestamp = ref('')

// 只在 client 端執行,避免 SSR 階段出現不一致
onMounted(() => {
  timestamp.value = Date.now()
})
</script>
```

**執行結果**:
- SSR 階段: `<p>` 是空的
- Hydration 階段: client 掛載後才插入時間
- 伺服器輸出與 client 初始 DOM 完全相同 → ✅ 無警告

---

## 最佳實踐

### 如何發現問題

在瀏覽器開發工具中:

1. **Console** 會顯示警告:
   ```
   Hydration completed but contains mismatches.
   ```

2. **進一步比對**:
   - 打開「Elements」面板
   - 查看伺服器回傳的 HTML (View Source)
   - 與實際渲染結果比較
   - 找出差異點

### 預防策略

1. **保持資料一致**: 確保 SSR 與 CSR 使用相同資料來源
2. **延後 client-only 行為**: 使用 `onMounted()` 或 `<client-only>`
3. **避免 SSR 階段執行**: 不在 SSR 階段使用隨機值、時間戳
4. **不操作 DOM**: 在 Hydration 前不手動修改 DOM

### `<client-only>` 使用時機

| 狀況 | 建議 |
| --- | --- |
| 內容依賴瀏覽器 API | 用 `<client-only>` |
| 想避免 SSR 空白畫面 | 加上 `#fallback` |
| 想在 SSR 預先渲染安全內容 | 放在 `#fallback` |

### 為什麼框架不自動修正?

Hydration 的設計目標是**性能**:

- 希望「重用」伺服器輸出的 DOM
- 而非整頁重新渲染
- 如果差異太大,只能報錯並強制覆蓋
- 這會破壞 SSR 的初衷

---

## 總結

### 核心要點

- **Hydration mismatch** = SSR 輸出 ≠ CSR 初始渲染
- 關鍵解法:
  - 保持資料一致
  - 延後 client-only 行為
  - 避免 SSR 階段的動態計算

### 應正常運作的功能

修復後,以下功能應都能正常運作:

- ✅ HMR 熱更新
- ✅ 用戶登入/登出/主題切換等需要 store 資料的介面
- ✅ 頁面導航

遵循這些最佳實踐,您的應用就能完全符合 Vue 3 + Nuxt 3 SSR 標準!
