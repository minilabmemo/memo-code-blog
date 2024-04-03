---
outline: deep
---

<script setup>
import row from './bootstrap/row.vue'
import flex from './bootstrap/flex.vue'

</script>

# flexbox 與 bootstrap 格線系統

## flex

<flex></flex>

```
.left,.right {
  flex: 1;
}
// 等於flex:1,flex:1 1 0%;
```

- 使用 flex: 1; 時，它相當於 flex-grow: 1; flex-shrink: 1; flex-basis: 0%;

## bootstrap 格線系統

<row></row>

```css
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-6 {
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

.col {
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
}
// 等於 flex:1,flex:1 1 0%;
```

## 相關參考

- [用 Tailwind 重現 Bootstrap 的 Grid System](https://ngseke.me/blog/reproduce-bootstrap-grid-in-tailwind)
