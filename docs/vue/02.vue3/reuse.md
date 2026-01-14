---
outline: deep
---

## 重複使用的方法

自己包一個可重複使用的 Fetch

### 方法 1: 回傳 Promise

1. 新增 fetch.js Promise

```js
export function fetchAct(url) {
  return new Promise((resolve, reject) => {
    const status = statusStore();
    status.isLoading = true;

    axios
      .get(url)
      .then((response) => {
        status.isLoading = false;
        if (response.data.success) {
          resolve(response.data);
        } else {
          reject(new Error("Fetch failed: " + response.data.message));
        }
      })
      .catch((error) => {
        status.isLoading = false;
        catchErr(error);
        reject(error);
      });
  });
}
```

2. pinia getOrders 修改

- 用 async /await 寫法

```js
async function getOrders(currentPage = 1) {
  // 使用 async
  pagination.value.currentPage = currentPage;
  const url = `${userOrdersApi}?page=${currentPage}`;
  try {
    const data = await fetchAct(url); // 使用 await 等待异步操作完成
    orders.value = data.orders;
    pagination.value = data.pagination;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
}
```

- 不用 async /await 寫法

```js
function getOrders(currentPage = 1) {
  pagination.value.currentPage = currentPage;
  const url = `${userOrdersApi}?page=${currentPage}`;
  fetchAct(url).then((data) => {
    orders.value = data.orders;
    pagination.value = data.pagination;
  });
}
```

### 方法 2: 組合式函數？

- [ ] 待確認使用方式

```js
export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const status = statusStore();
  status.isLoading = true;
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((json) => (data.value = json))
  //   .catch((err) => (error.value = err))
  axios
    .get(url)
    .then((response) => {
      status.isLoading = false;
      //data.value = response.data
      //success??
      if (response.data.success) {
        data.value = response.data;
        console.log("response data", data.value);
      } else {
        dataErr(response);
      }
    })
    .catch((err) => {
      status.isLoading = false;
      catchErr(err);
      error.value = err;
    });
  return { data, error };
}
```

- pinia

```js
function getOrders(currentPage = 1) {
  pagination.value.currentPage = currentPage;
  const url = `${userOrdersApi}?page=${currentPage}`;

  const { data, error } = useFetch(url); //寫在這邊似乎有點奇怪 看範例都是定義在外部

  // if (data.value) {//因為是非同步所以這邊會抓到 null 還要搭配 watchEffect 去抓取
  //   orders.value = data.value.orders;
  //   pagination.value = data.value.pagination;
  // }
  watchEffect(() => {
    if (data.value) {
      orders.value = data.value.orders;
      pagination.value = data.value.pagination;
    }
    if (error.value) {
      console.error("Failed to fetch orders:", error.value);
    }
  });
}
```

#### 再看一次範例

