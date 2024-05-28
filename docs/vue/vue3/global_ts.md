---
outline: deep
---

# vue3 globalProperties [ts version]
## globalProperties 全局方法

http://zhongyi.qdxiaochuan.com/?id=645
## filter.js 註冊全局方法

- 新建立 filter.js

```js
export function currency(num) {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}

```

- main.ts 註冊 globalProperties

```ts
import { currency, date } from '@/utils/methods/filters'
app.config.globalProperties.$filters = {
  date,
  currency
}
```

- 使用在其他檔案就可以不用 import 直接使用`$filters.方法 ()`

```js
  <div>{{ $filters.date(tempOrder.create_at) }}</div>
  <span class=" text-primary   ">${{ $filters.currency(item.product.price) }}</span>
```

##  filter.ts 改寫

### 修正 filter.ts

```ts
export function currency(num: string): string {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time: number): string {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}

export interface FilterI {
  currency(num: string): string;
  date(time: number): string;
}

const filters: FilterI = {
  currency,
  date
};

export default filters;


```

### 新增 filter.d.ts 申明檔案

```ts
//如果不設定的話 import '@/utils/methods/filters' 時會出現找不到模組 '@/utils/methods/filters' 的宣告檔案。
//'/Users/xx/dev/front/vue/f2e-ec-store/src/utils/methods/filters.js' 隱含具有 'any' 類型。


//新增 filter.d.ts 申明檔案
// filters.d.ts

declare module '@/utils/methods/filters' {
  export function currency(num: string): string;
  export function date(time: number): string;

  export interface FilterI {
    currency(num: string): string;
    date(time: number): string;
  }

  declare const filters: FilterI;
  export default filters;
}

//把設定放進 tsconfig.app.json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts","filters.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "allowJs": true,
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

### 改寫 main.ts 新增 ComponentCustomProperties

ComponentCustomProperties 範例寫法來自官網 [扩展全局属性|axios](https://cn.vuejs.org/guide/typescript/options-api.html#augmenting-global-properties)

```ts
import { currency, date } from '@/utils/methods/filters';

import filters from '@/utils/methods/filters'; / // [!code ++]
declare module 'vue' {/ // [!code ++]
  interface ComponentCustomProperties {/ // [!code ++]
    $filters: typeof filters;/ // [!code ++]
  }/ // [!code ++]
}/ // [!code ++]

app.config.globalProperties.$filters = {
  date,
  currency
};

```
