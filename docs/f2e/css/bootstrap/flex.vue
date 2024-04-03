<template>
  <div class="flex">
    <div class="left">left</div>
    <div class="right">right</div>

  </div>
</template>


<style lang="css" scoped>
.flex {
  display: flex;
}

.left,
.right {
  flex: 1;
}

.left {
  background-color: red;
}

.right {
  background-color: blue;
}
</style>