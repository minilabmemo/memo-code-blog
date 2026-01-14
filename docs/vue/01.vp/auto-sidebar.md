---
outline: deep
draft: false
---
# 自動生成側邊欄 (vitepress-sidebar)

在 VitePress 預設設定中，每次新增文章都需要手動更新 `config.mts` 的 `sidebar` 設定，這在文章數量變多後非常難以維護。我們可以透過 `vitepress-sidebar` 套件來自動根據檔案結構生成側邊欄。

## 安裝套件

首先安裝 `vitepress-sidebar`：

```bash
npm install -D vitepress-sidebar
```

## 設定方式

修改 `.vitepress/config.mts`，引入 `generateSidebar` 並取代原本手動撰寫的 `sidebar` 物件。

```typescript
import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar"; // [!code ++]

export default defineConfig({
  // ... 其他設定
  themeConfig: {
    // ... 其他設定
    
    // 使用 generateSidebar 自動生成
    sidebar: generateSidebar([
      {
        documentRootPath: "docs",
        scanStartPath: "f2e",
        resolvePath: "/",
        useTitleFromFileHeading: true,
        collapsed: false,
        excludeFiles: ["index.md"],
      },
      {
        documentRootPath: "docs",
        scanStartPath: "vue",
        resolvePath: "/vue/",
        useTitleFromFileHeading: true,
        collapsed: false,
        excludeFiles: ["index.md"],
      },
      {
        documentRootPath: "docs",
        scanStartPath: "tech",
        resolvePath: "/tech/",
        useTitleFromFileHeading: true,
        collapsed: false,
        excludeFiles: ["index.md"],
      },
    ]),
  },
});
```

## 設定參數說明

- **documentRootPath**: 文件根目錄，通常是 `docs` 或專案根目錄。
- **scanStartPath**: 要掃描的資料夾路徑（相對於 `documentRootPath`）。
- **resolvePath**: 生成網址時的前綴路徑，確保連結正確。
- **useTitleFromFileHeading**:設為 `true` 會讀取 Markdown 檔案中的第一個 H1 標題作為側邊欄顯示名稱（而不是用檔名）。
- **collapsed**: 資料夾預設是否展開。
- **excludeFiles**: 排除不需要顯示在列表的檔案（如 `index.md`）。

## 排除草稿文章

如果您有一些尚未完成的文章不希望出現在側邊欄，我們可以在設定中加入 `excludeFilesByFrontmatterFieldName`。

### 1. 修改設定

```typescript
sidebar: generateSidebar([
  {
    // ...
    excludeFilesByFrontmatterFieldName: "draft",
  },
])
```

### 2. 在文章中使用

在該 Markdown 檔案的開頭 YAML Frontmatter 加入 `draft: true` 即可：

```yaml
---
draft: true
---

# 這是一篇草稿
```

## 自訂排序

### 1. 文章排序 (Files)

如果希望自訂側邊欄的**文章**顯示順序，可以使用 `order` 欄位（需先啟用 `sortMenusByFrontmatterOrder` 設定）。

**修改設定：**

```typescript
sidebar: generateSidebar([
  {
    // ...
    sortMenusByFrontmatterOrder: true,
  },
])
```

**在文章中使用：**

```yaml
---
order: 1
---

# 這是排序第一的文章
```

### 2. 資料夾排序 (Folders)

由於資料夾沒有 Frontmatter，我們通常會透過**加上數字前綴**來排序。為了讓介面上的名稱乾淨，我們需要開啟 `removePrefixAfterOrdering` 設定。

**修改設定：**

```typescript
sidebar: generateSidebar([
  {
    // ...
    removePrefixAfterOrdering: true,
  },
])
```

**資料夾命名範例：**

將資料夾重新命名，加上 `0.` 或 `01.` 等前綴：

*   `docs/vue/0.vitepress/` -> 側邊欄顯示為 **"vitepress"**，並排在第一位。
*   `docs/vue/1.vue3/` -> 側邊欄顯示為 **"vue3"**，並排在第二位。

## 常見問題：新增文章後側邊欄沒更新？

由於 `vitepress-sidebar` 是在 **設定檔讀取時** 執行掃描，因此當您新增或刪除檔案時，VitePress 的開發伺服器可能不會立即重新生成側邊欄。

若發生此情況，您有兩種方式可以觸發更新：

1.  **重啟伺服器**：在終端機按 `Ctrl + C` 停止，再重新執行 `npm run docs:dev`。
2.  **觸發設定檔重載**（推薦）：打開 `docs/.vitepress/config.mts`，隨意加一個空白或是存檔，VitePress 偵測到設定檔變更後就會自動重新掃描檔案結構。
