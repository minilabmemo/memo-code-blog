<template>

  <br>
  <div class="container">
    <div class="item">item</div>
  </div>
</template>

<style lang="css" scoped>
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
</style>