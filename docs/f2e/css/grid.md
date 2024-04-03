---
outline: deep
---

<script setup>
import grid from './grid/grid.vue'
import gridName from './grid/gridName.vue'



</script>

# grid

## 學習好文

- [應該用哪一個切版？flex 跟 grid 的優缺點比較](https://johnnytsai81.github.io/CSS/07_flex_vs_grid/)
  - 清楚列出優缺點比較，Flex 是擅長一維的排版，Grid 擅長二維的排版。
- [設計師的 RWD 網頁排版 — Grid layout vs. Flexbox](https://medium.com/vhs-design-vitamin-for-creative-mind/flexbox-grid-1c6866d0c4a1)
  - 說明圖表很好看。
    > 實現單一軸向的自適應式排版，例如導覽列、卡片式排版、相簿等，可以選擇使用 Flexbox。如果你想快速實現雙軸平面式，甚至不規則的排版 (像平面設計排版那樣的自由)，那麼使用 Grid layout 會更適合也更快速。

## 設定格線與對應空間

設定 display: grid 啟用排版。

### 先畫出 rows/columns

- grid-template-rows 高度，幾行
- grid-template-columns 寬度，幾列
- 子容器 grid-area: 2 / 1 / 3 / 4; 起始行/起始列/結束行/結束列。表示從軌道線畫出第 2 行到第三行至第一列到第四行。

<grid></grid>
::: tip
打開開發者工具可以看到畫好的線。
:::

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  /* 三列 */
  grid-template-rows: 50px 50px;
  /* 兩行 */
  gap: 10px;
  /* 列與行之間的間距 */
  background-color: lightyellow;
}

.item {
  grid-area: 2 / 1 / 3 / 4;
  background-color: lightblue;
}
```

### 利用 fr 與命名法

- grid-template-columns: 1fr 1fr 1fr; 均分等分
- 可以設定 repeat(2, 1fr 2fr) 50px; 等於 1fr 2fr 1fr 2fr 50px ;
- 用 grid-template-areas 指定命名「沒有對應好會設定失敗」
- 然後子容器只要輕鬆用 grid-area: header 設定對應命名就好。

<gridName></gridName>

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(2, 1fr) 50px;
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  grid-template-areas:
    "header header header "
    "side  main main "
    "side footer footer ";
}
.header {
  grid-area: header;
  background-color: lightblue;
}
```
