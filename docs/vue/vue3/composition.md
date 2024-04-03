---
outline: deep
title: composition 組合式 API
---

# 學習筆記

## 基本認識

- [为什么要有组合式 API？](https://cn.vuejs.org/guide/extras/composition-api-faq)

![img](https://user-images.githubusercontent.com/499550/62783026-810e6180-ba89-11e9-8774-e7771c8095d6.png)

## Proxy

如果你把 this 印出來，會看到一個 Proxy 結構，內含 handler & target,target 內會有自訂義的資料等等。

## options 改寫成 composition API

- [响应式基础](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)

### setup

- setup() 函数中需手动暴露大量的状态和方法，裡面不需要使用 this。
- 方法使用一般 function 或是箭頭韓式都可以。
- 需要顯示在畫面上的資料，響應式需要改用 ref 或是 reactive 來定義。
- 如果不需要顯示在畫面上的內部參數，就不需要用 ref 等定義及 return 了。

```js
 <div id="app">
      {{ num }}
     <button type="button" @click="add">累加</button>
  </div>
  <script type="module">
            // import { createApp, ref } from "vue"; //vue Cli,ESM Uncaught TypeError: Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".
            const { createApp, ref } = Vue;
            // const app = Vue.createApp({
            const app = createApp({
              // data() {
              //   return {
              //     num: 1,
              //   }
              // },
              // methods: {
              //   add() {
              //     this.num++;
              //   }
              // },
              setup() {
                const num = ref(1);
                function add() {
                  // 在 JavaScript 中需要 .value, 不用 this
                  num.value++;
                }
                // 不要忘记同时暴露 add 函数，資料跟方法都要
                return {
                  num,
                  add,
                };
              },
            });

            app.mount("#app");
          </script>
```

## ref

- Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 Map。
- Ref 是一個 RefImpl 結構，內容 value 可以是純值或是 Proxy。
- 改值都是透過.value 去改。

```js
            const { createApp, ref } = Vue;
            const app = createApp({
              setup() {
                const num = ref(123);
                console.log("num", num);

                const person = ref({ name: "Nana" });// [!code ++] 可設定對象
                console.log("person", person);
                person.value.name = "L";  // [!code ++] 記得用.value 設定
                person.value = { name: "Lala" };  // [!code ++]
                return { num, person };
              },
            });

ref.html:34
num
RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true,
 _rawValue: 123, _value: 123}
ref.html:37
person
RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true,
 _rawValue: {…}, _value: Proxy(Object)}
```

## reactive

- 非原始值将通过 reactive() 转换为响应式代理。
- 是一個 Proxy 對象，需注意不要重新賦予對象，會使 Proxy 失去作用。所以建議用 const 來定義。

```js
const { createApp, reactive } = Vue;
const app = createApp({
  setup() {
    //  const person1 = reactive(1); //不可以使用純值設定，會爆出警告 vue.global.js:1346 value cannot be made reactive: 1
    const person = reactive({ name: "Nana" }); //內容是對象
    console.log(person); //可以看到這會是 Proxy
    person.name = "L";

    //let person = reactive({ name: "Nana" });  // [!code warning] 建議用 const
    //person = { name: "name" };  // [!code error] Proxy 會消失
    //console.log(person);
    return { person };
  },
});
```

## 生命週期

對應表可以參考 - [元件的生命週期與更新機制](https://book.vue.tw/CH1/1-7-lifecycle.html)

- onMounted 可以定義多次，並放在相關資料附近，增加查找效率。

```
  setup() {
                const num = ref(1);
                onMounted(() => {
                  num.value = 100;
                });

                const person = ref({
                  name: "小明",
                  price: 0,
                });
                const add = (n) => {
                  num.value += n;
                };

                // 生命週期
                // #1 https://v3.cn.vuejs.org/api/composition-api.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90

                onMounted(() => {
                  person.value = {
                    name: "小美",
                    price: 0,
                  };
                });

              return {
                  // 外部需要用到的值，則需要匯出
                  num,
                  person,
                  add,

                };
              },
            });
```

## 計算屬性 computed

- [计算属性](https://cn.vuejs.org/guide/essentials/computed.html)
  - 计算属性 publishedBooksMessage。computed() 方法期望接收一个 getter 函数，返回值为一个计算属性 ref。和其他一般的 ref 类似
  - 计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建

## props

- 在没有使用 的组件中，prop 可以使用 props 选项来声明
- prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。在这种情况下，最好是新定义一个局部数据属性，从 props 上获取初始值即可：
- [Props](https://cn.vuejs.org/guide/components/props.html#props-declaration)

```js
<script setup>const props = defineProps(['foo']) console.log(props.foo)</script>;

VS;

export default {
  props: ["foo"],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo);
  },
};
```

## emit

- [组合式 API：setup()] (https://cn.vuejs.org/api/composition-api-setup.html#composition-api-setup)
- API：setup(props,context), context 內容有 attrs, slots, emit, expose
- 而 emit 的用法跟前面章節一樣。

```js
     setup(props, { emit }) {
                function pushData() {
                  console.log("pushData");
                  emit("push-data", "內部傳出去的資料");
                }

                return {
                  pushData,
                };
              },
            };

```

## 訪問模板引用 dom 的 ref

- [访问模板引用](https://cn.vuejs.org/guide/essentials/template-refs.html#accessing-the-refs)

```
  <button type="button" ref="btn">這裡有一個按鈕</button>


   const app = createApp({
              components: {
                card,
              },
              setup() {
                const person = ref({
                  name: "卡斯伯",
                });

                const btn = ref(null);  // [!code error]必須跟html ref 同名
                onMounted(() => {
                  console.log("ref", btn.value); // <button type="button" ref="btn">這裡有一個按鈕</button>
                });
                return {
                  person,
                  btn,
                };
              },
            });
```

## Provider 與 Inject 跨層級 props

- 預設不會有雙向綁定，內層採用 v-model 並不會互動。
- 如果要互動的話就改用 ref(person...) 來定義

```
父
     const app = createApp({
              components: {
                card,
              },
              setup(props) {
                const person = {
                  name: "卡斯伯",
                };

                provide("person", person);
                return {
                  person,
                };
              },
            });


內
        const card = {
              template: `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title"></h5>
      <input type="text">
    </div>
  </div>`,
              setup(props) {
                const person = inject("person");
                return { person };
              },
            };


```

## watch

- [watch](https://cn.vuejs.org/api/reactivity-core.html#watch)

```
    const app = createApp({
              setup(props) {
                // 監聽純值
                const productName = ref("蛋餅");
                const watchText = ref("");
                watch(productName, (newV, oldV) => {
                  watchText.value = `newV:${newV} old:${oldV}`;
                });
                // 監聽物件
                // # ref, reactive 在此運作相同
                const product = ref({
                  name: "蛋餅",
                  price: 30,
                  vegan: false,
                  other: {
                    name: "送安檢",
                  },
                });
                const watchText2 = ref("");
                watch(
                  () => product.value.other.name,  // [!code warning] 對象內容需要用箭頭
                  (newV, oldV) => {
                    watchText2.value = `newV:${newV} old:${oldV}`;
                  }
                );
                return {
                  product,
                  productName,
                  watchText,
                  watchText2,
                };
              },
            });

```

- 多值監聽

  ```
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
  })
  ```

- 深層監聽
  - [深层侦听器](https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers)
  - TBO

## Watch 與 Computed 的結合體，WatchEffect

- 會自動去偵測要監聽的值，不需要先定義，有用到就監聽了，但沒辦法拿到前一個修改值
- 初始會先執行一次，不像 watch 初次沒有值。

```
   const app = createApp({
              setup(props) {
                const productName = ref("蛋餅");

                const product = ref({
                  name: "蛋餅",
                  price: 30,
                  vegan: false,
                  other: {
                    name: "送安檢",
                  },
                });

                const watchText = ref("");
                watchEffect(() => {
                  console.log("productName", productName);
                  console.log("product.value.name", product.value.name);
                  watchText.value = `值：${product.value.name}`;
                });
                return {
                  product,
                  productName,
                  watchText,
                };
              },
            });

```

- watchEffect 是可以被停止的

```

                const num = ref(0);
                const price = ref(0);
                const stopThis = watchEffect(() => {
                  price.value = `price 值：${product.value.price}`;
                  num.value++;
                  if (num.value === 10) {
                    stopThis();
                  }
                });

```