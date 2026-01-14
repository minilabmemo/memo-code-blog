---
outline: deep
---

# 設計模式

### 單例模式 (Singleton)

::: tip
意图：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

:::

- 範例

```js
lass FetchAct {
  constructor() {
    // 通过单例模式确保只实例化一次
    if (FetchAct.instance) {
      return FetchAct.instance;
    }
    FetchAct.instance = this;
  }

  get(url, config) {
    // 实现 GET 请求逻辑
  }

  post(url, data, config) {
    // 实现 POST 请求逻辑
  }

  // 其他 HTTP 请求方法...

  // 你可以添加其他自定义方法...
}

// 创建并导出一个已实例化的 FetchAct 对象
export default new FetchAct();

```
