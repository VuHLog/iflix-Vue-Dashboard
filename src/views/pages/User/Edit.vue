<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useBaseStore} from "@/store/index.js"

const { proxy } = getCurrentInstance();
const store = useBaseStore();

const router = useRouter();

const route = useRoute();
const userId = route.params.userId;
const errorMsg = ref("");
const file = ref(null);

const user = ref({
  password: "",
  email: "",
  phone: "",
  fullName: "",
  avatarUrl: "",
  roles: [],
});

const roleAvailable = ref([]);

onMounted(() => {
  proxy.$api
    .get("/admin/users/" + userId)
    .then((res) => {
      Object.assign(user.value, res.result);
      delete user.user_roles;
      user.value.password = "";
      user.value.roles = res.result.user_roles.map(role => role.role);
    })
    .catch((error) => console.log(error));

    proxy.$api
    .get("/admin/roles")
    .then((res) => {
      roleAvailable.value = res.result;
    })
    .catch((error) => console.log(error));
});

function returnTable() {
  router.push("/users");
}

function handleFileUpload(event) {
  file.value = event.target.files[0];
}

async function submitFile() {
  let formData = new FormData();

  formData.append("image", file.value);
  await proxy.$api
    .postFile("/cloudinary/upload", formData)
    .then((res) => {
      user.value.avatarUrl = res.url;
    })
    .catch((error) => console.log(error));
}

async function updateUser() {
  errorMsg.value = "";
  if (!/^.{8,}$/.test(user.value.fullName.trim())) {
    errorMsg.value = "Họ tên phải có ít nhất 8 ký tự";
    return;
  }
  if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      user.value.email.trim()
    )
  ) {
    errorMsg.value = "Email không hợp lệ";
    return;
  }
  if (
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/.test(user.value.password.trim())
  ) {
    errorMsg.value =
      "Mật khẩu phải có ít nhất 8 ký tự chứa ít nhất một ký tự viết hoa, viết thường và chữ số";
    return;
  }
  if (!/^^(84|0[3|5|7|8|9])([0-9]{8})$/.test(user.value.phone.trim())) {
    errorMsg.value = "Số điện thoại không hợp lệ";
    return;
  }
  if (file.value !== null) {
    await submitFile();
  }

  await proxy.$api
    .put("/admin/users/" + userId, user.value)
    .then((res) => {
      if (res.message) {
        errorMsg.value = res.message;
      } else {
        console.log("Sửa thành công!");
        router.push("/users");
      }
    })
    .catch((error) => console.log(error));
}
</script>

<template>
  <div class="card mt-4">
    <div class="card-header pb-0">
      <div class="d-flex align-items-center">
        <p class="mb-0">Chỉnh sửa</p>
      </div>
    </div>
    <div class="card-body">
      <p class="text-uppercase text-sm">Thông tin người dùng</p>
      <form
        class="mt-8 space-y-6 mb-4"
        enctype="multipart/form-data"
        method="POST"
        @submit.prevent="updateUser"
      >
        <div class="row">
          <div class="col-md-6 text-start mb-4">
            <label for="fullname-text-input" class="form-label"
              >Họ và tên</label
            >
            <input
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
              v-model="user.password"
              id="password-text-input"
              class="form-control"
              type="password"
              placeholder="Mật khẩu"
            />
          </div>
          <div class="col-md-6 text-start mb-4">
            <label for="phoneNumber-text-input" class="form-label"
              >Số điện thoại</label
            >
            <input
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
                <template v-for="role in roleAvailable " key="role.id">
                  <input
                    type="checkbox"
                    :id="role.roleName"
                    :value="role"
                    v-model="user.roles"
                  />
                  <label class="ml-2 mr-4" :for="role.roleName">{{ role.roleName }}</label>
                </template>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3 text-start">
            <label for="formFile" class="form-label">Chọn ảnh</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              accept=".png, .jpg, .jpeg"
              @change="handleFileUpload($event)"
            />
          </div>
        </div>

        <div class="text-start text-red" v-if="errorMsg">
          {{ errorMsg }}
        </div>

        <div class="d-flex justify-start align-center">
          <button
            type="submit"
            class="btn btn-submit bg-gradient-submit py-3 mr-3"
          >
            Lưu
          </button>
          <span class="text-secondary cursor-pointer" @click="returnTable()">
            Quay lại
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-control {
  box-shadow: none;
}
</style>