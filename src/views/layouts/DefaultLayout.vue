<script setup>
import { computed } from "vue";
import { useBaseStore } from "@/store/index.js";
import Sidenav from "@layouts/sidenav/index.vue";
import Navbar from "@layouts/navbar/Navbar.vue";
import Footer from "@layouts/Footer.vue";

const store = useBaseStore();
const showSidenav = computed(() => store.showSidenav);
const showNavbar = computed(() => store.showNavbar);
const showFooter = computed(() => store.showFooter);
</script>

<template>
  <div
    class="position-absolute top-0 left-0 right-0 w-100 h-25 background-default">
  </div>

  <v-row class="position-absolute top-0 left-0 right-0 w-100" no-gutters>
    <v-col class="d-none d-md-block" sm="0" md="3" lg="2">
      <Transition class="sidenav" name="slide-fade">
        <Sidenav class="w-100" v-if="showSidenav" />
      </Transition>
    </v-col>
    <v-col sm="12" md="9" lg="10">
      <main class="h-100 py-2 px-6">
        <Navbar v-if="showNavbar" />
        <router-view></router-view>
        <Footer v-show="showFooter"></Footer>
      </main>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>

</style>