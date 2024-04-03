<template>

  <br>
  <div class="container">
    <div class="header">header</div>
    <div class="side">side</div>
    <div class="main">main</div>
    <div class="footer">footer</div>
  </div>
</template>

<style lang="css" scoped>
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

  background-color: lightyellow;
}

.header {
  grid-area: header;
  background-color: lightblue;
}

.side {
  grid-area: side;
  background-color: lightgreen;
}

.main {
  grid-area: main;
  background-color: paleturquoise;
}

.footer {
  grid-area: footer;
  background-color: lightblue;
}
</style>