<script setup>
</script>

<template>
  <div class="card">
    <div
      class="card-header d-flex justify-space-between align-center mb-4 font-weight-bold"
    >
      <span class="text-h5">Bảng người dùng</span>
      <div class="btn btn-success">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <button type="button">Thêm mới</button>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead class="table-dark">
            <tr>
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
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-start">
                    <h6 class="mb-0 text-sm">Vũ Hoàng Long</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs text-body-table mb-0 text-start">Long</p>
              </td>
              <td class="align-middle text-start text-sm">
                <span class="">abcxyz</span>
              </td>
              <td class="align-middle text-start">
                <span class="text-body-table text-xs"
                  >vuhlong1412@gmail.com</span
                >
              </td>
              <td class="align-middle text-start">
                <span class="text-body-table text-xs"
                  >vuhlong1412@gmail.com</span
                >
              </td>
              <td class="align-middle text-start">
                <div class="d-flex">
                  <div class="icon-edit">
                    <router-link to="edit">
                      <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                    </router-link>
                    <v-tooltip activator="parent" location="bottom">
                        Chỉnh sửa
                    </v-tooltip>
                  </div>
                  <div class="icon-delete ml-4">
                    <router-link class="text-red" to="edit">
                      <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </router-link>
                    <v-tooltip activator="parent" location="bottom">
                        Xoá
                    </v-tooltip>
                  </div>
                  <div class="icon-delete ml-4">
                    <router-link class="text-info" to="edit">
                      <font-awesome-icon :icon="['fas', 'info']" />
                    </router-link>
                    <v-tooltip activator="parent" location="bottom">
                        Thông tin
                    </v-tooltip>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <nav class="mt-4" aria-label="Page navigation example">
          <ul class="pagination justify-end">
            <li class="page-item">
              <router-link class="page-link" to="">
                <font-awesome-icon :icon="['fas', 'chevron-left']" />
              </router-link>
            </li>
            <li class="page-item">
              <router-link class="page-link" to=""> 1 </router-link>
            </li>
            <li class="page-item">
              <router-link class="page-link" to="">
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>