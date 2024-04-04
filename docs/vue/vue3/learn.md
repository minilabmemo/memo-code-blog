# 學習筆記

## 參考

- [互動教程](https://cn.vuejs.org/tutorial/#step-1)

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

## emit

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
