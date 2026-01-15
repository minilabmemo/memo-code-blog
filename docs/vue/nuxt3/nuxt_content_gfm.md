# Nuxt Content 內建 GFM 支援

Nuxt Content 使用的 Markdown 解析引擎（MDC）預設就遵循 **GFM (GitHub Flavored Markdown)** 標準。這意味著你可以在 Nuxt Content 中直接使用許多熟悉的 GitHub Markdown 語法，其中最常用的功能之一就是表格（Table）的欄位對齊。

## 表格對齊語法

在 GFM 標準中，表格內容的對齊方式是由標題列與內容列之間的分隔線中，**冒號（`:`）的位置**來決定的。

| 語法符號 | 對齊方式 | 說明 |
| :--- | :--- | :--- |
| `:---` | **左對齊** (預設) | 冒號在左邊（或無冒號） |
| `:---:` | **置中對齊** | 冒號在左右兩邊 |
| `---:` | **右對齊** | 冒號在右邊 |

### 範例程式碼

```markdown
| 左對齊欄位 | 置中欄位 | 右對齊欄位 |
| :--- | :---: | ---: |
| 文字靠左 | 文字居中 | 文字靠右 |
| 100 | 200 | 300 |
```

### 實際渲染效果

| 左對齊欄位 | 置中欄位 | 右對齊欄位 |
| :--- | :---: | ---: |
| 文字靠左 | 文字居中 | 文字靠右 |
| 100 | 200 | 300 |

## 其他常見 GFM 語法

除了表格之外，GFM 還支援了許多標準 Markdown 沒有的實用功能：

### 1. 刪除線 (Strikethrough)

使用兩個波浪號 `~~` 包裹文字即可顯示刪除線。

**語法：**
```markdown
這是一段 ~~被刪除的文字~~。
```

**效果：**
這是一段 ~~被刪除的文字~~。

### 2. 任務列表 (Task Lists)

使用 `- [ ]` 或 `- [x]` 來建立帶有核取方塊的清單。這在製作待辦事項或進度追蹤時非常有用。

**語法：**
```markdown
- [x] 已完成的任務
- [ ] 待處理的任務
- [ ] 另一個任務
```

**效果：**
（註：以下為模擬顯示效果，實際渲染取決於您的 Markdown 引擎設定）

- <input type="checkbox" checked onclick="return false;"> 已完成的任務
- <input type="checkbox" onclick="return false;"> 待處理的任務
- <input type="checkbox" onclick="return false;"> 另一個任務
- [ ] 可能沒有渲染

### 3. 自動連結 (Autolinks)

GFM 會自動偵測標準的 URL 網址並轉換為連結，不需要使用標準的 `[連結文字](url)` 語法。

**語法：**
```markdown
請訪問 https://nuxtjs.org 獲取更多資訊。
```

**效果：**
請訪問 https://nuxtjs.org 獲取更多資訊。

### 4. 程式碼區塊 (Fenced Code Blocks)

GFM 擴展了標準的程式碼區塊，允許你指定程式語言來實現語法高亮。Nuxt Content 會使用 Shiki 來進行高亮渲染。

**語法：**
````markdown
```js
console.log('Hello Nuxt Content');
```
````

**效果：**
```js
console.log('Hello Nuxt Content');
```

### 5. 註腳 (Footnotes)

註腳功能允許你在文中添加參考標記，並在文末顯示詳細說明。這在撰寫技術文章或學術內容時非常實用。
*(註：這通常是由 `remark-gfm` 插件提供的支援)*

**語法：**
```markdown
這是一個需要說明的專有名詞[^1]。

[^1]: 這裡是該名詞的詳細解釋/出處。
```

**效果：**
這是一個需要說明的專有名詞[^1]。

[^1]: 這裡是該名詞的詳細解釋/出處。

## 進階：超越 GFM 的 MDC

 although GFM is powerful for standard text, Nuxt Content offers **MDC (Markdown Components)** syntax for even richer interactivity. If standard GFM doesn't meet your needs (e.g., you need complex alerts, tabs, or interactive widgets), you can use Vue components directly in Markdown:

```markdown
::alert{type="warning"}
這是一個使用 MDC 語法的警告區塊，比標準 Blockquote 更強大！
::
```

## 為什麼支援 GFM？

Nuxt Content 的核心解析器 **MDC (Markdown Components)** 在設計時就將 GFM 支援納入考量。這讓開發者能夠無縫地將在 GitHub 上編寫的 README 或其他 Markdown 文件遷移到 Nuxt Content 專案中，並保持一致的顯示效果，無需擔心表格、刪除線、任務列表等格式失效。
