<template>

  <div class="bg-danger row ">
    <div class="col-6 bg-warning   ">left col-6 </div>
    <div class="col-6 bg-success   ">right col-6</div>

  </div>
  <div class="bg-danger row ">
    <div class="col bg-warning   ">left col</div>
    <div class="col bg-success   ">right col</div>

  </div>
</template>

//FIXME 似乎沒有辦法在 vite press 中啟用 bs5 用了 scoped 也一樣？會影響到 blog 樣式
<style lang="css" scoped>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
</style>