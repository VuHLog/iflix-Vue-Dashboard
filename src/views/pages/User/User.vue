<script setup>
import { ref, getCurrentInstance, onMounted, watch } from "vue";
import { useBaseStore } from "@/store/index.js";
import { inject } from "vue";

const { proxy } = getCurrentInstance();
const swal = inject("$swal");

const users = ref([]);
const totalElements = ref(0);
const totalPages = ref(0);
const field = ref("username");
const sort = ref("ASC");
const pageSize = ref(0);
const pageNumber = ref(0);
const search = ref("");

function truncateData(data) {
  const maxLength = 10;
  return data.length > maxLength ? data.substring(0, maxLength) + "..." : data;
}

onMounted(() => {
  proxy.$api.get("/api/users").then((res) => {
    users.value = res.content;
    totalElements.value = res.totalElements;
    totalPages.value = res.totalPages;
    pageSize.value = res.pageable.pageSize;
    pageNumber.value = res.pageable.pageNumber;
  });
});

const reloadData = () => {
  proxy.$api
    .get(
      "/api/users?pageNumber=" +
        pageNumber.value +
        "&pageSize=" +
        pageSize.value +
        "&sort=" +
        sort.value +
        "&field=" +
        field.value +
        "&search=" +
        search.value
    )
    .then((res) => {
      users.value = res.content;
      totalElements.value = res.totalElements;
      totalPages.value = res.totalPages;
      pageSize.value = res.pageable.pageSize;
      pageNumber.value = res.pageable.pageNumber;
    });
};

async function deleteUser(id) {
  swal
    .fire({
      title: "Bạn có chắc chắn muốn xoá không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ bỏ",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await proxy.$api.delete("/api/users/" + id, {}).then(() => {
          console.log("Xoá thành công!");
        });
        reloadData();
        swal.fire({
          title: "Đã xoá!",
          icon: "success",
        });
      }
    });
}

watch(pageNumber, () => {
  reloadData();
});

watch(search, () => {
  pageNumber.value = 0;
  reloadData();
});
</script>

<template>
  <div id="" class="card">
    <div
      class="card-header d-flex justify-space-between align-center mb-4 font-weight-bold"
    >
      <span class="text-h5">Bảng người dùng</span>
      <div class="btn btn-success">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <router-link to="/createUser">
          <button class="text-white" type="button">Thêm mới</button>
        </router-link>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="pe-md-3 mb-8 d-flex align-items-center justify-end">
        <div class="input-group w-25">
          <label for="input-search" class="input-group-text text-body">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </label>
          <input
            v-model.trim="search"
            id="input-search"
            type="text"
            class="form-control"
            placeholder="Nhập để tìm kiếm ..."
          />
        </div>
      </div>
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead class="table-dark">
            <tr>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder opacity-7"
              >
                STT
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder opacity-7"
              >
                Họ và tên
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Tên đăng nhập
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder"
              >
                Mật khẩu
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder"
              >
                Email
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder"
              >
                Số điện thoại
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder"
              >
                Vai trò
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(user, index) in users" :key="user.id">
              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    {{ pageNumber * 5 + index + 1 }}
                  </div>
                </td>
                <td class="align-middle text-start text-sm">
                  <div class="d-flex align-center px-2 py-1 row">
                    <div class="col-md-3">
                      <img
                        :src="user.avatarUrl"
                        class="me-3 img-thumbnail avatar-user"
                        alt="user1"
                      />
                    </div>
                    <div
                      class="d-flex flex-column justify-content-start col-md-9"
                    >
                      <h6 class="mb-0 text-sm">{{ user.fullName }}</h6>
                    </div>
                  </div>
                </td>
                <td class="align-middle text-start text-sm">
                  <p class="text-xs text-body-table mb-0 text-start">
                    {{ user.username }}
                  </p>
                </td>
                <td class="align-middle text-start text-sm">
                  <span class="">{{ truncateData(user.password) }}</span>
                </td>
                <td class="align-middle text-start">
                  <span class="text-body-table text-xs">{{ user.email }}</span>
                </td>
                <td class="align-middle text-start">
                  <span class="text-body-table text-xs">{{ user.phone }}</span>
                </td>
                <td class="align-middle text-start">
                  <template v-for="role in user.user_roles">
                    <p class="text-body-table text-xs mb-0 mr-3">{{ role.role.roleName }}</p>
                  </template>
                </td>
                <td class="align-middle text-start">
                  <div class="d-flex">
                    <div class="icon-edit">
                      <router-link :to="'/editUser/' + user.id">
                        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                      </router-link>
                      <v-tooltip activator="parent" location="bottom">
                        Chỉnh sửa
                      </v-tooltip>
                    </div>
                    <div class="icon-delete ml-4">
                      <div class="text-red" @click="deleteUser(user.id)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                      </div>
                      <v-tooltip activator="parent" location="bottom">
                        Xoá
                      </v-tooltip>
                    </div>
                    <div class="icon-delete ml-4">
                      <router-link
                        class="text-info"
                        :to="'/infoUser/' + user.id"
                      >
                        <font-awesome-icon :icon="['fas', 'info']" />
                      </router-link>
                      <v-tooltip activator="parent" location="bottom">
                        Thông tin
                      </v-tooltip>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <nav class="mt-4" aria-label="Page navigation example">
          <ul class="pagination justify-end">
            <li
              class="page-item p-3 text-info cursor-pointer"
              v-show="pageNumber + 1 > 1"
              @click="pageNumber--"
            >
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
            </li>
            <li class="page-item p-3 text-info">
              {{ pageNumber + 1 }}
            </li>
            <li
              class="page-item p-3 text-info cursor-pointer"
              v-show="pageNumber + 1 < totalPages"
              @click="pageNumber++"
            >
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar-user {
  height: 40px;
}
</style>