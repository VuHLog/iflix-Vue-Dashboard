<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBaseStore } from "@/store/index.js";
import Breadcrumbs from "@layouts/Breadcrumbs.vue";

const route = useRoute();
const store = useBaseStore();

const currentRouteName = computed(() => {
  return route.name;
});

const fullName = store.fullName;
const roles = store.roles;

const currentDirectory = computed(() => {
  let dir = route.path.split("/")[1];
  return dir.charAt(0).toUpperCase() + dir.slice(1);
});

const minimizeSidebar = () => {
  store.showSidenav = !store.showSidenav;
};
</script>

<template>
  <div id="navbar" class="navbar d-flex flex-xs-column  justify-space-between">
    <Breadcrumbs
      :currentPage="currentDirectory"
      :currentName="currentRouteName"
    ></Breadcrumbs>

    <ul class="d-flex align-center m-0 p-0">
      <div
        class="pe-md-3 d-flex align-items-center"
      >
        <div class="input-group">
          <label for="input-search" class="input-group-text text-body">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </label>
          <input
            id="input-search"
            type="text"
            class="form-control"
            placeholder="Nhập để tìm kiếm ..."
          />
        </div>
      </div>
      <li>
        <router-link to="/profile" class="nav-link">
          <div class="text-white user d-flex align-center">
            <font-awesome-icon :icon="['fas', 'user']" />
            <div class="d-flex flex-column ml-2">
              <p class="username m-0">{{fullName}}</p>
              <p class="user-role m-0">{{roles}}</p>
            </div>
          </div>
        </router-link>
      </li>

      <li class="cursor-pointer d-lg-none text-white ml-3 p-2" @click="minimizeSidebar">
        <div class="sidenav-toggler-inner">
          <font-awesome-icon :icon="['fas', 'list']" />
        </div>
      </li>

      <li class="text-white ml-3 p-2">
        <div class="sidenav-toggler-inner">
          <font-awesome-icon :icon="['fas', 'bell']" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import url("@/assets/scss/navbar.scss");
</style>