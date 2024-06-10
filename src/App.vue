<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import url("@/assets/scss/main.scss");
@import url("@/assets/scss/variables.scss");

#app {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  width: 100%;
}

//sidenav effect
.sidenav.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.sidenav.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.sidenav.slide-fade-enter-from,
.sidenav.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
