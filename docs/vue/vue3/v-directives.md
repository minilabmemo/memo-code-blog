---
outline: deep
---

# 内置指令 v-directives

- [内置指令](https://cn.vuejs.org/api/built-in-directives)

## v-pre 顯示 <span v-pre>{{ }}</span>

想要顯示 <span v-pre>{{ }}</span> 你會發現顯示上差異：

- 如果你單打{{}}你會發現你得到一個空白`{{}}`，如果要顯示請打<span v-pre>{{ }}</span>
- 加上重引號<span v-pre>`{{ }}`</span>

```js
- 如果你單打{{}}你會發現你得到一個空白`{{}}`，如果要顯示請打<span v-pre>{{ }}</span>
- 加上重引號<span v-pre>`{{ }}`</span>

```

### <span v-pre>放入{{表達式}}</span>

表達式可以這樣用

```js
<p>樣板字面值：{{`${name}在${position}吃早餐` }}</p>
<p>字串處理：{{text.split('').reverse().join('') }}</p>
<p>放 methods:{{ say('小美')}}</p>
<p>JS 運算：</p>{{1+1 }}</p>
//json 可以印出
```

## v-text

- 期望的绑定值类型：string
- 與<span v-pre>`{{ }}`</span>(Mustache) 差異：v-text 與`{ {} }`效果一樣，不過是加進 html 標籤內，如果要改標籤 `strong 等`比較好改

> Mustache 鬍子 - 模板系統

```js
  {{name}}
  <p><span v-text="name"></span>在<span v-text="position"></span>吃東西</p>
  <input type="text" v-model="name">

```

## v-html

- 期望的绑定值类型：string
- 一般 html 放進`{ {<p>他在看電視</p>} }`，會選染出標籤的文字
- 使用 v-html 就可以作為 HTML 插入正常顯示。

```js
 {{ rawHtml }} 帶有標籤的 p 文字資料會直接顯示出來
  <div><span v-html="rawHtml"></span>使用 v-html 了</div> 就不顯示p了
...
 rawHtml: '<p>他在看電視</p>',
```

> - v-html 的内容直接作为普通 HTML 插入—— Vue 模板语法是不会被解析的。如果你发现自己正打算用 v-html 来编写模板，不如重新想想怎么使用组件来代替。
> - 在你的站点上动态渲染任意的 HTML 是非常危险的，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要将用户提供的内容作为插值

## v-bind 屬性綁定 縮寫 :

- 語法 `v-bind:屬性="值"` 或`：屬性="值"`

```ts
<!-- 绑定 attribute -->
<img v-bind:src="imageSrc" />
<img :src="imageSrc" />
<button  :disabled="isFull"></button>



<!-- 绑定对象形式的 attribute -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop 绑定。“prop” 必须在子组件中已声明。 -->
<MyComponent :prop="someThing" />

<!-- 传递子父组件共有的 prop -->
<MyComponent v-bind="$props" />

<!-- XLink -->  ???
<svg><a :xlink:special="foo"></a></svg>

```

### 動態屬性

-語法 `:[字串變數]`

```js
<!-- 动态 attribute 名 -->
<button v-bind:[key]="value"></button>

<!-- disabled & readonly 應用注意 -->
<button type="button"
  v-on:click="dynamic = dynamic === 'disabled' ? 'readonly':'disabled'">
  切換為 {{ dynamic }}</button>
//NOTE 這樣寫 :[dynamic]
<code> :[字串變數]</code>
<input type="text" :[dynamic] :value="name">

 //NOTE 不能這樣寫 :disabled="dynamic" :readonly="dynamic" 變成都出現
<input type="text" :disabled="dynamic" :readonly="dynamic" :value="name">
```

### 樣式綁定

- `:class="{className:判斷式}`,className 如為特殊字要加上''包起
- `{}`可放入物件或是陣列
- `:style`: `key`值要轉變為小寫駝峰式命名`:style="{backgroundColor:'red'}"`

```js
<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="{ 'bg-danger':true }"></div>

<div class="box " :class="{rotate:true,'bg-danger':true}"> 多值</div>

<div class="box " :class="objectClass"> 物件寫法</div>
<!-- 資料 objectClass:{  rotate:true,'bg-danger':true } -->

<div :class="[classA, classB]">陣列寫法</div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 資料  styleObjectA: {backgroundColor: 'red', borderWidth: '5px'},
styleObjectB: {boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.16)'}, -->
```

## v-model

- 期望的绑定值类型：根据表单输入元素或组件输出的值而变化

- 仅限：`<input>`,`<select>`,`<textarea>`,components
  - 文本类型的 `<input>` 和 `<textarea>` 元素会绑定 value property 并侦听 input 事件；
  - `<input type="checkbox">` 和 `<input type="radio">` 会绑定 checked property 并侦听 change 事件；
  - `<select>` 会绑定 value property 并侦听 change 事件。
- 修饰符
  - .lazy - 监听 change 事件而不是 input,
  - .number - 将输入的合法字符串转为数字
  - .trim - 移除输入内容两端空格
- 參考
  - [v-model](https://cn.vuejs.org/api/built-in-directives#v-model)
  - [表单输入绑定](https://cn.vuejs.org/guide/essentials/forms.html)
  - 组件事件 - 配合 v-model 使用

## v-on 事件監聽 縮寫＠

- 參考 [v-on](https://cn.vuejs.org/api/built-in-directives#v-on)

- 如果使用内联声明，可以访问一个特殊的 `$event` 变量`：v-on:click="handle('ok', $event)"`。
- 修飾符
  - 事件修飾符
  - 滑鼠修飾符
  - 鍵盤修飾符

```js
<!-- 方法处理函数 -->
<button v-on:click="doThis"></button>

<!-- 动态事件 -->
<button v-on:[event]="doThis"></button>

<!-- 内联声明 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 使用缩写的动态事件 -->
<button @[event]="doThis"></button>

<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>


<!-- 停止传播 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认事件 -->
<button @click.prevent="doThis"></button>

<!-- 不带表达式地阻止默认事件 -->
<form @submit.prevent></form>

<!-- 链式调用修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 按键用于 keyAlias 修饰符-->
<input @keyup.enter="onEnter" />

<!-- 点击事件将最多触发一次 -->
<button v-on:click.once="doThis"></button>
```

## TODO

v-once,memo,cloak,slot
