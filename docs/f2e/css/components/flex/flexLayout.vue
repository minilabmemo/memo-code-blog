<template>
  <div class="app">
    <header>
      <!-- Your header content here -->
      <div class="header-box">
        <h1>Header Content</h1>
        <h5>Header Content</h5>
        <h5>Header Content</h5>
        <h5>Header Content</h5>
      </div>
    </header>
    <main>
      <!-- Your main content here -->
      <p style="height: 70%">Main Content</p>
      <p style="height: 70%">Main Content</p>
      <p>Main Content</p>
    </main>
    <footer>
      <!-- Your footer content here -->
      <p>Footer Content</p>
    </footer>
  </div>

</template>

<style lang="css" scoped>
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

header,
footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
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

.header-box {
  display: flex;
  flex-wrap: wrap;
}
</style>