- [pinia 处理组合式函数](https://pinia.vuejs.org/zh/cookbook/composables.html)

```js

import { defineStore, skipHydrate } from 'pinia'
import { useMediaControls } from '@vueuse/core'

export const useVideoPlayer = defineStore('video', () => {
  // 我们不会直接暴露这个元素
  const videoElement = ref<HTMLVideoElement>()
  const src = ref('/data/video.mp4')
  const { playing, volume, currentTime, togglePictureInPicture } =
    useMediaControls(video, { src })

  function loadVideo(element: HTMLVideoElement, src: string) {
    videoElement.value = element
    src.value = src
  }

  return {
    src,
    playing,
    volume,
    currentTime,

    loadVideo,
    togglePictureInPicture,
  }
})
```

- [Vue SFC Playground](https://play.vuejs.org/#eNp9Vdtu20YQ/ZUpUUA0qpAOjL4YktCbC7Rom8BN8sSHrMihtfZql9iLZEHgv2dml6SpxMiDIWkuZ+acmR2fs1+7rjgEzG6zlaut7Dw49KHbVFruO2M9nMFiu4Ta7LvgsYEeWmv2sKCkxSwoOPwTfb2b/EU5mopHR5GVro12HrbC4UerYA2Lnfeduy3LR2d0p0SNO6MatIU/dbI2DRZUtPSmMa4kgJQuG8qkjvLF28XVaAwRb2wxz69gvZkK/UQ5xUGogBQ/ZpyhEV4sAa01lnpeTwRyApsFWvT2RO6Eea40THBMgfq6NLwlS1/pVZnUJB3ph8c98fNIvwD+MaKBzkQut2xYbYP3RsPhTWvsusokSA0/Vxn8UitZP7GFSX/+8Sz7z1W2OZ9BQt+vypQXS1R+1cgDQciW4iMrimR0wu8270znfoC7SBaJWdAeLTa3QFgxuNijc+IBIy5PPyYOjU19RDEI954/Z/UptKTy6VvqA5XD1AwLTTl/0Aco4s5lV51F5sG+VJJ+v4qxYbmkfiiKYvSvyknPbJnNtoyW+HJpj4Icd22LtV+CN5/ikC4XuNL4HFPaoGsvie3FIqSJp1WIzabl00HxkoyetEVfufhv1kAu3EnX8z0CKEtKofcGzhMb2CItAELL1SPlFMV1pwVj+GROc/vWPoc26oDgdxhfSArlLnbWaBOcOoEzIP3CgbeifqLXLRyICaDBDnVD+3KC7emCSyQ4sifspOx61Hh4Qy/d8BsaOEdkYb1sZS2FoiJKnIC6FbqhsaTVZfk8gDgK6cHLPZowFGUzAQTNWl/BUSrFbzRYHXmSdeAp28RMsI0fyFDaUJg9Spd0SbERZcvZDBRleCPdQMCPh8ARwdRRnBCTjGz5WkT0i0GlSMqixTR6VKyHmmWEHIfV+naSOETyRx8vEYwMv7pa8dJU+hU9Kz2t86ReqjcgaTzCe3oGpEOeD4uyJOcjTXe+obScHwaAi82lo9dC/q/wuyINjrwbuC5uZrS4WAQeyTN9ftOXIVwy537iecoX92kR4q/F1UvqIMsSbq6vo5XF6ekCeEcTauVDFJpuQESvMv53IBXadx3r4KqMrt0w0kwoZY5/R5u3AZejvd5h/fSK/dE9s63K3vN7tQesssnnhX1An9x3//+Hz/R9cu5NExRFf8d5zyIF7jGF/RZ0Q23P4mK3f8XLRmfhg7t79qjdSIobjXLE+Cqju/b7d6i/tHtT3MQ8VrH/Ahstp5A=)

這是在組件中直接用

```js

<script setup>
import { ref, computed } from 'vue'
import { useFetch } from './useFetch.js'

const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
const id = ref('1')
const url = computed(() => baseUrl + id.value)

const { data, error } = useFetch(url)

const retry = () => {
  id.value = ''
  id.value = '1'
}
</script>
```

### fetchAct

我想用創建自己一個類似 axios 的 叫做 fetchAct 他導入時 自己就是實例化

要实现类似 axios 的 fetchAct，并且在导入时自动实例化，你可以编写一个模块，在该模块中直接创建并导出一个已实例化的对象。

以下是一个简单的示例代码，演示了如何实现这一点：

```javascript
// fetchAct.js

class FetchAct {
  constructor() {
    // 可以在这里添加一些默认配置
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

在这个示例中，我们定义了一个名为 `FetchAct` 的类，它包含了各种 HTTP 请求方法（例如 `get`、`post` 等）。然后，我们使用 `new FetchAct()` 创建了一个实例，并将其作为默认导出，这样其他模块就可以直接导入并使用这个已实例化的对象了：

```javascript
// 使用 fetchAct.js 中导出的已实例化对象

import fetchAct from "./fetchAct";

fetchAct
  .get("/users")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

通过这种方式，你就可以在导入时直接使用 `fetchAct` 对象，而不需要在每个模块中都创建一个新的实例。

https://ithelp.ithome.com.tw/articles/10306919?sc=rss.qu
