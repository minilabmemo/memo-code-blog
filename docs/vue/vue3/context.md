---
outline: deep
---

# 應用筆記

## prop 變化

以為 prop 變化重新觸發 created，但沒有。

- [vue props 改变触发的生命周期](https://juejin.cn/s/vue%20props%E6%94%B9%E5%8F%98%E8%A7%A6%E5%8F%91%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

  > 当 props 值改变时，不会触发 created 或 mounted 钩子函数，因为它们只在组件创建时执行一次。

- 所以只好再次 watch props 一次來做對應的動作。

```js

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      saveKey: "favorite",
      isSave: false,
    }
  },
  created() {
    this.syncSaveStatus();
  },
  watch: {
    item: {
      handler(newVal, oldVal) {
        this.syncSaveStatus();
      },
      deep: true,
    },
  },

</script>


```

## RWD 相關

### 監聽寬度

```js
import { useWindowSize } from "@vueuse/core";
import { ref, watchEffect } from "vue";

const { width, height } = useWindowSize();
const isLargeDevice = ref(false);

watchEffect(() => {
  let newWidth = width.value;
  if (newWidth >= 992) {
    isLargeDevice.value = true;
  } else {
    isLargeDevice.value = false;
  }
});
```

### 重複組件問題[Teleport 應用]

> 狀況：有的組件在小畫面時放在中間，大畫面時放在上面，因此放了兩次組件，如果這組件有狀態的話也會觸發兩次。

1. 其實可以用 Teleport 決定放在哪裡，寫一個組件就好。

```js
  <div class="position-absolute  end-0 bottom-0  " id="device-lg-location">
      <!-- <for teleport> -->
  </div>
   <div class="col-6 col-sm-6  d-flex justify-content-end  align-items-center" id="device-sm-location">
    <!-- <for teleport> -->
          </div>
 <Teleport :to="#device-lg-location">
    <UserNav />
  </Teleport>

```

2.搭配上面的寬度判斷放在哪裡

```js
 <Teleport :to="userNavLoc">
    <UserNav />
  </Teleport>

  <script setup lang="ts">
import UserNav from '@/components/user/UserNav.vue';
import { useWindowSize } from '@vueuse/core'
import { ref, watchEffect } from 'vue';

const { width, height } = useWindowSize()
const isLargeDevice = ref(false);
const userNavLoc = ref("#device-lg-location");

watchEffect(() => {
  let newWidth = width.value
  if (newWidth >= 992) {
    isLargeDevice.value = true;
    userNavLoc.value = "#device-lg-location"
  } else {
    isLargeDevice.value = false;
    userNavLoc.value = "#device-sm-location"

  }
});
</script>

```
