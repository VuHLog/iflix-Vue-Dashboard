<script setup>
import { ref } from "vue";
import { useBaseStore } from "@/store/index.js";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const store = useBaseStore();

const errorMsg = ref("");

const user = ref({
  username: "",
  password: ""
});

async function signin() {
  await proxy.$api.post("/auth/token", user.value).then((res) => {
    console.log(res);
    return res;
  }).catch(({response}) =>{
    errorMsg.value = "Tài khoản, mật khẩu không chính xác"
  })
  //   .dispatch("login", user)
  //   .then(() => {
  //     loading.value = false;
  //     router.push({ name: "app.dashboard" });
  //   })
  //   .catch(({ response }) => {
  //     loading.value = false;
  //     errorMsg.value = response.data.message;
  //   });
}
</script>

<template>
  <div class="main-content">
    <v-row class="h-100" no-gutters>
      <v-col class="my-auto d-flex justify-center" cols="6">
        <div class="d-flex flex-column w-75">
          <h4 class="font-weight-bold">Đăng nhập</h4>
          <form
            class="mt-8 space-y-6 mb-4"
            method="POST"
            @submit.prevent="signin"
          >
            <input
              v-model="user.username"
              class="form-control p-3 mb-4"
              type="text"
              placeholder="Tên đăng nhập"
            />
            <input
              v-model="user.password"
              class="form-control p-3"
              type="password"
              placeholder="Mật khẩu"
            />

            <div class="text-start text-red" v-if="errorMsg">
              {{ errorMsg }}
            </div>

            <div class="text-start my-4">
              <input id="remember" class="mr-2" type="checkbox" />
              <label for="remember">Nhớ mật khẩu</label>
            </div>

            <button
              type="submit"
              class="btn btn-submit w-75 bg-gradient-submit py-3"
            >
              Đăng nhập
            </button>
          </form>
          <p>
            Bạn chưa có tài khoản?
            <router-link to="/signup">
              <strong>Đăng ký</strong>
            </router-link>
          </p>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="6">
        <div class="banner">
          <img class="w-100 rounded-lg" src="@images/signin/banner.png"
          alt="Iflix Logo"
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
@import url("@/assets/scss/signin.scss");
.main-content {
  height: 100vh;
  .form-control {
    box-shadow: none;
  }
  .banner {
    img {
      object-fit: cover;
      height: 600px;
    }
  }
  .btn-submit {
    border-radius: 10px;
  }
}
</style>