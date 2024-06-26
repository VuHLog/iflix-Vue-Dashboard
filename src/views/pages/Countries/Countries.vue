<script setup>
import { ref, getCurrentInstance, onMounted, watch } from "vue";
import { useBaseStore } from "@/store/index.js";
import { inject } from "vue";

const { proxy } = getCurrentInstance();
const swal = inject("$swal");

const countries = ref([]);
const totalElements = ref(0);
const totalPages = ref(0);
const field = ref("name");
const sort = ref("ASC");
const pageSize = ref(0);
const pageNumber = ref(0);
const search = ref("");

onMounted(() => {
  proxy.$api.get("/api/countries").then((res) => {
    countries.value = res.content;
    totalElements.value = res.totalElements;
    totalPages.value = res.totalPages;
    pageSize.value = res.pageable.pageSize;
    pageNumber.value = res.pageable.pageNumber;
  });
});

const reloadData = () => {
  proxy.$api
    .get(
      "/api/countries?pageNumber=" +
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
      countries.value = res.content;
      totalElements.value = res.totalElements;
      totalPages.value = res.totalPages;
      pageSize.value = res.pageable.pageSize;
      pageNumber.value = res.pageable.pageNumber;
    });
};

async function deleteCountries(id) {
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
      if(result.isConfirmed) {
        await proxy.$api.delete("/api/countries/" + id, {}).then(() => {
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
      <span class="text-h5">Bảng quốc gia</span>
      <div class="btn btn-success">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <router-link to="/createCountries">
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
                Tên quốc gia
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Slug
              </th>
              <th
                class="text-start text-uppercase text-head-table text-xxs font-weight-bolder"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(c, index) in countries" :key="countries.id">
              <tr>
                <td>
                  <div class="d-flex px-2 py-1">
                    {{ pageNumber * 5 + index + 1 }}
                  </div>
                </td>
                <td class="align-middle text-start text-sm">
                  <p class="text-xs text-body-table mb-0 text-start">
                    {{ c.name }}
                  </p>
                </td>
                <td class="align-middle text-start">
                  <span class="text-body-table text-xs">{{ c.slug }}</span>
                </td>
                <td class="align-middle text-start">
                  <div class="d-flex">
                    <div class="icon-edit">
                      <router-link :to="'/editCountries/' + c.id">
                        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                      </router-link>
                      <v-tooltip activator="parent" location="bottom">
                        Chỉnh sửa
                      </v-tooltip>
                    </div>
                    <div class="icon-delete ml-4">
                      <div class="text-red" @click="deleteCountries(c.id)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                      </div>
                      <v-tooltip activator="parent" location="bottom">
                        Xoá
                      </v-tooltip>
                    </div>
                    <div class="icon-delete ml-4">
                      <router-link
                        class="text-info"
                        :to="'/infoCountries/' + c.id"
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
</style>