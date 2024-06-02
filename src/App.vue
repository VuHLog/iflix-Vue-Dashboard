<script setup>
import Sidenav from "@layouts/sidenav/index.vue"

</script>

<template>

  <Sidenav style="width: 20%;" />

  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import url("./assets/scss/main.scss");
#app{
  max-width: 100%;
  padding: 10px;
  margin: 0;
  height: 100%;
}
</style>
