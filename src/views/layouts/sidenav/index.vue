<script setup>
import SidenavItem from "@layouts/sidenav/SidenavItem.vue";
import { useRoute } from "vue-router";

const getRoute = () => {
  const route = useRoute();
  const routeArr = route.path.split("/");
  return routeArr[1];
};
</script>

<template>
  <aside
    class="sidenav position-fixed d-block top-0 bottom-0 bg-color-sidenav my-4 ml-4"
  >
    <div class="sidenav-header">
      <router-link class="" to="/">
        <img class="w-100" src="@images/logo/iflixLogo.png" alt="Iflix Logo" />
      </router-link>
    </div>

    <hr class="m-0 mb-3" />

    <ul class="sidenav-list p-0">
      <li class="sidenav-item">
        <sidenav-item
          :class="getRoute() === 'dashboard' ? 'active' : ''"
          to="/dashboard"
          navText="Dashboard"
        >
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'tv']" />
          </template>
        </sidenav-item>
      </li>
      <li class="sidenav-item">
        <sidenav-item

          :class="getRoute() === 'users' ? 'active' : ''"
          to="/users"
          navText="Người dùng"
        >
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'user']" />
          </template>
        </sidenav-item>
      </li>
      <li class="sidenav-item">
        <sidenav-item
          :class="getRoute() === 'genres' ? 'active' : ''"
          to="/genres"
          navText="Thể loại"
        >
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'table-list']" />
          </template>
        </sidenav-item>
      </li>
      <li class="sidenav-item">
        <sidenav-item
          :class="getRoute() === 'countries' ? 'active' : ''"
          to="/countries"
          navText="Quốc gia"
        >
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'earth-americas']" />
          </template>
        </sidenav-item>
      </li>
      <li class="sidenav-item">
        <sidenav-item
          :class="getRoute() === 'categories' ? 'active' : ''"
          to="/categories"
          navText="Danh mục"
        >
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'book']" />
          </template>
        </sidenav-item>
      </li>
      <li class="sidenav-item">
        <sidenav-item
          :class="getRoute() === 'movies' ? 'active' : ''"
          to="/movies"
          navText="Phim"
        >
          <template v-slot:icon>
            <font-awesome-icon :icon="['fas', 'film']" />
          </template>
        </sidenav-item>
      </li>
    </ul>
    <hr class="m-0 mb-3" />

    <div class="sidenav-item">
      <sidenav-item
        :class="getRoute() === 'logout' ? 'active' : ''"
        to="/logout"
        navText="Đăng xuất"
      >
        <template v-slot:icon>
          <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']" />
        </template>
      </sidenav-item>
    </div>
  </aside>
</template>


<style lang="scss" scoped>
@import url("@/assets/scss/sidenav.scss");
.sidenav {
  border-radius: 16px;
  max-width: 230px;
  z-index: 9999;
  .sidenav-header {
    img {
      object-fit: cover;
      height: 80px;
    }
  }
  hr {
    border: none;
    height: 2px;
    background-image: linear-gradient(
      90deg,
      hsla(0, 0%, 90%, 0),
      #fff,
      hsla(0, 0%, 100%, 0)
    ) !important;
  }
}
</style>