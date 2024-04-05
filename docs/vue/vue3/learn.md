# 學習筆記

## 參考

- [互動教程](https://cn.vuejs.org/tutorial/#step-1)

## 生命週期 [Lifecycle Hooks]

Vue 元件實體生命週期 (Instance Lifecycle Hooks)

- [前端新手筆記-Vue.js 系列 第 4 篇 Day4 - Vue 生命週期介紹](https://ithelp.ithome.com.tw/articles/10217199)
  這篇整理的很好。
  > 取得 API 回傳資料交給 Vue.js 處 理理時，應該在哪個階段執⾏？A：created 階段之後都 ok(包括 created、beforeMount 與 mounted)，因為元件實體已經被建立，我們可以取得 data 資料。老師建議放 created 階段，不建議在放在 mounted 因為資料若為空陣列網頁畫面可能會有一段空白，但可以用 loading 圖蓋過。

## 混入 (mixin) [邏輯復用]

- [可复用性 & 组合 mixin](https://v2.cn.vuejs.org/v2/guide/mixins.html)

ex: getAllProduct.js 同時在 home,product 頁去引入 minxin

但是這樣放如果有發出 network，看不到是哪一隻發出的，只會顯示 getAllProduct.js
是否真的要分呢？問問 GPT 是說可以用一個參數來分。

> Vue3 Composition API 可以利用“组合式函数”(Composables) [Link to composables](./composition.html#composables) 替换 Vue Mixins
>
> - 參考文
>
>   - [Vue3 Composition API 如何替换 Vue Mixins](https://juejin.cn/post/6844904136065056781)
>
> - [掰惹 Mixin: Vue3-Composition API 的複用-Composables-D09](https://ithelp.ithome.com.tw/articles/10297490?sc=rss.iron)

## 路由切換

- [vue 监听路由切换](https://juejin.cn/s/vue%E7%9B%91%E5%90%AC%E8%B7%AF%E7%94%B1%E5%88%87%E6%8D%A2)

- 組建中

```
watch: {
  $route (to, from) {
    // 路由发生变化时的逻辑处理
  }
}

```

- 会在每次路由切换之前被调用，可以用来进行权限验证、路由拦截等逻辑处理
  需要调用 next() 函数来进行下一步操作，可以传入参数来指定路由跳转的目标。

```
router.beforeEach((to, from, next) => {
  // 路由切换之前的逻辑处理
  next()
})

```

## emit 撰寫方法

內層元件往外傳時 要用 e mit 事件的形式，不一定要傳遞資料

- 先定義外層接收的方法
- 定義內層的 $emit 觸發方法
- 使用 v-on 的方式觸發外層方法

### 內層觸發外部事件

- 先定義外層接收的方法 addNum()
- 定義內層的 $emit 觸發方法 button-counter 的方法 click= this.$emit("emit-num");自訂字串名稱備用 跟 觸發按鈕 click
- 使用 v-on 的方式觸發外層方法（口訣：前內、後外）button-counter v-on:emit-num="addNum" 綁定前兩項

### 傳遞資料

- 先定義外層接收的方法 getData(text)
- 定義內層的 $emit 觸發方法 button-text 的方法 內 this.$emit("emit-text", this.text);前名稱後參數跟觸發按鈕 click
- 使用 v-on 的方式觸發外層方法（口訣：前內、後外）button-text @emit-text="getData" 綁定前兩項

## TODO

- transition& keep-alive

## 疑難排解

### Q:無限迴圈

- 遇到無限迴圈問題，思考生命週期，決定是在 create,update 還是使用 computed 或是 watch 下去轉寫。

- 路由切換會觸發 update 需注意。

### v-show 沒作用的問題

用 v-show 需注意有沒有用 display

d-flex, 否則有可能失效，解法是要再包一層。
