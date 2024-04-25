<script setup lang="ts">
import {ANT_CONFIGS} from "./constants";

</script>

<template>
  <a-config-provider
    :theme="ANT_CONFIGS"
  >
  </a-config-provider>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: inherit;
  margin: 0 auto;
}
body {
  box-sizing: border-box;
}
.container {
  max-width: 376px;
  // height: 100vh;
  // border: 1px solid black;
  background-color: #fff;
}
</style>
