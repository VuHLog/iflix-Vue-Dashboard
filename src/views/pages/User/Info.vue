<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const { proxy } = getCurrentInstance();

const router = useRouter();

const route = useRoute();
const userId = route.params.userId;

const user = ref({
  password: "",
  email: "",
  phone: "",
  fullName: "",
  avatarUrl: "",
  roles: [],
});

onMounted(() => {
  proxy.$api
    .get("/admin/users/" + userId)
    .then((res) => {
      Object.assign(user.value, res.result);
      user.value.roles = res.result.user_roles.map(role => role.role);
    })
    .catch((error) => console.log(error));
});

function truncateData(data) {
  const maxLength = 10;
  return data.length > maxLength ? data.substring(0, maxLength) + "..." : data;
}

function returnTable() {
  router.push("/users");
}
</script>
<template>
  <div class="card px-0 pt-0 pb-2">
    <div class="card-body p-5">
      <div class="row">
        <div class="col-md-6 text-start mb-4">
          <label for="fullname-text-input" class="form-label">Họ và tên</label>
          <input
            disabled
            v-model="user.fullName"
            id="fullname-text-input"
            class="form-control"
            type="text"
            placeholder="Họ và tên"
          />
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="email-text-input" class="form-label">Email</label>
          <input
            disabled
            v-model="user.email"
            id="email-text-input"
            class="form-control"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="username-text-input" class="form-label"
            >Tên đăng nhập</label
          >
          <input
            v-model="user.username"
            id="username-text-input"
            class="form-control"
            type="text"
            placeholder="Tên đăng nhập"
            disabled
          />
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="password-text-input" class="form-label">Mật khẩu</label>
          <input
            disabled
            v-model="user.password"
            id="password-text-input"
            class="form-control"
            type="text"
            placeholder="Mật khẩu"
          />
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="phoneNumber-text-input" class="form-label"
            >Số điện thoại</label
          >
          <input
            disabled
            v-model="user.phone"
            id="phoneNumber-text-input"
            class="form-control"
            type="text"
            placeholder="Số điện thoại"
          />
        </div>
        <div class="btn-group col-md-6 mb-4">
          <div class="d-flex flex-column align-start">
            <div class="mb-3">Vai trò</div>
            <div class="d-flex">
              <template v-for="role in user.roles">
                <span class="text-body-table text-xs mb-0 mr-3">{{
                  role.roleName
                }}</span>
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-6 text-start mb-4">
          <label for="avatar" class="form-label">Ảnh đại diện</label>
          <div>
            <img
              :src="user.avatarUrl"
              class="me-3 img-thumbnail avatar-user"
              alt="user1"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-start align-center">
        <button
          type="button"
          class="btn btn-submit bg-gradient-submit py-3 mr-3"
          @click="returnTable()"
        >
          Quay lại
        </button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.avatar-user {
  height: 100px;
}
</style>