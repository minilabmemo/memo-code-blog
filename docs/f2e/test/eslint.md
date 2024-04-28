---
outline: deep
---

# eslint

## 安裝及檢查

安裝完 eslint 與規則設定後，檢查方式。

- [ ]規則通常是依專案特性 TBD 待研究

1. 插件 eslint，不過我發現只有檔案開啟才會出現錯誤在問題裏面。
2. 全局掃 eslint 要去下 npm run eslint，檢查會自動修正。

```sh
> f2e-ec-store@0.0.0 lint
> eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore


/dev/front/vue/f2e-ec-store/src/components/admin/Navbar.vue
  1:1  error  Component name "Navbar" should always be multi-word  vue/multi-word-component-names

/dev/front/vue/f2e-ec-store/src/main.ts
   6:13  warning  'Vue' is defined but never used                     @typescript-eslint/no-unused-vars
  41:15  error    Component name "Form" should always be multi-word   vue/multi-word-component-names
  41:15  error    Name "Form" is reserved in HTML                     vue/no-reserved-component-names
  42:15  error    Component name "Field" should always be multi-word  vue/multi-word-component-names

✖ 5 problems (4 errors, 1 warning)
```

3. 為避免上傳 git 時忘記檢查，可以設定 pre-commit 觸發。

## 上傳 pre-commit 時觸發檢查

- 1. 安裝 `npm install --save-dev pre-commit`
- 2. 設定 `"pre-commit": ["lint"]`

```json
{
  "name": "xxx",
  "pre-commit": ["lint"],
  "version": "0.4.0"
}
```

- 3. 測試：然後找一個更改後的檔案 加上 message "提交"，會爆出 git 錯誤！該檔案會無法“提交”

```sh
2024-04-23 10:02:30.243 [info] > git -c user.useConfigOnly=true commit --quiet --allow-empty-message --file - [5439ms]
2024-04-23 10:02:30.243 [info]
/Users/xx/dev/front/vue/f2e-ec-store/src/components/admin/Navbar.vue
  1:1  error  Component name "Navbar" should always be multi-word  vue/multi-word-component-names

/Users/xx/dev/front/vue/f2e-ec-store/src/main.ts
   6:13  warning  'Vue' is defined but never used                     @typescript-eslint/no-unused-vars
  41:15  error    Component name "Form" should always be multi-word   vue/multi-word-component-names
  41:15  error    Name "Form" is reserved in HTML                     vue/no-reserved-component-names
  42:15  error    Component name "Field" should always be multi-word  vue/multi-word-component-names

✖ 5 problems (4 errors, 1 warning)

pre-commit:
pre-commit: We've failed to pass the specified git pre-commit hooks as the `lint`
pre-commit: hook returned an exit code (1). If you're feeling adventurous you can
pre-commit: skip the git pre-commit hooks by adding the following flags to your commit:
pre-commit:
pre-commit:   git commit -n (or --no-verify)
pre-commit:
pre-commit: This is ill-advised since the commit is broken.
pre-commit:
2024-04-23 10:02:30.255 [info] > git config --get-all user.name [11ms]



```

::: warning

這樣設定完就可以避免上傳 git 前忘記檢查 Lint，不過錯誤訊息會包在 git 裏面，不太好看，而且如果沒有修正錯誤會無法提交。
:::

## 安裝 airbnb-base「TBD」

這是在 vue 專案中安裝，但遇到些問題。

```sh
npm install --save-dev eslint-config-airbnb-base
```

- 設定

```js
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'airbnb-base',
  ],
```

- 效果
  - 多餘的空白換行會提示 More than 1 blank line not allowed.
  - `import 'xxx'` 後方忘記加上; 會提示 Missing semicolon.

### 「暫時沒解」問題 1:

- 在 vue 裡面會報出 Unable to resolve path to module '@/stores/productStore'.
- 安裝

```sh
npm install --save-dev eslint-plugin-import

```

- 解決不了

## 自定規則

### 自訂 html-self-closing 修正

```sh
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',

  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    }],



  },

};
```

### 空白換行不能太多

- 類似 airbnb 提示

```sh

rules: {
'no-multiple-empty-lines':['error',{ max:2 }],
},

```

### img 標籤補上 alt 屬性 [TBD]

- 這是規定在 ally 下面的規則。
- 可以安裝這個 [eslint-plugin-vuejs-accessibility](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility)

  > 這個插件 2024 還有在更新 適用於 vue/vite

- 安裝完設定以下設定

```sh

module.exports = {
root: true,
"plugins": ["vuejs-accessibility"],
extends: [
"plugin:vuejs-accessibility/recommended",
],

```

- 效果 vuejs-accessibility/alt-text 就會偵測到沒有設定 img alt 屬性的
  - img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.
  - https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/alt-text.html
  - [ ]但是不會自動修正，還有設定 alt=""空的是允許的

### label 沒有設定

上面那 vuejs-accessibility 插件會提示 label 沒有設定錯誤訊息

- 單一 input 錯誤

  - 有一個輸入框 沒有 label，會顯示錯誤 error Each form element must have a programmatically associated label element
  - 解法 可以加入 aria-label="xx" 用來告訴讀屏軟件某個元素是什麼
  - [eslint-plugin-vuejs-accessibility/rules/form-control-has-label](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/form-control-has-label.html)
    - [前端的基礎修養：aria-label](https://lepture.com/zh/2015/fe-aria-label)

- label 與 input 配對問題

```html
<div class="d-flex flex-wrap ">
  <input type="checkbox" id="importDataCheckbox" @change="importDataCheckbox()" class="me-2" />
  <label for="importDataCheckbox"> 從會員資料中匯入</label>
  <div>（<router-link class=" " to="/user/info">點此更新會員資料</router-link>）</div>
</div>
<div class="mb-3">
  <label for="email" class="form-label"><span class="text-primary fw-bold fs-3 ">*</span>Email</label>
  <VeeField id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required" v-model="form.user.email" />
  <VeeErrorMessage name="email" class="invalid-feedback" />
</div>
```

- 提示錯誤 error Each form element must have a programmatically associated label element vuejs-accessibility/form-control-has-label
  - [label-has-for](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/label-has-for.html)
  - 這規則預設都會檢查"nesting", "id",我把 nesting 拿掉就好了

### 建議不要使用 var

- 1 代表開啟

```sh
"no-var": 1
```

- 然後就會出現 Unexpected var, use let or const instead.

### no-console 提示

不知道為什麼我的不會提示要特別打開，設定如下

- 改了之後不會自動修正，但會提示
- 可以自訂 allow

```sh
  'no-console': ["error"],
  'no-console': ["error",{ allow: ["warn", "error"] }],

```

## 參考文

- [[JS] 使用 ESLint 提高程式碼品質](https://larrylu.blog/improve-code-quality-using-eslint-742cf1f384f1)
  - 介紹 ESLint 安裝與 pre-commit: 設定
