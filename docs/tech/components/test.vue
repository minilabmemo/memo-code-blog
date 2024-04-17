<template>
  <div>
    {{ count }}
    <button :class="$style.button" @click="count++">Increment</button>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const count = ref(0)
</script>


<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
