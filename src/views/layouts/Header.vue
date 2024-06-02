<template>
  <header class="header d-flex justify-content-between pa-3 mt-3">
    <transition name="fade">
      <div
        v-if="isShowFormSearch"
        class="form-search d-flex align-items-center"
      >
        <span class="search-icon">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </span>
        <input class="input-search" placeholder="Tìm kiếm phim ..." />
      </div>
    </transition>
    <div class="logo d-inline-block">
      <img class="logo-image" src="" />
    </div>
    <div class="d-flex align-items-center">
      <v-btn
        @click="isShowFormSearch = !isShowFormSearch"
        color="var(--primary-color)"
        rounded="xs"
        class="list-icon"
        icon="fa-solid fa-magnifying-glass"
      >
      </v-btn>
      <v-btn
        icon="fa-solid fa-bars"
        color="var(--primary-color)"
        rounded="xs"
        @click="drawer = !drawer"
        class="list-icon"
      >
      </v-btn>
    </div>
  </header>
  <v-navigation-drawer class="indigo side-left" v-model="drawer" :scrim="false" elevation="2">
    <v-list>
      <v-list-item title="Home"></v-list-item>

      <v-divider></v-divider>

      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Quản lý">
          </v-list-item>
        </template>
        <v-list-item title="User" value="User">
        </v-list-item>
        <v-list-item title="Movies" value="Movies" to="/admin/movies">
        </v-list-item>
      </v-list-group>
    </v-list>

    <template v-slot:append>
          <div class="pa-2 ">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
const isShowFormSearch = ref(false);
const drawer = ref(false);
</script>

<style scoped lang="scss">
.header {
  background-color: #fff;
  color: var(--primary-color);
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .form-search {
    background-color: #343d55;
    border-radius: 20px;
    .search-icon {
      margin: 0 10px;
    }
    .input-search {
      color: var(--primary-color);
      outline: none;
    }
  }
  .logo {
    .logo-image {
      height: 40px;
    }
  }
  .side-left{
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
</style>