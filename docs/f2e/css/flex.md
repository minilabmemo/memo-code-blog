---
outline: deep
---

<script setup>
import flex3box from './components/flex/flex3box.vue'
import flex3boxOver from './components/flex/flex3boxOver.vue'
import flex3boxImg from './components/flex/flex3boxImg.vue'
</script>

# flex 彈性盒子排版

## 啟用

在使用 `display: flex;` 的情況下，`flex-grow`、`flex-shrink` 和 `flex-basis` 的預設值如下：

- `flex-grow` 的預設值是 `0`，表示子元素不會根據剩餘空間進行放大。
- `flex-shrink` 的預設值是 `1`，表示子元素會根據需要收縮，以適應容器的空間。
- `flex-basis` 的預設值是 `auto`，表示元素的初始大小將根據其內容來決定。

這意味著在預設情況下，元素不會根據剩餘空間進行放大，但會根據需要收縮，並且其初始大小會根據內容自動調整。
::: tip
預設情況：flex: 0 1 auto; 不會放大，但會壓縮，元素大小根據內容決定。
伸縮本 01auto
:::

## 正常情況

將三個盒子放進 flex 中看看。

- box-container 包三個盒子，容器本身沒有設定寬高，尺寸根據包含的 box 元素自动调整。
  - 第一行三個都很小，就不會站滿
  - 第二行三個都很大，超出後會自動縮收在 box-container 範圍內。
    <flex3box></flex3box>

## 溢出的情況

### 內容超出

- 高度不足
- margin 超出
- 內容文本超出

<flex3boxOver></flex3boxOver>

::: tip
將盒子的寬度收縮到比其內容寬度還小可能會導致內容被截斷或失真。
:::

### 圖片

- 圖片溢出容器
  - []()
    <flex3boxImg></flex3boxImg>
    ::: tip
    推測應該是 img 具有 max-width:100% 造成，因此使用 div 再包一層會有效，再找資料時有另一種解法是要設置 overflow-hidden，不過雖然看起來是包進去了，但是卻變形了。
    :::

## 相關參考

- [Flex 踩坑指南（文字、图片溢出问题） - Minimum Content Size In CSS Flexbox](https://juejin.cn/post/7314507576439472169)
- [关于 flex 布局伸缩项为 img 时，图片不收缩显示的问题](https://blog.csdn.net/qq_41373791/article/details/109669044)
- [写给自己看的 display: flex 布局教程](https://juejin.cn/post/6844903701568552968)
