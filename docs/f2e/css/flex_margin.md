---
outline: deep
---

<script setup>
import flexHeader from './flex/flexHeader.vue'
import flexLayout from './flex/flexLayout.vue'


</script>

# flex 與自動邊界排版

## 參考

- [自動的 margins](https://bootstrap5.hexschool.com/docs/5.1/utilities/flex/#auto-margins)
  當你混用 Flex 對齊與 auto margin 時候，Flexbox 可以執行一些令人驚艷的功能。下面的範例是透過自動 margin 來控制 flex 項目的三個案例：預設（無自動 margin），向右推兩個項目 (.me-auto)，並向左推兩個項目 (.ms-auto)。
- [探秘 flex 上下文中神奇的自动 margin](https://www.cnblogs.com/coco1s/p/10910588.html)
  - 多種 navBar 排版與 footer 排版。//TODO

## Header 版面

- 使用對齊 space-between

<flexHeader></flexHeader>

```css
.header {
  display: flex;
  justify-content: space-between;
  /* 讓三個項目在 header 中均勻分佈 */
  align-items: center;
  /* 垂直居中對齊 */
  padding: 10px 20px;
  /* 可以根據需要調整 header 的 padding */
}
```

## Header/Main/Footer

- app 高度可以設定滿版。
- 利用 main flex: 1 可以讓裡面自動填充剩餘空間
- 利用 footer margin-top: auto 可以推到底部
  <flexLayout></flexLayout>

```css
.app {
  display: flex;
  flex-direction: column;
  height: 30vh;
  /* Ensure full viewport height */
}
main {
  flex: 1;
  /* Main content fills remaining space 设置一个元素的弹性增长因子（flex grow factor）为 1。这个属性告诉浏览器，该元素应该尽可能地填充父容器中剩余的空间 */
  /* flex: 1 0 auto; 与 flex: 1; 的效果基本相同 */
  overflow-y: auto;
  /* Add scrollbar if content exceeds viewport */
}
header {
  /* Sticky header with dynamic height */
  position: sticky;
  top: 0;
}

footer {
  /* Sticky footer */
  margin-top: auto;
  /* Push footer to the bottom */
}
```
