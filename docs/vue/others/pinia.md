---
outline: deep
---

# Pinia

## 安裝

照官方網站安裝，或是採用 vite 時就裝好了。

## 建立 store

### 在/stores 建立檔案

- 內容參考 [Defining a Store](https://pinia.vuejs.org/core-concepts/)
  - 以下範例是用 Options API，另外 Setup Stores 有教使用 Vue Composition API 的設定方式

```js
//Pinia 與 Options API 章節
import { defineStore } from "pinia";

//自定命名
const useUserStore = defineStore("user store", {
  // other options...

  //類似 Data
  state: () => ({ wallet: 300, name: "Eduardo" }),
  ///類似 Computed
  getters: {
    getUserName: (state) => `你好，${state.name}`,
  },
  ///類似 Methods
  actions: {
    updateName() {
      this.name = "小美";
    },
  },
});

export default useUserStore;
```

#### Getters [Option API 寫法]

Getters are exactly the equivalent of computed values for the state of a Store.

- [Getters](https://pinia.vuejs.org/core-concepts/getters.html#Getters)
- 可以用於根據資料做排序等作法。

```js
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
//取 doubleCount 跟取 count 一樣寫法
```

### 使用

- [core-concepts/#Using-the-store](https://pinia.vuejs.org/core-concepts/#Using-the-store)
  使用上有跟 option API 跟 composition 的用法，後者修改用法比較多，先以後者為範例。
  - 抓取到資料後，可以直接改值，store 資料會改變。
  - 可以用解構+storeToRefs 後用 value 改值。
  - 方法可以直接解構出來
  - 也可以自訂方法 用 user.$patch 與 user.$reset 設定資料。

```
<template>
  <div>
    <div>不解構的用法 </div>
    <code>const user = useUserStore();</code>
    {{ user.name }}
    <div> {{ user.getUserName }}</div>
    <button type="button" @click="user.updateName">按我觸發 updateName</button>


    <div>解構的用法</div>
    {{ name }} {{ wallet }}
    <button type="button" @click="updateName">按我觸發 updateName</button>

    <button type="button" @click="updateData">按我觸發 updateData</button>
    <button type="button" @click="reset">按我觸發 reset</button>
  </div>
</template>


<script>
import useUserStore from '@/stores/user'
import {storeToRefs} from 'pinia'
export default {
  setup() {
    const user = useUserStore();
    user.name = "被我改名了"

    const {name, wallet} = storeToRefs(user);
    name.value = "換個解構取值"

    const {updateName} = user;

    function updateData() {
      user.$patch(
        {
          name: "資料 patch 更名了"
        }
      )
    }
    function reset(params) {
      user.$reset();

    }

    return {user, name, wallet, updateName, updateData, reset}
  }

}
</script>

```

### 使用 改寫 [vue2 to vue3]

```js
import {mapState, mapActions} from 'pinia'/// [!code --]

import { storeToRefs } from 'pinia'; / // [!code ++]
const orderStore =useOrderStore()// [!code ++]
const { order,status } = storeToRefs(orderStore);// [!code ++]
const { getOrderByID,payOrderByID } = orderStore;// [!code ++]


  computed: {/// [!code --]
    ...mapState(useOrderStore, ['order', 'status']),/// [!code --]

  },

  methods: {/// [!code --]
    ...mapActions(useOrderStore, ['getOrderByID', 'payOrderByID']),/// [!code --]

```

## 監聽 state

### 監聽所有

```js
import { useOrderStore } from "@/stores/orderStore";
const orderStore = useOrderStore();
watch(
  useOrderStore,
  (state) => {
    console.log(`watch here`, state);
  },
  { deep: true }
);
```

### 監聽單一

```js
watch(
  () => orderStore.isOrderSendSuccess,
  (newVlue) => {
    console.log("newVlue.title.watch>>>", newVlue);
  }
);

//需注意 如果監聽的是物件 要加上 deep
watch(
  () => orderStore.status.orderTemp,
  (newVal) => {
    if (newVal.paySuccess) {
      emit("order-create", newVal.orderId);
      emit("go-next");
    }
    getCart();
  },
  { deep: true }
);
```

- 錯誤寫法

```js
const { order, status, isOrderSendSuccess } = storeToRefs(useOrderStore);

watch(
  () => isOrderSendSuccess,
  (newVlue) => {
    console.log("newVlue.title.watch>>>", newVlue);
  }
);
```

> 在你的 watch 中，isOrderSendSuccess 是一个 ref 对象的解构，而不是一个函数或响应式状态，因此 watch 监听不到它的变化。你应该监听 orderStore.isOrderSendSuccess 而不是解构后的变量

- 參考[Vue3 筆記 | Pinia 管理全域資料](https://vocus.cc/article/654a5302fd897800015d7dd9)

### options 寫法

```js

 computed: {
    ...mapState(useProductStore, ['products', 'status'])
  },
  watch: {
    products: {
      handler: function (val, oldVal) {
      //做一些事
        }
      }
    },
  },

```

### composition 寫法

```js
// 錯誤寫法 裡面要用箭頭 A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.
// watch(pagination.value.current_page, (newValue, oldValue) => {
//   window.scrollTo({top: 0, behavior: 'smooth'});
// });
const pagination = ref({ 等等 });
watch(
  () => pagination.value.current_page,
  (newValue, oldValue) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
);
```

## TODO

- [ ]pinia 響應變化？
- [ ]pinia data race?
