<template>
  <header class="header">
    <div class="logo">Your Logo</div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="nav-link active" aria-current="page" href="#">Nav</a>
      <a class="nav-link active" aria-current="page" href="#">Nav</a>
      <a class="nav-link active" aria-current="page" href="#">Nav</a>
    </nav>
    <div class="user-icon">User Icon</div>
  </header>

</template>

<style lang="css" scoped>
.header {
  display: flex;
  justify-content: space-between;
  /* 讓三個項目在 header 中均勻分佈 */
  align-items: center;
  /* 垂直居中對齊 */
  padding: 10px 20px;
  /* 可以根據需要調整 header 的 padding */
}


.navbar {
  display: flex;
  gap: 5px;
}
</style>