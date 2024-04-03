<template>
  <h4>盒子寬度：{{ containerSize1 }}</h4>
  <h5> 1.內部盒子 box 寬：{{ box1 }}</h5>
  <div class="box-container" ref="boxContainer1">
    <div class="box" ref="box1">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
  </div>
  <h5>2.內部盒子 box 寬：{{ box2 }}</h5>
  <div class="box-container">
    <div class="box-big" ref="box2">1</div>
    <div class="box-big">2</div>
    <div class="box-big">3</div>
  </div>
  <h5>盒子 3 box 寬：{{ box31 }},{{ box32 }},{{ box33 }}</h5>
  <div class="box-container">
    <div class="box-big" ref="box31">1</div>
    <div class="box" ref="box32">2</div>
    <div class="box-big" ref="box33">3</div>
  </div>

</template>


<script>

export default {
  data() {
    return {
      containerSize1: 0,
      box1: 0,

      box2: 0,

      box31: 0,
      box32: 0,
      box33: 0,
    }
  },
  mounted() {
    this.containerSize1 = this.$refs.boxContainer1.clientWidth
    this.box1 = this.$refs.box1.clientWidth

    this.box2 = this.$refs.box2.clientWidth
    this.box31 = this.$refs.box31.clientWidth
    this.box32 = this.$refs.box32.clientWidth
    this.box33 = this.$refs.box33.clientWidth

  },
}
</script>


<style lang="css" scoped src="./flex.css"></style>