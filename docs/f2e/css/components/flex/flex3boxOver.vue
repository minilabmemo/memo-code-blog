<template>

  <h5>盒子 1 :容器高度不足
  </h5>
  <div class="box-container size-20">
    <div class="box-big ">1</div>
    <div class="box-big ">2</div>
    <div class="box-big ">3</div>
  </div>
  <hr>
  <h5>盒子 2 第一個子容器有自己的 margin，後面有 border/padding</h5>
  <div class="box-container size-50">
    <div class="box margin">1</div>
    <div class="box border">2</div>
    <div class="box padding">3</div>
  </div>
  <h5>盒子 3 [修正] 將 margin 換成 gap-5</h5>
  <div class="box-container size-50 gap-5">
    <div class="box ">1</div>
    <div class="box ">2</div>
    <div class="box ">3</div>
  </div>
  <hr>
  <h5>盒子 4 : 父容器縮小 到 50px</h5>
  <div class="box-container size-50">
    <div class="box ">1</div>
    <div class="box-big ">2</div>
    <div class="box ">3</div>
  </div>
  <h5>盒子 5 : 父容器縮小 到 50px，內容文本超出，使得收縮異常。</h5>
  <div class="box-container size-50">
    <div class="box ">danger</div>
    <div class="box-big ">beautiful</div>
    <div class="box ">word is over</div>
  </div>
  <h5>盒子 6 同上</h5>
  <div class="box-container size-50">
    <button type="button">button</button>
    <button type="button">but</button>
    <button type="button">buttoonnnnn</button>
    <button type="button">It is a button. </button>
  </div>


  <h4>修正：將文本不換行及省略號處理，讓他不會超出盒子，但是需注意這種處理。</h4>
  <h5>盒子 5 [修正]</h5>
  <div class="box-container size-50 overflow-hidden">
    <div class="box text-handle">danger</div>
    <div class="box-big text-handle">beautiful</div>
    <div class="box text-handle">word is over</div>
  </div>
  <h5>盒子 6：同上 [修正]</h5>
  <div class="box-container size-50 ">
    <button type="button" class="text-handle">button</button>
    <button type="button" class="text-handle">but</button>
    <button type="button" class="text-handle">buttoonnnnn</button>
    <button type="button" class="text-handle">It is a button. </button>
  </div>
</template>




<style lang="css" scoped src="./flex.css"></style>