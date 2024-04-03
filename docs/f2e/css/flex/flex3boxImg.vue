<template>
  <h5> 一張圖片 80*80, 盒子寬度：150px</h5>
  <img src="https://picsum.photos/id/237/80/80" alt="fake">
  <div class="box-container size-150"> </div>
  <h5>盒子 : 圖片卻被放大到 150px 並超出去。</h5>
  <div class="box-container size-150">
    <img src="https://picsum.photos/id/237/80/80" alt="fake">
    <img src="https://picsum.photos/id/237/80/80" alt="fake">
    <img src="https://picsum.photos/id/237/80/80" alt="fake">
  </div>

  <h5>盒子 [修正]：利用 overflow-hidden 修正？ </h5>
  <div class="box-container size-150">
    <img src="https://picsum.photos/id/237/80/80" alt="fake" class="overflow-hidden">
    <img src="https://picsum.photos/id/237/80/80" alt="fake" class="overflow-hidden">
    <img src="https://picsum.photos/id/237/80/80" alt="fake" class="overflow-hidden">
  </div>
  <h5>盒子 [修正]: 再包一層 div </h5>
  <div class="box-container size-150">
    <div> <img src="https://picsum.photos/id/237/80/80" alt="fake"></div>
    <div> <img src="https://picsum.photos/id/237/80/80" alt="fake"></div>
    <div> <img src="https://picsum.photos/id/237/80/80" alt="fake"></div>
  </div>
</template>



<style lang="css" scoped src="./flex.css"></style>