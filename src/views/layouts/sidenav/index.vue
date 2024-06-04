<script setup>
import SidenavItem from "@layouts/sidenav/SidenavItem.vue";
import { useRouter, useRoute } from "vue-router";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const route = useRoute();
const getRoute = () => {
  const routeArr = route.path.split("/");
  return routeArr[1];
};

const token = sessionStorage.getItem("token");
const router = useRouter();
async function signOut() {
  await proxy.$api
    .post("/auth/logout", token)
    .then(() => {
      sessionStorage.removeItem("token");
      router.push("/sign-in");
    })
    .catch();
}
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

    <div
      class="sign-out rounded-lg nav-link-text d-flex align-center justify-start mx-2 py-2 px-3 cursor-pointer"
      @click="signOut()"
    >
      <font-awesome-icon
        class="p-2"
        :icon="['fas', 'arrow-right-to-bracket']"
      />
      <span class="ml-2">Đăng xuất</span>
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
  .sign-out {
    &:hover {
      background-image: linear-gradient(310deg, #5e72e4, #5e72e4);
    }
  }
}
</style>