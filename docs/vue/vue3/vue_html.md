
## 參考資料
https://www.npmjs.com/package/eslint-plugin-risxss
https://github.com/theodo/RisXSS/blob/HEAD/docs/rules/catch-potential-xss-vue.md
https://www.imooc.com/wenda/detail/728238
https://israynotarray.com/vue/20231205/2797313606/



## 範例程式

```
<template>
  <div class="app">
    <textarea v-model="code" placeholder="在此輸入樣式程式碼" rows="10" cols="50"></textarea>
    <button @click="insertDefaultText">插入預設文本</button>
    <div class="output" v-html="safeCompiledTemplate"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DOMPurify from 'dompurify';

const code = ref<string>('');

const safeCompiledTemplate = computed<string>(() => {
  return DOMPurify.sanitize(code.value);
});

const insertDefaultText = () => {
  code.value = "<div class='text-6xl font-cherry'>APP-COOK</div>";
};
</script>



[{
	"code": "risxss/catch-potential-xss-vue",
	"message": "XSS potentially found: use of v-html.",
}]
'v-html' directive can lead to XSS attack. - eslint(vue/no-v-html)
```